``` typescript
// 单例模式例子

// 懒汉模式
class Global {
  private static global: Global

  private constructor() {}

  public static getInstance() {
    if (!Global.global) {
      Global.global = new Global()
    } else {
      return Global.global
    }
  }
}

const g = Global.getInstance()

// 饿汉模式，加载类时初始化
class App {
  private constructor() {}
  private static app = new App()
  public static getInstance() {
    return App.app
  }
}

const w = App.getInstance()

// 线程安全的单例模式
```