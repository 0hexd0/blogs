# 设计模式

## 什么是设计模式？

> 在软件工程中，设计模式（design pattern）是对软件设计中普遍存在（反复出现）的各种问题，所提出的解决方案。

长期以来，设计模式指的是《设计模式：可复用面向对象软件的基础》一书中总结的 23 种面向对象的设计模式。

> 面向对象设计模式通常以 class 或 object 来描述其中的关系和相互作用。

## 什么是面向对象？

> 面向对象程序设计（英语：Object-oriented programming，缩写：OOP）是种具有对象概念的编程典范，同时也是一种程序开发的抽象方针。它可能包含数据、特性、代码与方法。对象则指的是类的实例。它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性，对象里的程序可以访问及经常修改对象相关连的数据。

- JavaScript有基础类型和对象类型，无类型系统，所以严格意义上说 JavaScript**不是面向对象**的。但由于有对象（object）的存在，JavaScript 的开发者依旧可以借鉴设计模式写出更好的代码。
- TypeScript有完整且强大的类型系统，所以是面向对象的。

## SOLID (面向对象设计的基本原则)

| 首字母 | 指代         | 概念                                                 |
| ------ | ------------ | ---------------------------------------------------- |
| S      | 单一功能原则 | 每个类仅具有一种单一功能                             |
| O      | 开闭原则     | 软件应该对于扩展开放，但对于修改封闭                 |
| L      | 里氏替换原则 | 派生类（子类）对象可以在程序中代替其基类（超类）对象 |
| I      | 接口隔离原则 | 多个特定接口要好于一个宽泛用途的接口                 |
| D      | 依赖反转原则 | 方法依赖于抽象而不是一个实例                         |

### 单一功能原则

### 开闭原则

- 在**只新增代码，不修改原代码**的情况下增加新的功能
- **面向接口编程**是个好主意

```typescript
// 我会飞
interface ICanFly {
    void fly(); // 必须具有fly方法，这是约定...
}

// 鸟类
class Bird implements ICanFly {
    fly() {
        // 小鸟在用力拍翅膀...
    }
}

// 飞机
class Plane implements ICanFly {
    fly() {
        // 飞机的发动机在喷气...
    }
}

// 起飞
function takeOff(sth: ICanFly) {
    // 飞飞飞
    sth.fly() // sth一定按约定实现了fly方法...
}

// 那么，如何在不改变上述代码的情况下让takeOff支持宇宙飞船？

// 很简单，只需要让新建Space类，让它实现ICanFly接口即可
class Space implements ICanFly {
    fly() {
        // 飞船的核反应堆在闪闪发光...
    }
}
```

### 里氏替换原则

> 子类继承父类时，除添加新的方法完成新增功能外，尽量不要重写父类的方法

- 如果两个类无法实现里氏替换规则，重新思考是否使用继承

### 接口隔离原则

- 接口要尽可能的拆分，避免胖接口

```typescript
// 胖接口
interface IBird {
    void fly();

    void eat();
}

// 拆分
interface ICanFly {
    void fly();
}

interface IAlive {
    void eat();
}
```

### 依赖反转原则

- 高层类定义好接口，自身的实现依赖于定义的接口；同时底层类的实现也依赖高层类的接口。
- 由于这种设计，高层类可以使用任何实现了接口的底层类，这样就可以实现**依赖注入**。

<img src="../../images/designPatterns/Dependency_inversion.png" width="60%">

### 依赖注入 <a href="/zh-cn/designPatterns/ioc" target="_blank" >示例代码</a>

> 依赖注入形式下，调用方不再直接使用**依赖**，取而代之是**注入** 。**注入**是指将**依赖**传递给调用方的过程。在**注入**之后，调用方才会调用该**依赖**。

- 依赖注入带来的额外好处是**将类实例化的过程解耦**
  
## 23 种设计模式

<img src="../../images/designPatterns/23.svg" width="60%">

## 创建型模式

> 创建型模式提供了创建对象的机制， 能够提升已有代码的灵活性和可复用性。

> 创建型设计模式主要解决“对象的创建”问题。

