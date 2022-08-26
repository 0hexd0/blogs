``` typescript
// 命令模式例子

namespace Command {
  // 指令接口
  interface ICommand {
    execute(): void;
  }

  /* Invoker封装Command同时暴露接口给客户端  */
  class Switch {
    _closedCommand: ICommand;
    _openedCommand: ICommand;

    constructor(closedCommand: ICommand, openedCommand: ICommand) {
      this._closedCommand = closedCommand;
      this._openedCommand = openedCommand;
    }

    // 暴露关闭接口
    public Close() {
      this._closedCommand.execute();
    }

    // 暴露打开接口
    public Open() {
      this._openedCommand.execute();
    }
  }

  /* 开关接口 */
  interface ISwitchable {
    powerOn(): void;
    powerOff(): void;
  }

  /* 灯泡实现开关功能 */
  class Light implements ISwitchable {
    powerOn() {
      console.log("The light is on");
    }

    powerOff() {
      console.log("The light is off");
    }
  }

  /* 指令：开 */
  class CloseSwitchCommand implements ICommand {
    private _switchable: ISwitchable;

    constructor(switchable: ISwitchable) {
      this._switchable = switchable;
    }

    public execute() {
      this._switchable.powerOn();
    }
  }

  /* 指令：关 */
  class OpenSwitchCommand implements ICommand {
    private _switchable: ISwitchable;

    public constructor(switchable: ISwitchable) {
      this._switchable = switchable;
    }

    public execute() {
      this._switchable.powerOff();
    }
  }

  /* 客户端代码 */
  class Program {
    static Main(arg?: string) {
      const lamp = new Light();

      // 构建指令
      const switchClose = new CloseSwitchCommand(lamp);
      const switchOpen = new OpenSwitchCommand(lamp);

      // 创建invoker
      const _switch = new Switch(switchClose, switchOpen);

      if (arg == "ON") {
        _switch.Close();
      } else if (arg == "OFF") {
        _switch.Open();
      } else {
        console.log('Argument "ON" or "OFF" is required.');
      }
    }
  }

  Program.Main();
}

```