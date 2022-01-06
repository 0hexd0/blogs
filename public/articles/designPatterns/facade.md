``` typescript
// 外观模式例子
namespace Facade {
  /* Complex parts */

  class CPU {
    freeze() {}
    jump(position: number) {}
    execute() {}
  }

  class Memory {
    load(position: number, data: string) {}
  }

  class HardDrive {
    read(lba: number, size: number): string {
      return "%$#@!";
    }
  }

  /* Façade */

  class Computer {
    BOOT_ADDRESS = 0; // 内存启动地址
    BOOT_SECTOR = 0; // 引导扇区
    SECTOR_SIZE = 512; // 扇区大小
    cpu!: CPU;
    hardDrive!: HardDrive;
    memory!: Memory;
    startComputer() {
      this.cpu.freeze();
      // 从引导扇区读取代码装载到内存启动地址
      this.memory.load(
        this.BOOT_ADDRESS,
        this.hardDrive.read(this.BOOT_SECTOR, this.SECTOR_SIZE)
      );
      // cpu从启动地址开始执行代码
      this.cpu.jump(this.BOOT_ADDRESS);
      this.cpu.execute();
    }
  }

  /* Client */

  class You {
    static main() {
      const facade = new Computer();
      facade.startComputer();
    }
  }
}
```