``` typescript
// 建造模式例子
namespace Builder {
  interface UserInfo {
    name: string;
  }
  
  interface SystemInfo {
    plateform: string;
  }

  // 接口参数
  class ApiParams {
    userInfo: UserInfo; // 用户信息
    systemInfo: SystemInfo; // 系统信息
  }

  // 表单类接口参数
  export class FormAPIParams<T> extends ApiParams {
    formInfo: T;
  }

  /** 参数构建器 */
  abstract class ApiParamsBuilder<T> {
    protected apiParams: ApiParams;

    constructor() {
      this.apiParams = new ApiParams();
    }

    setUserInfo() {
      // 模拟用户信息获取
      this.apiParams.userInfo = {
        name: "小明",
      };
    }

    setSystemInfo() {
      this.apiParams.systemInfo = {
        plateform: "windows",
      };
    }

    // 设置外部参数
    abstract setOuterInfo(outerInfo: T): void;

    // 获取参数
    abstract getParams(): ApiParams;
  }

  export class FormApiParamsBuilder<T> extends ApiParamsBuilder<T> {
    formInfo: T;

    protected apiParams: FormAPIParams<T>;

    setOuterInfo(formInfo: T) {
      this.apiParams.formInfo = formInfo;
    }

    getParams() {
      return this.apiParams;
    }
  }

  /** 主管 */
  export class Director<T, U extends ApiParams> {
    private apiParamsBuilder: ApiParamsBuilder<T>;

    setApiParamsBuilder(apiParamsBuilder: ApiParamsBuilder<T>) {
      this.apiParamsBuilder = apiParamsBuilder;
    }

    // 获取参数
    getApiParams() {
      return this.apiParamsBuilder.getParams() as U;
    }

    // 参数构建
    constructParams(outerInfo: T) {
      this.apiParamsBuilder.setUserInfo();
      this.apiParamsBuilder.setSystemInfo();
      this.apiParamsBuilder.setOuterInfo(outerInfo);
    }
  }
}

import Director = Builder.Director;
import FormAPIParams = Builder.FormAPIParams;
import FormApiParamsBuilder = Builder.FormApiParamsBuilder;

interface MyFormData {
  time: string;
  money: number;
}

/** 业务组件如何构造参数 */
class BuilderExample {
  public static main() {
    // 从组件获取的表单信息
    const formInfo = {
      time: "2021-1-14 00:00:00",
      money: 100,
    };
    type FormInfo = typeof formInfo;
    const director = new Director<FormInfo, FormAPIParams<FormInfo>>();
    const formParamsBuilder = new FormApiParamsBuilder(); //新建构造器
    director.setApiParamsBuilder(formParamsBuilder);
    director.constructParams(formInfo); // 构建参数
    const params = director.getApiParams(); // 获取参数
    console.log("params", params);
  }
}

BuilderExample.main();

```