``` typescript
namespace Observer {
  // 观察者接口
  interface IObserver {
    update(message: string): void;
  }

  // 被观察者类
  class Subject {
    // 该对象的观察者
    private observers: IObserver[];

    constructor() {
      this.observers = [];
    }

    // 注册/订阅
    register(observer: IObserver) {
      if (!this.observers.includes(observer)) {
        this.observers.push(observer);
      }
    }

    // 取消订阅
    deregister(observer: IObserver) {
      const targetIdx = this.observers.indexOf(observer);
      if (targetIdx !== -1) {
        this.observers.splice(targetIdx, 1);
      }
    }

    // 通知所有订阅者
    notify(message: string) {
      for (const observer of this.observers) {
        observer.update(message);
      }
    }
  }

  // 观察者1号
  class Observer1 implements IObserver {
    update(message: string) {
      console.log("observer1:" + message);
    }
  }

  // 观察者2号
  class Observer2 implements IObserver {
    update(message: string) {
      console.log("observer2:" + message);
    }
  }

  // Test class
  class ObserverTester {
    static Main() {
      // 创建被观察对象
      const mySubject = new Subject();
      // 创建观察者
      const myObserver1 = new Observer1();
      const myObserver2 = new Observer2();

      mySubject.register(myObserver1);
      mySubject.notify("message 1");
      mySubject.register(myObserver2);
      mySubject.notify("message 2");
      mySubject.deregister(myObserver2);
      mySubject.notify("message 3");
    }
  }

  ObserverTester.Main();
}

```