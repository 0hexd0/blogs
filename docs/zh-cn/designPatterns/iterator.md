``` typescript
namespace MyIterator {
  interface MyIterator {
    first(): Object;
    next(): Object | null;
    isDone(): boolean;
    currentItem(): Object;
  }

  abstract class Aggregate {
    abstract createIterator(): MyIterator;
  }

  class ConcreteIterator implements MyIterator {
    private list = new Array<Object>();
    private curr = 0;
    public constructor(list: Object[]) {
      this.list = list;
    }

    public first() {
      return this.list[0];
    }

    public next() {
      let ret = null;
      this.curr++;
      if (this.curr < this.list.length) {
        ret = this.list[this.curr];
      }
      return ret;
    }

    public isDone() {
      return this.curr >= this.list.length;
    }

    public currentItem() {
      return this.list[this.curr];
    }
  }

  class ConcreteAggregate extends Aggregate {
    private list = new Array<Object>();
    constructor(list: Object[]) {
      super();
      this.list = list;
    }
    createIterator() {
      return new ConcreteIterator(this.list);
    }
  }

  class Client {
    static main() {
      const list = new Array<Object>();
      list.push("miner");
      list.push("any");
      const agg = new ConcreteAggregate(list);
      const iterator = agg.createIterator();
      iterator.first();
      while (!iterator.isDone()) {
        console.log(iterator.currentItem());
        iterator.next();
      }
    }
  }

  Client.main();
}
```