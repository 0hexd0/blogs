``` typescript
namespace Mediator {
  // 中介者模式模拟聊天室
  class Mediator {
    private persons = new Array<Person>();

    public send(message: string, from: string) {
      console.log(`Sending [${message}] from ${from}`);
      // 通知所有观察者
      this.persons.forEach((person) => {
        person.receive("message", from);
      });
    }

    // 添加观察者
    addObserver(person: Person) {
      this.persons.push(person);
    }
  }

  class Person {
    private _mediator: Mediator;

    public name: string;

    public constructor(mediator: Mediator, name: string) {
      this.name = name;
      this._mediator = mediator;
      this._mediator.addObserver(this);
    }

    public receive(message: string, from: string) {
      if (from != this.name) {
        console.log(`${this.name} received [${message}] from ${from}`);
      }
    }

    public send(message: string) {
      this._mediator.send(message, this.name);
    }
  }

  class Client {
    static main() {
      const mediator = new Mediator();
      const p1 = new Person(mediator, "小明");
      const p2 = new Person(mediator, "小王");
      const p3 = new Person(mediator, "小李");
      p1.send("hello 我是小明");
      p2.send("你好小明");
    }
  }

  Client.main();
}
```