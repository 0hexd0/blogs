``` typescript
// 单例模式

namespace Singleton {
  // 懒汉模式
  class Global {
    private static global: Global;

    private constructor() {}

    public static getInstance() {
      if (!Global.global) {
        Global.global = new Global();
      } else {
        return Global.global;
      }
    }
  }

  // const g = new Global() // 无法通过构造函数创建实例

  const g = Global.getInstance();

  // 饿汉模式，加载类时初始化
  class App {
    private constructor() {}
    private static app = new App();
    public static getInstance() {
      return App.app;
    }
  }

  const w = App.getInstance();
}

```