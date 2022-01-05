``` typescript
// 访问者模式例子
namespace Visitor {
  // 访问器接口，可能访问四种类型
  interface Visitor {
    visit(wheel: Wheel): void;
    visit(engine: Engine): void;
    visit(body: Body): void;
    visit(car: Car): void;
  }

  class Wheel {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
    // 处理访问逻辑
    accept(visitor: Visitor) {
      visitor.visit(this); // 将自身传给访问者的visit
    }
  }

  class Engine {
    accept(visitor: Visitor) {
      visitor.visit(this);
    }
  }

  class Body {
    accept(visitor: Visitor) {
      visitor.visit(this);
    }
  }

  class Car {
    private engine = new Engine();
    private body = new Body();
    private wheels = [
      new Wheel("front left"),
      new Wheel("front right"),
      new Wheel("back left"),
      new Wheel("back right"),
    ];
    accept(visitor: Visitor) {
      visitor.visit(this);
      // 令同样的访问器访问子组件
      this.engine.accept(visitor);
      this.body.accept(visitor);
      this.wheels.forEach((wheel) => {
        wheel.accept(visitor);
      });
    }
  }

  class PrintVisitor implements Visitor {
    // 访问逻辑
    visit(component: Wheel | Engine | Body | Car) {
      if (component instanceof Wheel) {
        console.log("Visiting " + component.getName() + " wheel");
      } else if (component instanceof Engine) {
        console.log("Visiting engine");
      } else if (component instanceof Body) {
        console.log("Visiting body");
      } else {
        console.log("Visiting car");
      }
    }
  }

  class VisitorDemo {
    static main() {
      const car = new Car();
      const visitor = new PrintVisitor();
      car.accept(visitor);
    }
  }

  VisitorDemo.main();
}
```