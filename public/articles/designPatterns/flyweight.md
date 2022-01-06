``` typescript
// 享元模式例子

namespace Flyweight {
  class Flyweight {
    private companyName!: string;
    private companyLocation!: string;
    private companyWebsite!: string;
    get CompanyName() {
      return this.companyName;
    }
    get CompanyLocation() {
      return this.companyLocation;
    }
    get CompanyWebsite() {
      return this.companyWebsite;
    }
    constructor(
      companyName: string,
      companyLocation: string,
      companyWebsite: string
    ) {
      this.companyName = companyName;
      this.companyLocation = companyLocation;
      this.companyWebsite = companyWebsite;
    }
  }

  class FlyweightPointer {
    static readonly Company = new Flyweight("zto", "Shanghai", "www.zto.com");
  }

  class MyObject {
    get Company() {
      return FlyweightPointer.Company.CompanyName;
    }
  }
}
```