在创建复杂对象时，使用创建型模式可以避免创建对象和对象的消费过程耦合，同时提高代码复用率。

### Vue中的创建型模式

在使用templat方式声明组件时，通过标签引用子组件，相当于直接组合具体类，这种写法缺少动态能力，我们可以使用动态组件技术修改部分子组件的运行时实例，但却无法修改子组件的布局方式。所以要想更好的利用创建型模式，需要使用渲染函数render或者JSX语法。

``` javascript
render: function (createElement) {
  return createElement(MyComponent, {
    props: {
      someProp: 'foobar'
    }
  })
}
```

### 工厂方法 <a href="/zh-cn/designPatterns/factory" target="_blank" >示例代码</a>

#### 定义和描述

> 工厂对象通常包含一个或多个方法，用来创建这个工厂所能创建的各种类型的对象。这些方法可能接收参数，用来指定对象创建的方式，最后返回创建的对象。

- 对象的使用者把对象的创建过程委托给**工厂**，在编程时只依赖工厂接口，至于最终如何实例化对象，取决于使用的具体工厂和构建时传参。

#### 真实世界类比

小明去商店买饮料，小明可以买到可乐，雪碧等等许多饮料。小明想：小卖部真方便呀，我不用跑到可乐工厂去买可乐，也不用跑到雪碧工厂买雪碧。这里的小卖部既可以**提供**可乐也可以**提供**雪碧，作为**消费者**的小明只需要**依赖**小卖部这个饮料**供应商**就好了。这个例子中，小卖部就是可乐工厂和雪碧工厂的抽象，饮料就是可乐和雪碧的抽象。

#### 类图

<img src="../../images/designPatterns/FactoryMethod.svg" width="60%">

#### 应用场景

- 当我们用不同的参数生成不同的对象，我们就是在使用**简单工厂**
- 考虑较复杂的一个场景，我们希望统一整个项目的对话框。对话框目前有两种：信息对话框和表单对话框。信息对话框只要展示提示信息，表单对话框展示表单组件。这时可以考虑工厂方法。

```typescript
interface VueComponent {}

enum MessageDialogType {
  Warning,
  Error,
  Success,
}

interface IFormData {
  [prop: string]: string | number;
}

interface IDialogCreateOptions {
  title: string;
}

interface IFormDialogCreateOptions extends IDialogCreateOptions {
  formComponent: VueComponent;
  formData: IFormData;
}

interface IMessageDialogCreateOptions extends IDialogCreateOptions {
  message: string;
  type: MessageDialogType;
}

interface IDialogFactory {
  createDialog(options: IDialogCreateOptions);
}

class FormDialogFactory implements IDialogFactory {
  createElement: Function;
  constructor(createElement: Function) {
    this.createElement = createElement;
  }

  createDialog(options: IFormDialogCreateOptions) {
    return this.createElement("div", {
      props: {
        formData: options.formData,
      },
    });
  }
}

class MessageDialogFactory implements IDialogFactory {
  createElement: Function;
  constructor(createElement: Function) {
    this.createElement = createElement;
  }

  createDialog(options: IMessageDialogCreateOptions) {
    return this.createElement("div", {
      props: {
        message: options.message,
      },
    });
  }
}

// 父组件如何使用Dialog工厂
function render(createElement) {
  // 创建提示对话框
  const messageDialogFactory = new MessageDialogFactory(createElement);
  messageDialogFactory.createDialog({
    title: "温馨提示",
    type: MessageDialogType.Warning,
    message: "您没有权限！",
  });

  // 创建表单对话框
  const formComponent: VueComponent = {}; // 表单组件
  const formDialogFactory = new FormDialogFactory(createElement);
  formDialogFactory.createDialog({
    title: "编辑用户信息",
    formComponent,
    formData: {
      username: "",
      age: 18,
    },
  });
}
```

### 抽象工厂 <a href="/zh-cn/designPatterns/abstractFactory" target="_blank" >示例代码</a>

#### 定义和描述

