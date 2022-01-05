``` typescript
// 原型模式 例子
namespace Prototype {
  class Cloneable {
    clone(): Object {
      console.log("clone myself")
      return {}
    }
  }

  class Cookie extends Cloneable {
    public clone() {
      return super.clone() as Cookie
    }
  }

  /** Concrete Prototypes to clone **/
  class CoconutCookie extends Cookie {}

  /** Client Class**/
  class CookieMachine {
    private cookie: Cookie //cookie必须是可复制的

    constructor(cookie: Cookie) {
      this.cookie = cookie
    }

    public makeCookie(): Cookie {
      return this.cookie.clone()
    }
  }

  function main() {
    const prot = new CoconutCookie()
    const cm = new CookieMachine(prot) //设置原型
    for (let i = 0; i < 100; i++) {
      cm.makeCookie() //通过复制原型返回多个cookie
    }
  }

  main()
}
```