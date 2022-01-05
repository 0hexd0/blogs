``` typescript
namespace State {
  class StateContext {
    private state: State;

    constructor() {
      this.state = new LowerCaseState();
    }

    // 设置状态
    setState(newState: State): void {
      this.state = newState;
    }

    writeName(name: string) {
      this.state.writeName(this, name);
    }
  }

  interface State {
    writeName(context: StateContext, name: string): void;
  }

  // 单次小写打印
  class LowerCaseState implements State {
    writeName(context: StateContext, name: string) {
      console.log(name.toLowerCase());
      context.setState(new MultipleUpperCaseState());
    }
  }

  // 多次大写打印
  class MultipleUpperCaseState implements State {
    private count = 0;

    writeName(context: StateContext, name: string) {
      console.log(name.toUpperCase());

      if (++this.count > 1) {
        context.setState(new LowerCaseState());
      }
    }
  }

  class StateDemo {
    static main() {
      const context = new StateContext();
      context.writeName("Monday");
      context.writeName("Tuesday");
      context.writeName("Wednesday");
      context.writeName("Thursday");
      context.writeName("Friday");
      context.writeName("Saturday");
      context.writeName("Sunday");
    }
  }

  StateDemo.main();
}
```