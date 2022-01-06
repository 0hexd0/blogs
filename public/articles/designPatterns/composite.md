``` typescript
// 组合模式示例

namespace Composite {
  /** "Component" */
  interface Graphic {
    //Prints the graphic.
    print(): void;
  }

  /** "Composite" */
  class CompositeGraphic implements Graphic {
    //Collection of child graphics.
    childGraphics: Array<Graphic> = [];

    //Adds the graphic to the composition.
    add(graphic: Graphic): void {
      this.childGraphics.push(graphic);
    }

    //Prints the graphic.
    print(): void {
      this.childGraphics.forEach((graphic) => {
        graphic.print(); // Delegation
      });
    }
  }

  /** "Leaf" */
  class Ellipse implements Graphic {
    private type: string;
    constructor(type: string) {
      this.type = type;
    }
    //Prints the graphic.
    print(): void {
      console.log("Ellipse " + this.type);
    }
  }

  /** Client */
  class CompositeDemo {
    static main() {
      //Initialize four ellipses
      const ellipse1 = new Ellipse("1");
      const ellipse2 = new Ellipse("2");
      const ellipse3 = new Ellipse("3");
      const ellipse4 = new Ellipse("4");

      //Creates two composites containing the ellipses
      const compositGraphic2 = new CompositeGraphic();
      compositGraphic2.add(ellipse1);
      compositGraphic2.add(ellipse2);
      compositGraphic2.add(ellipse3);

      const compositGraphic3 = new CompositeGraphic();
      compositGraphic3.add(ellipse4);

      //Create another graphics that contains two graphics
      const compositGraphic = new CompositeGraphic();
      compositGraphic.add(compositGraphic2);
      compositGraphic.add(compositGraphic3);

      //Prints the complete graphic (Four times the string "Ellipse").
      compositGraphic.print();
    }
  }

  CompositeDemo.main();
}
```