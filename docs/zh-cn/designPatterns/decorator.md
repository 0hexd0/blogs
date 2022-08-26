``` typescript
// 装饰器模式例子

namespace Decorator {
  function c(constructor: Function) {
    console.log("c(): called");
  }

  function g1() {
    console.log("g1(): evaluated");
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      console.log("g1(): called");
    };
  }

  function g2() {
    console.log("g2(): evaluated");
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      console.log("g2(): called");
    };
  }

  @c
  class C {
    @g1()
    @g2()
    method() {
      console.log("invoke method");
    }
  }

  const c1 = new C();

  // console.log("before invoke method");

  // c.method();
}
```