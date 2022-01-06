``` typescript
// 代理模式例子

interface ICar {
  driveCar(): void;
}

// Real Object
class Car implements ICar {
  driveCar() {
    console.log("Car has been driven!");
  }
}

// Proxy Object
class ProxyCar implements ICar {
  private driver: Driver;
  private realCar: ICar;

  constructor(driver: Driver) {
    this.driver = driver;
    this.realCar = new Car();
  }

  driveCar() {
    if (this.driver.Age < 16)
      console.log("Sorry, the driver is too young to drive.");
    else this.realCar.driveCar();
  }
}

class Driver {
  private age: number;

  public get Age() {
    return this.age;
  }

  constructor(age: number) {
    this.age = age;
  }
}

// How to use above Proxy class?
function main() {
  let car = new ProxyCar(new Driver(15));
  car.driveCar();

  car = new ProxyCar(new Driver(25));
  car.driveCar();
}

main();

```