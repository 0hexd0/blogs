``` typescript
namespace Strategy {
  // 客户账单
  class CustomerBill {
    // 已消费金额
    private drinks: number[];

    // 计费策略
    strategy: IBillingStrategy;

    constructor(strategy: IBillingStrategy) {
      this.drinks = [];
      this.strategy = strategy;
    }

    // 记录消费金额
    add(price: number, quantity: number) {
      this.drinks.push(this.strategy.getActPrice(price * quantity));
    }

    // 打印账单
    print() {
      // 累计每笔消费金额
      let sum = 0;
      for (const drinkCost of this.drinks) {
        sum += drinkCost;
      }
      console.log(`Total due: ${sum}.`);
      this.drinks = [];
    }
  }

  interface IBillingStrategy {
    getActPrice(rawPrice: number): number;
  }

  // 原价策略
  class NormalStrategy implements IBillingStrategy {
    getActPrice(rawPrice: number) {
      return rawPrice;
    }
  }

  // 打折策略
  class HappyHourStrategy implements IBillingStrategy {
    getActPrice(rawPrice: number) {
      return rawPrice * 0.5;
    }
  }

  // 价格歧视的例子
  class StrategyDemo {
    public static Main() {
      const normalStrategy = new NormalStrategy();
      const happyHourStrategy = new HappyHourStrategy();

      // 对第一个客人使用原价策略
      const firstCustomer = new CustomerBill(normalStrategy);

      // 原价消费
      firstCustomer.add(1.0, 1);

      // “打折时刻”开始

      // 替换打折策略
      firstCustomer.strategy = happyHourStrategy;
      // 打折消费
      firstCustomer.add(1.0, 2);

      // 第二个顾客使用打折策略
      const secondCustomer = new CustomerBill(happyHourStrategy);
      secondCustomer.add(0.8, 1);

      // 第一个顾客结账
      firstCustomer.print();

      // “打折时刻”结束

      // 第二个顾客使用原价策略
      secondCustomer.strategy = normalStrategy;
      // 原价消费
      secondCustomer.add(1.3, 2);
      secondCustomer.add(2.5, 1);
      // 第二个顾客结账
      secondCustomer.print();
    }
  }

  StrategyDemo.Main();
}
```