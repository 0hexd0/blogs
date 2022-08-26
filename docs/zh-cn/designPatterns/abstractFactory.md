``` typescript
// 抽象工厂

interface Button {}
interface Border {}

class MacButton implements Button {
  constructor() {
    console.log("a mac button is created")
  }
}
class MacBorder implements Border {
  constructor() {
    console.log("a mac border is created")
  }
}

class WinButton implements Button {
  constructor() {
    console.log("a win button is created")
  }
}
class WinBorder implements Border {
  constructor() {
    console.log("a win border is created")
  }
}

abstract class AbstractFactory {
  abstract createButton(): Button
  abstract createBorder(): Border

  createLine() {
    console.log("a line is created")
  }
}

class MacFactory extends AbstractFactory {
  createButton(): Button {
    return new MacButton()
  }
  createBorder(): Border {
    return new MacBorder()
  }
}

class WinFactory extends AbstractFactory {
  createButton(): Button {
    return new WinButton()
  }
  createBorder(): Border {
    return new WinBorder()
  }
}

// 操作系统（客户端）
// 客户端代码并不关注抽象工厂的实际类型，只依赖接口/抽象类编程
class OS {
  // 抽象工厂factory通常由外层容器注入，或者使用单例模式获取
  static start(factory: AbstractFactory) {
    factory.createLine() // 创建线条
    factory.createButton() // 创建按钮
    factory.createBorder() // 创建边框
  }
}

OS.start(new WinFactory()) // 启动windows操作系统

// 为什么抽象工厂使用抽象类而不是接口

// 现在已经有createButton和createBorder，添加一个createHeader需要改动哪些地方？

// 现在要兼容linux，需要改动哪些代码
```