# jointjs

## 基本概念

### 单元(Cell)

### 元素(Element)

### 链接(Link) 

### 图示(Diagram)

### 模型(Model)

### 视图(View)

## 设计模式

1. MVC模式，操作Model而不是直接操作视图

![](../images/arch.png)

## 案例

### 限制元素在某矩形区域内移动

```html
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jointjs/2.1.0/joint.css" />
</head>

<body>
    <!-- content -->
    <div id="myholder"></div>

    <div>
        <button id="zoom-in">zoomIn</button>
        <button id="zoom-out">zoomOut</button>
    </div>

    <!-- dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jointjs/3.3.0/joint.js"></script>

    <!-- code -->
    <script type="text/javascript">
        var graph = new joint.dia.Graph;

        var paper = new joint.dia.Paper({
            el: $('#myholder'),
            width: 650,
            height: 200,
            gridSize: 1,
            model: graph,
            restrictTranslate: function (elementView) {
                return orbit
                    ? orbit.getBBox() // children movement is constrained by the parent area
                    : null; // parent movement is not restricted
            }
        });

        var orbit = V('<rect/>');

        orbit.attr({
            x: 0, y: 0, width: 100, height: 100,
            fill: 'transparent',
            stroke: 'blue'
        });

        V(paper.viewport).append(orbit);

        var rectangle = new joint.shapes.basic.Rect({
            position: {
                x: 10,
                y: 10
            },
            size: {
                width: 20,
                height: 20
            },
        });

        rectangle.addTo(graph);
        graph.addCell(rectangle);

        // Toolbar
        var zoomLevel = 1;

        document.getElementById('zoom-in').addEventListener('click', function () {
            console.log('paper', paper);
            zoomLevel = Math.min(3, zoomLevel + 0.2);
            var size = paper.getComputedSize();
            paper.translate(0, 0);
            paper.scale(zoomLevel, zoomLevel, size.width / 2, size.height / 2);
        });

        document.getElementById('zoom-out').addEventListener('click', function () {
            zoomLevel = Math.max(0.2, zoomLevel - 0.2);
            var size = paper.getComputedSize();
            paper.translate(0, 0);
            paper.scale(zoomLevel, zoomLevel, size.width / 2, size.height / 2);
        });
    </script>
</body>
</html>
```
