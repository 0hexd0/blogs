``` typescript
// 责任链模式例子

namespace ChainOfResponsibility {
  // 枚举 日志等级 枚举值使用bit mask
  enum LogLevel {
    None = 0, //        0
    Info = 1, //        1
    Debug = 2, //       10
    Warning = 4, //      100
    Error = 8, //     1000
    FunctionalMessage = 16, //    10000
    FunctionalError = 32, //   100000
    All = 63, //   111111
  }

  // 日志抽象类
  abstract class Logger {
    // 触发打印的mask
    protected logMask: LogLevel;

    // 指向下一个logger
    protected next?: Logger;

    constructor(mask: LogLevel) {
      this.logMask = mask;
    }

    // 在链条尾部新增logger
    setNext(nextlogger: Logger) {
      let lastLogger: Logger = this;

      while (lastLogger.next) {
        lastLogger = lastLogger.next;
      }

      lastLogger.next = nextlogger;
      return this;
    }

    // 打印日志
    message(msg: string, severity: LogLevel) {
      if ((severity & this.logMask) != 0) {
        // 利用bit mask 按位求与判断当前日志是否需要打印
        this.writeMessage(msg);
      }
      // 当前节点处理完毕 沿着链条传递
      if (this.next != null) {
        this.next.message(msg, severity);
      }
    }

    protected abstract writeMessage(msg: string): void;
  }

  // 打印级logger
  class ConsoleLogger extends Logger {
    constructor(mask: LogLevel) {
      super(mask);
    }

    // 重写抽象方法
    protected writeMessage(msg: string) {
      console.log("打印: " + msg);
    }
  }

  // 邮件级logger
  class EmailLogger extends Logger {
    constructor(mask: LogLevel) {
      super(mask);
    }

    // 重写抽象方法
    protected writeMessage(msg: string) {
      console.log("发送邮件: " + msg);
    }
  }

  // 文件级logger
  class FileLogger extends Logger {
    constructor(mask: LogLevel) {
      super(mask);
    }

    protected override writeMessage(msg: string) {
      console.log("写入文件: " + msg);
    }
  }

  class Program {
    public static main() {
      // 构造责任链
      const logger = new ConsoleLogger(LogLevel.All) // 打印级logger的触发mask是111111，意味着打印级logger会处理所有级别的log（除了None）
        .setNext(
          new EmailLogger(LogLevel.FunctionalMessage | LogLevel.FunctionalError) // 邮件级logger的触发mask 是 110000
        )
        .setNext(new FileLogger(LogLevel.Warning | LogLevel.Error)); // 文件级logger的触发mask 是 1100

      // 向责任链传递日志
      logger.message("进入订单处理函数。", LogLevel.Debug);
      logger.message("拉取订单记录。", LogLevel.Info);

      // 需要文件级logger处理
      logger.message("分支数据库缺失用户的地址信息", LogLevel.Warning);
      logger.message("主数据库缺失用户的地址信息", LogLevel.Error);

      // 需要邮件级logger处理
      logger.message(
        "无法处理用户小明与XXXX年XX月XX日创建的订单，订单号：ORD1",
        LogLevel.FunctionalError
      );
      logger.message("订单已处理", LogLevel.FunctionalMessage);
    }
  }

  Program.main();
}
```