> “工厂”是创建产品（对象）的地方，其目的是将产品的创建与产品的使用分离。抽象工厂模式的目的，是将若干抽象产品的接口与不同主题产品的具体实现分离开。这样就能在增加新的具体工厂的时候，不用修改引用抽象工厂的客户端代码。

#### 真实世界类比

小明在考驾照时学会了方向盘，刹车，转向灯的使用方式。拿到驾照后小明要买车了，他去车厂试驾，发现所有品牌的车都有方向盘，刹车和转向灯，而且**功能**都是一样的，只是装饰**风格**不同。因为车管所**规定**，任何车厂生产的汽车都必须具有方向盘，刹车，转向灯。这里车管所就是**抽象工厂**，它规定了车具有哪些功能，各个汽车厂商就是**具体工厂**，负责实际的生产。所以对小明来说，任何车都是一样的开。

#### 类图

<img src="../../images/designPatterns/Abstract_factory.png" width="60%">

#### 应用场景

现在要用8套设计和交互规范实现切换皮肤功能，某些可以通过修改CSS直接实现，但有些组件交互逻辑完全不同。此时可以用抽象工厂模式。

### 建造模式 <a href="/zh-cn/designPatterns/builder" target="_blank" >示例代码</a>

#### 定义和描述

> 建造模式可以将复杂对象的建造过程抽象出来（抽象类），使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象。

#### 真实世界类比

小明打算DIY一台电脑但是钱不够，于是他先买了主板，然后从**几套配置**中选了一套攒配件慢装。小明发现cpu，内存条，显卡可以用任何顺序安装，于是每个月买一个配件，买一个就装到主板上。几个月后攒齐配件，一次点亮。几年后电脑的配置慢慢提高了，小明想提升下散热能力，发现只要**加装**水冷系统就好。这个例子中电脑主板就是**建造者**，提供配件接入能力，小明作为**主管**拥有**多套建造方案**，也决定着每套方案中配件的**接入顺序**。

#### 类图

<img src="../../images/designPatterns/Builder.png" width="60%">

#### 应用场景

前端调用接口时往往要构造一个巨大的参数对象，其中有些部分是所有/某些接口公用的，比如用户信息和系统信息。通常参数构造逻辑不是和业务逻辑**藕合**，就是和HTTP客户端逻辑（比如Axios）**耦合**，这时我们可以使用建造模式将其分离。

### 抽象工厂和建造模式的比较

- Factory的methods之间通常没有关联；Builder的methods可能同属于某个产品的构建过程。
- 建造模式多了Director角色，令其控制组装过程；抽象工厂的产品往往在客户端被组装。

### 原型模式 <a href="/zh-cn/designPatterns/prototype" target="_blank" >示例代码</a>

#### 定义和描述

> 特点在于通过“复制”一个已经存在的实例来返回新的实例,而不是新建实例。被复制的实例就是我们所称的“原型”，这个原型是可定制的。

#### 真实世界类比

原型模式已经深深根植于JavaScript语言之中，前端日常开发无时无刻不在使用原型模式，几乎所有对象都是从Object对象复制而来。

#### 类图

<img src="../../images/designPatterns/Prototype.svg" width="60%">

### 单例模式 <a href="/zh-cn/designPatterns/singleton" target="_blank" >示例代码</a>

#### 定义和描述

> 在应用这个模式时，单例对象的类必须保证只有一个实例存在。

#### 能否直接使用全局变量保存单例？

- 当然可以，不过全局变量存在很多问题，它很容易造成命名空间污染
- 使用闭包防止变量泄漏
- 使用命名空间防止冲突

#### 应用场景

- 使用Vuex每个应用将**仅仅包含一个store实例**
- 全局性的dom只保留一个实例，比如全局dialog

``` javascript
var myApp = {} // 使用命名空间

myApp.createLoginLayer = (function () {
  var div;
  return function () {
    if (!div) {
      div = document.createElement("div");
      div.innerHTML = "我是登录浮窗";
      div.style.display = "none";
      document.body.appendChild(div);
    }
    return div;
  };
})();
```

- 如果某些接口只被调用一次（比如用户信息、菜单、配置项），可以结合Promise封装一些惰性且带缓存的接口
  
