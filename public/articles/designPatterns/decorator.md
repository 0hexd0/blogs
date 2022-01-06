``` typescript
// 装饰器模式例子

/**
  https://www.tslang.cn/docs/handbook/decorators.html

  装饰器求值
  typescript类中不同声明上的装饰器将按以下规定的顺序应用：
  
  参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
  参数装饰器应用到构造函数。
  类装饰器应用到类。 
 */
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