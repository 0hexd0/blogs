``` typescript
// 桥接模式例子
namespace Bridge {
  /** "Implementor" */
  interface IDrawingAPI {
    DrawCircle(x: number, y: number, radius: number): void
  }

  /** "ConcreteImplementor" 1/2 */
  class DrawingAPI1 implements IDrawingAPI {
    DrawCircle(x: number, y: number, radius: number) {
      console.log("API1.circle at {0}:{1} radius {2}", x, y, radius)
    }
  }

  /** "ConcreteImplementor" 2/2 */
  class DrawingAPI2 implements IDrawingAPI {
    DrawCircle(x: number, y: number, radius: number) {
      console.log("API2.circle at {0}:{1} radius {2}", x, y, radius)
    }
  }

  /** "Abstraction" */
  interface IShape {
    Draw(): void // low-level (i.e. Implementation-specific)
    ResizeByPercentage(pct: number): void // high-level (i.e. Abstraction-specific)
  }

  /** "Refined Abstraction" */
  class CircleShape implements IShape {
    private x: number
    private y: number
    private radius: number
    private drawingAPI: IDrawingAPI
    constructor(x: number, y: number, radius: number, drawingAPI: IDrawingAPI) {
      this.x = x
      this.y = y
      this.radius = radius
      this.drawingAPI = drawingAPI
    }
    // low-level (i.e. Implementation-specific)
    public Draw() {
      this.drawingAPI.DrawCircle(this.x, this.y, this.radius)
    }
    // high-level (i.e. Abstraction-specific)
    public ResizeByPercentage(pct: number) {
      this.radius *= pct
    }
  }

  /** "Client" */
  class BridgePattern {
    static Main() {
      const shapes: IShape[] = []
      shapes[0] = new CircleShape(1, 2, 3, new DrawingAPI1())
      shapes[1] = new CircleShape(5, 7, 11, new DrawingAPI2())

      for (const shape of shapes) {
        shape.ResizeByPercentage(2.5)
        shape.Draw()
      }
    }
  }

  BridgePattern.Main()
}
```