```typescript
async function getUserInfo() {
  const userInfo = await getPermissions()
  console.log('userInfo', userInfo)
}
namespace DisposableApis {
  let permissions: [] | null = null;
  async function getPermissions() {
    if (!permissions) {
      const res = await fetch('https://***.com/user', {
        credentials: "include",
      })
      permissions = await res.json();
      return permissions
    } else {
      return Promise.resolve(permissions);
    }
  };
}
getUserInfo()
setTimeout(
  getUserInfo, 1000
)
setTimeout(
  getUserInfo, 2000
)
setTimeout(
  getUserInfo, 3000
)
```

## 结构型模式

> 结构型模式介绍如何将对象和类组装成较大的结构， 并同时保持结构的灵活和高效。

> 结构型模式主要总结了一些类或对象组合在一起的经典结构，这些经典的结构可以解决特定应用场景的问题。

### 适配器模式 <a href="/zh-cn/designPatterns/adapter" target="_blank" >示例代码</a>

#### 定义和描述

> 有时候也称包装样式或者包装。将一个类的接口转接成用户所期待的。一个适配使得因接口不兼容而不能在一起工作的类能在一起工作，做法是将类自己的接口包裹在一个已存在的类中。

#### 真实世界类比

小明买了一台switch，厂商赠送了一个底座，游戏机插在底座上就能从掌机模式切换成主机模式。这里switch底座就是**适配器**，switch本体不需要适配器也能正常工作。

#### 类图

<img src="../../images/designPatterns/ObjectAdapter.png" width="60%">

#### 应用场景

- 开发过程中我们经常使用适配器模式，只不过没有把它分离成单独的adapter。

``` javascript
// 计算总年龄
function getTotalAge(persons) {
  let age = 0;
  persons.forEach((person) => {
    age += person.age;
  });
  return age;
}

const persons = [
  {
    name: "小明",
    age: 18,
  },
  {
    name: "小李",
    age: 19,
  },
];

// 旧调用方式
const age1 = getTotalAge(persons);
console.log("age1", age1);

// 能否兼容新的数据结构？
const buildings = [
  {
    name: "教学楼",
    year: "12",
  },
  {
    name: "食堂",
    year: "8",
  },
];

// 常规写法
const age2 = getTotalAge(
  buildings.map((item) => {
    return {
      age: Number(item.year),
    };
  })
);
console.log("age2", age2);

// 优化：分离出adapter
function adapter(building) {
  return {
    age: Number(building.year),
  };
}
const age3 = getTotalAge(buildings.map(adapter));
console.log("age3", age3);
```

- 还记得之前提到的建造模式吗？之前把参数构建的过程委托给Director类了，不过这样构造出来的参数具有固定的几种格式。即使我们在项目早期做了约定（比如：所有接口按固定格式传参），也还是会有一些接口的参数格式“不合群”。适配器模式可以优雅的解决这个问题：相比于业务代码里构造新参数，适配器可以把参数构造的过程解耦出来，如果以后接口参数再变动，我们完全不用关心业务代码，只需要修改适配器代码。

### 桥接模式 <a href="/zh-cn/designPatterns/bridge" target="_blank" >示例代码</a>

#### 定义和描述

> 桥接模式是软件设计模式中最复杂的模式之一，它把事物对象和其具体行为、具体特征分离开来，使它们可以各自独立的变化。

> 桥接模式就是为了避免直接继承带来的子类爆炸。

- 桥接模式的本质是**面向接口编程**

#### 真实世界类比

小明是游戏引擎开发者，他写的程序需要调用操作系统的很多接口。涉及到图形的部分依赖一套图形API，而不是在代码里写一大堆if else逻辑判断显卡型号然后调用对应显卡厂商提供的API。涉及到计算的部分只依赖编程语言，也不用写一大堆代码判断CPU型号。操作系统使用图形API和编程语言，给程序员提供了一套通用接口，使程序员可以**依赖接口编程**而不用关心其具体实现，这就是**桥接**。

#### 类图

