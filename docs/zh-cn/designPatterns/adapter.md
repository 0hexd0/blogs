``` typescript
namespace Adapter {
  class Adaptee {
    methodB() {}
  }

  class Adaptor {
    adaptee: Adaptee;
    constructor(adaptee: Adaptee) {
      this.adaptee = adaptee;
    }
    methodA() {
      this.adaptee.methodB();
    }
  }

  interface Dep {
    methodA(): void;
  }

  function outerMethod(dep: Dep) {
    dep.methodA();
  }

  function main() {
    const adaptee = new Adaptee();
    const dep = new Adaptor(adaptee);
    outerMethod(dep);
  }
}
```