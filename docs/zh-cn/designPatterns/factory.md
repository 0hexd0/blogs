``` typescript
// 工厂模式例子
namespace Factory {
  class Button {
    /* ...*/
  }
  class WinButton extends Button {
    /* ...*/
  }
  class MacButton extends Button {
    /* ...*/
  }

  // 工厂接口
  interface ButtonFactory {
    createButton(): Button;
  }

  class WinButtonFactory implements ButtonFactory {
    createButton() {
      return new WinButton();
    }
  }

  class MacButtonFactory implements ButtonFactory {
    createButton() {
      return new MacButton();
    }
  }
}

```