<img src="../../images/designPatterns/Bridge.svg" width="60%">

#### 应用场景

前端微服务场景中，为了保持代码风格的统一，我们开发一个通用SDK给所有子应用调用，假设其主要包含三个部分：
1. Web Storage，兼容cookie，web storage，子应用在初始化SDK时可以选择具体实现。
2. HTTP Client，兼容fetch和XMLHTttpRequest，子应用在初始化SDK时可以选择具体实现。
3. 通用业务能力， 比如登录/登出（支持单点登录），用户信息查询等等，子应用在初始化SDK时可以选择具体实现。

### 组合模式 <a href="/zh-cn/designPatterns/composite" target="_blank" >示例代码</a>

#### 定义和描述

> The intent of a composite is to "compose" objects into tree structures to represent part-whole hierarchies.

> 组合模式通过把对象“组装”在树状结构之中来表示部分-整体结构。

- 组合模式基本上用在树状数据结构递归的场景。

#### 真实世界类比

HTML中的document节点是dom，body节点也是dom，document节点的children数组包含了body节点，因此具有部分-整体结构。我们考察下document.querySelector方法的执行过程，document首先判断自身是否符合查找条件，如果不符合，找到子节点body继续调用querySelector，直到自身符合条件或children为空时返回。这里的dom就应用了**组合**模式。

#### 类图

<img src="../../images/designPatterns/Composite.svg" width="60%">

#### 应用场景

存在部分-整体结构的地方都可能用到组合模式：

- 前端组件化就是应用了组合模式思想，父组件包含子组件，父组件渲染时会在内部渲染所有子组件。
- 表单校验功能，客户端只需执行表单的校验方法，该方法内部遍历校验所有表单项。
- 设计一个无层数限制，折叠展示的树状组件，父组件的toggle方法只需调用子组件的toggle，最终在叶子节点实现真正的toggle逻辑。

### 装饰模式 <a href="/zh-cn/designPatterns/decorator" target="_blank" >示例代码</a>

#### 定义和描述

> 装饰模式，一种**动态**地往一个类别中添加新的行为的设计模式。

#### 真实世界例子

小明上班穿西装，游泳时穿泳装，打球时穿球衣。小明和衣服整体构成一个装饰器实例，这个新的实例可以看作小明的外观增强版。

#### 类图

<img src="../../images/designPatterns/Decorator.svg" width="60%">

#### 应用场景

- 前端经常需要把后端定义的枚举值转换成含义明确的文案，此时我们可以用装饰器强化接口。

``` javascript
const statesMapper = {
  0: '关闭',
  1: '开启'
}

// 装饰器
const statesNameDecorator = (api) => {
  return (args) => api(args).then(
    list => {
      return list.map(item => {
        return {
          ...item,
          statesName: statesMapper[item.states]
        }
      })
    }
  )
}

// 原始方法
const getDoorStatus = () => {
  return Promise.resolve(
    [
      {
        name: '5号门',
        states: 0
      },
      {
        name: '6号门',
        states: 1
      }
    ]
  )
}

// 装饰器实例getDoorStatusWithName和getDoorStatus具有相同的函数签名
const getDoorStatusWithName = statesNameDecorator(getDoorStatus)

getDoorStatusWithName().then(
  res => {
    console.log(res)
  }
)
```

### 代理模式 <a href="/zh-cn/designPatterns/proxy" target="_blank" >示例代码</a>

#### 定义和描述

> a proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes. Use of the proxy can simply be forwarding to the real object, or can provide additional logic.

#### 真实世界例子

小丽是个演员，但她不太懂炒热度、买热搜这些商业活动，好在演艺公司给她分配了经纪人，帮她**代理**这些和主业无关的事情，于是小丽得以**专注**在演艺事业上。

#### 类图

<img src="../../images/designPatterns/Proxy.svg" width="60%">

#### 应用场景

- HTTP拦截：在发送和接收HTTP请求时拦截，比如Axios的拦截器。
- 访问控制：执行某个方法前进行权限/条件判断。
- 缓存接口：经过代理的接口使用缓存代替重新请求。。

