``` typescript
// 构造器模式例子
namespace Builder {
  /** “披萨” */
  class Pizza {
    dough = ""; // 面团
    sauce = ""; // 酱汁
    topping = ""; // 调味料

    setDough(dough: string) {
      this.dough = dough;
    }
    setSauce(sauce: string) {
      this.sauce = sauce;
    }
    setTopping(topping: string) {
      this.topping = topping;
    }
  }

  /** “食谱” */
  abstract class PizzaBuilder {
    protected pizza?: Pizza;

    getPizza() {
      return this.pizza;
    }

    createNewPizzaProduct() {
      this.pizza = new Pizza();
    }

    abstract buildDough(): void;
    abstract buildSauce(): void;
    abstract buildTopping(): void;
  }

  /** "风味1" */
  class HawaiianPizzaBuilder extends PizzaBuilder {
    public buildDough() {
      this?.pizza?.setDough("cross");
    }

    public buildSauce() {
      this?.pizza?.setSauce("mild");
    }

    public buildTopping() {
      this?.pizza?.setTopping("ham+pineapple");
    }
  }

  /** "风味2" */
  class SpicyPizzaBuilder extends PizzaBuilder {
    public buildDough() {
      this?.pizza?.setDough("pan baked");
    }

    public buildSauce() {
      this?.pizza?.setSauce("hot");
    }

    public buildTopping() {
      this?.pizza?.setTopping("pepperoni+salami");
    }
  }

  /** "厨师+服务员" */
  class Waiter {
    private pizzaBuilder?: PizzaBuilder;

    setPizzaBuilder(pb: PizzaBuilder) {
      this.pizzaBuilder = pb;
    }

    // 服务员上菜
    getPizza() {
      return this?.pizzaBuilder?.getPizza();
    }

    // 厨师做菜
    constructPizza() {
      this?.pizzaBuilder?.createNewPizzaProduct();
      this?.pizzaBuilder?.buildDough();
      this?.pizzaBuilder?.buildSauce();
      this?.pizzaBuilder?.buildTopping();
    }
  }

  /** 客户端代码 */
  class BuilderExample {
    // 去吃饭
    public static main() {
      const waiter = new Waiter(); // 服务员打招呼
      const hawaiian_pizzabuilder = new HawaiianPizzaBuilder(); // 用户点餐
      waiter.setPizzaBuilder(hawaiian_pizzabuilder); // 通知后厨
      waiter.constructPizza(); // 厨师按菜谱做菜

      const pizza = waiter.getPizza(); // 服务员上菜
    }
  }

  BuilderExample.main();
}
```