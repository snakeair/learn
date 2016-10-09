# ES6学习——Class

## 概述

在以往的方式中，JS依靠构造函数来定义和生成新对象。这种方式传统的面向对象语言有很大差异，所以，在ES6中，JS引入了类*class*。通过*class*关键字可以直接定义类：

```javascript
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

//ES5
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

上面的代码定义了一个“类”，里面有一个*constructor*的方法，这就是构造方法。而*this*关键字则代表实例对象。也就是说class声明的*Point*等于下方的函数*Point*。