``` javascript
const cacheData = new WeakMap()

const cacheApiProxyCreator = (api) => {
  return async (args) => {
    if (!cacheData.has(api)) {
      const res = await api(args)
      cacheData.set(api, res)
    }
    return Promise.resolve(cacheData.get(api))
  }
}

const getRemoteUserInfo = () => {
  console.log('请求了远程用户信息接口')
  return Promise.resolve({
    name: '小明',
    age: 18
  })
}

const getRemoteUserPermission = () => {
  console.log('请求了远程用户权限接口')
  return Promise.resolve(['query_order', 'del_order'])
}

const getUserInfoCacheProxy = cacheApiProxyCreator(getRemoteUserInfo)
const getUserPermissionCacheProxy = cacheApiProxyCreator(getRemoteUserPermission)

function getUserInfo() {
  getUserInfoCacheProxy().then(
    res => {
      console.log(res)
    }
  )
  getUserPermissionCacheProxy().then(
    res => {
      console.log(res)
    }
  )
}

getUserInfo()

setTimeout(getUserInfo, 1000)

setTimeout(getUserInfo, 2000)
```

### 装饰模式和代理模式的比较

- 两者的实现方式类似，能做的事情也类似，原始对象和强化对象继承同一个接口。
- 从类图看，代理模式中Proxy和RealSubject之间是关联关系，并没有指明是依赖关联、聚合关联和组合关联中的哪一种，实现起来比较自由。装饰模式中Decorator和Component之间是聚合关系，即组件是装饰器的一部分，装饰器有一个成员变量是对组件的引用。也就是说，装饰器比代理更依赖原始对象，更适用于对原始对象做更多控制的场景，而代理模式更适用于那些与原始对象关联较小的场景。
- 代理适合更抽象的通用场景，装饰器适合具体的业务场景。

### 外观模式 <a href="/zh-cn/designPatterns/facade" target="_blank" >示例代码</a>

#### 定义和描述

> 外观模为为子系统中的一组界面提供一个统一的高层界面，使得子系统更容易使用。

- 外观模式的本质是封装，用胶水代码粘合其他功能模块，从而提供简明易用的接口。

#### 真实世界类比

小明决定使用中通快递来邮寄一本书，整个邮寄过程需要快递公司各个子系统的协作才能完成，小明不可能和所有子系统交互，他只需要在官网下单就好了。中通官网就是整个快递公司的**外观**。

#### 类图

<img src="../../images/designPatterns/Facade.svg" width="60%">

#### 应用场景

- 兼容性场景：封装一个HTTP客户端，具有get和post两个方法，首先使用fetch和XMLHttpRequest分别实现两套接口，最后在外观接口内进行环境能力检测，实现优雅降级。

### 享元模式 <a href="/zh-cn/designPatterns/flyweight" target="_blank" >示例代码</a>

#### 定义和描述

> The flyweight pattern is useful when dealing with large numbers of objects with simple repeated elements that would use a large amount of memory if individually stored. It is common to hold shared data in external data structures and pass it to the objects temporarily when they are used.

- 当我们将几个对象的公用状态提取成单个对象时我们就是在使用享元模式。
  
- 享元对象一般是不可变的，通常由单例模式构造。

- 可以结合工厂模式实现享元池：工厂会根据参数在之前已创建的享元中进行查找，如果找到满足条件的享元就将其返回，如果没有找到就根据参数新建享元。

#### 应用场景

- 海量数据存储：假设我们渲染一个下雪的场景，需要渲染50w个雪花。假设每个雪花对象有颜色，形状，缩放倍率，位置属性。假设颜色，形状，缩放率在飘落的过程中是不变的，我们可以使用享元池来分离这三者，假设这三条数据总共1KB，那么我们可以节省约500M的内存空间。
  
## 行为型模式

> 行为模式负责对象间的高效沟通和职责委派。

> 行为型设计模式主要解决的就是“类或对象之间的交互”问题。

### 责任链模式 <a href="/zh-cn/designPatterns/chainOfResponsibility" target="_blank" >示例代码</a>

