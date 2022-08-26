``` typescript
namespace Memento {
  function fib(n: number): number {
    if (n === 1) {
      return 0;
    } else if (n === 2) {
      return 1;
    } else {
      return fib(n - 1) + fib(n - 2);
    }
  }

  // 使用了备忘录的fib
  interface FibCache {
    [prop: number]: number;
  }
  const cache: FibCache = {};
  function mementoFib(n: number): number {
    if (n === 1) {
      return 0;
    } else if (n === 2) {
      return 1;
    } else {
      if (!cache[n]) {
        cache[n] = mementoFib(n - 1) + mementoFib(n - 2);
      }
      return cache[n];
    }
  }
  console.time("fib");
  fib(40);
  console.timeEnd("fib");
  console.time("mementoFib");
  mementoFib(40);
  console.timeEnd("mementoFib");
}
```