> 责任链包含了一些命令对象和一系列的处理对象。每一个处理对象决定它能处理哪些命令对象，它也知道如何将它不能处理的命令对象传递给该链中的下一个处理对象。该模式还描述了往该处理链的末尾添加新的处理对象的方法。

<img src="../../images/designPatterns/Chain_of_Responsibility.jpg" width="60%">

### 命令模式 <a href="/zh-cn/designPatterns/command" target="_blank" >示例代码</a>

> the command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time.

### 解释器模式

> 指定如何对某种语言中的表达式求值

### 迭代器模式 <a href="/zh-cn/designPatterns/iterator" target="_blank" >示例代码</a>

> 可以让用户透过特定的接口轮流访问容器中的每一个元素而不用了解底层的实现

- javascript迭代器与生成器

### 中介者模式 <a href="/zh-cn/designPatterns/mediator" target="_blank" >示例代码</a>

> 中介者模式定义了一个中介者对象，该对象封装了系统中对象间的交互方式。 由于它可以在运行时改变程序的行为

### 备忘录模式 <a href="/zh-cn/designPatterns/memento" target="_blank" >示例代码</a>

> The memento pattern is a software design pattern that provides the ability to restore an object to its previous state.

- 备忘录模式是一种用空间换时间的常用手段

### 观察者模式 <a href="/zh-cn/designPatterns/observer" target="_blank" >示例代码</a>

> 在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。这通常透过呼叫各观察者所提供的方法来实现。

<img src="../../images/designPatterns/Observer.png" width="60%">

- 发布订阅模式通过新增事件中心，避免了目标和观察者互相耦合

### 状态机模式 <a href="/zh-cn/designPatterns/state" target="_blank" >示例代码</a>

> The state pattern is a behavioral software design pattern that allows an object to alter its behavior when its internal state changes.

- 把状态封装在调用对象之中，通过修改对象状态改变方法的行为

### 策略模式 <a href="/zh-cn/designPatterns/strategy" target="_blank" >示例代码</a>

> the strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime.

### 模板方法 <a href="/zh-cn/designPatterns/template" target="_blank" >示例代码</a>

> 模板方法是一个定义在父类别的方法，在模板方法中会呼叫多个定义在父类别的其他方法，而这些方法有可能只是抽象方法并没有实作，模板方法仅决定这些抽象方法的执行顺序，这些抽象方法的实作由子类别负责，并且子类别不允许覆写模板方法。

### 访问者模式 <a href="/zh-cn/designPatterns/visitor" target="_blank" >示例代码</a>

> 首先我们拥有一个由许多对象构成的对象结构，这些对象的类都拥有一个accept方法用来接受访问者对象；访问者是一个接口，它拥有一个visit方法，这个方法对访问到的对象结构中不同类型的元素作出不同的反应；在对象结构的一次访问过程中，我们遍历整个对象结构，对每一个元素都实施accept方法，在每一个元素的accept方法中回调访问者的visit方法，从而使访问者得以处理对象结构的每一个元素。

- 访问者不需要知道被访问者的结构，由被访问者决定遍历子组件的方式

## 动态语言的设计模式

> 23 种设计模式中的 16 种已经内置在语言之中，或者不复存在

- 动态语言无需想方设法绕开 class 的限制

## 参考资料

本文或多或少引用了以下资料的代码和描述，感兴趣的读者可自行阅读

1. [维基百科](https://zh.wikipedia.org/wiki/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%EF%BC%9A%E5%8F%AF%E5%A4%8D%E7%94%A8%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%BD%AF%E4%BB%B6%E7%9A%84%E5%9F%BA%E7%A1%80)：权威描述
2. [Typescript演练场](https://www.typescriptlang.org/zh/play)：在线的TypeScript编译执行环境
3. [桥接模式](https://www.liaoxuefeng.com/wiki/1252599548343744/1281319266943009)：廖雪峰老师关于桥接的描述
4. [深入理解设计模式](https://refactoringguru.cn/)：图文并茂
5. 极客时间《设计模式之美》：代码例子比较贴合实际应用场景，收费
