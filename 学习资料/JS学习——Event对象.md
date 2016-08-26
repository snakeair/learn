# JS学习——Event对象

事件是一种异步编程的实现方式，本质上是程序各个组成部分之间的通信。DOM支持大量的事件，本节介绍DOM的事件编程。

## EventTarget接口

DOM时间的操作，都定义在*EventTarget*接口，`Element`节点、`document`节点和`window`对象，都部署了这个接口。此外，`XMLHttpRequest`、`AudioNode`、`AudioContext`等浏览器内置对象，也部署了这个接口。

该接口就是三个方法，`addEventListener`和`removeEventListener`用于绑定和移除监听函数，`dispatchEvent`用于触发事件。

### addEventListener

用于当前对象或节点，定义一个特定事件的监听函数。

```javascript

// 使用格式
target.addEventListener(type, listener[, useCapture]);

// 实例
window.addEventListener('load', function () {...}, false);
request.addEventListener('readystatechange', function () {...}, false);
```

*addEventListener*可以接受三个参数：

> 1. `type`：事件名称，大小写不敏感。
> 2. `listener`：监听函数。事件发生时，会调用该监听函数。
> 3. `useCapture`：布尔值，表示监听函数是否在捕获阶段（capture）触发（参见后文《事件的传播》部分），默认为`false`（监听函数只在冒泡阶段被触发）。老式浏览器规定该参数必写，较新版本的浏览器允许该参数可选。为了保持兼容，建议总是写上该参数。

```javascript
function hello() {
  console.log('Hello world');
}

var button = document.getElementById('btn');
button.addEventListener('click', hello, false);
```

*addEventListener*方法为*buttom*元素节点绑定*click*时间的监听函数*hello*，该函数只在冒泡阶段触发。另外，虽然方法可以给一个对象添加多个监听时间，但是每个时间都不能一样，如果为各一时间多次添加同一函数的话，该函数只能执行一次，多余的添加将自动被移除。

如果希望向监听函数传递参数，可以用匿名函数包装一下监听函数。

```javascript
function print(x) {
  console.log(x);
}

var el = document.getElementById('div1');
el.addEventListener('click', function () { print('Hello'); }, false);
```

### removeEventListener()

`removeEventListener`方法用来移除`addEventListener`方法添加的事件监听函数。

```javascript
div.addEventListener('click', listener, false);
div.removeEventListener('click', listener, false);
```

`removeEventListener`方法的参数，与`addEventListener`方法完全一致。它的第一个参数“事件类型”，也是大小写不敏感。

注意，`removeEventListener`方法移除的监听函数，必须与对应的`addEventListener`方法的参数完全一致，而且必须在同一个元素节点，否则无效。

### dispatchEvent()

在当前节点上触发指定时间，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了*Event.prenentDefault()*，返回值为布尔值。

```javascript
para.addEventListener('click', hello, false);
var event = new Event('click');
para.dispatchEvent(event);
```

如果*dispatchEvent()*方法的参数为空，或者不是一个有效的时间对象，则报错。

一下代码根据*dispatchEvent()*方法的返回值，判断事件是否被取消。

```javascript
var canceled = !cb.dispatchEvent(event);
  if (canceled) {
    console.log('事件取消');
  } else {
    console.log('事件未取消');
  }
}
```

## 监听函数

监听函数（listener）是事件发生时，程序所要执行的函数。它是事件驱动编程模式的主要编程方式。

### HTML标签的on-属性

即直接在HTML中定义事件监听。例如：*onload*、*onclick*等。但是要注意，`on-`的属性值是执行代码而不是“监听函数”。

```html
<body onload="doSomething()">
<div onclick="console.log('触发事件')">
```

注意，`on-`使用的是*执行代码*而不是*监听函数*，所以在使用函数的时候咬嘴函数名后面加上括号。

### Element节点的事件属性

Element节点有事件属性，可以定义监听函数。

```javascript
window.onload = doSomething;

div.onclick = function(event){
  console.log('触发事件');
};
```

使用这个方法指定的监听函数，只会在冒泡阶段触发。

### addEventListener方法、

通过`Element`节点、`document`节点、`window`对象的`addEventListener`方法，也可以定义事件的监听函数。

```javascript
window.addEventListener('load', doSomething, false);
```

> 1. 可以针对同一个事件，添加多个监听函数。
> 2. 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发回监听函数。
> 3. 除了DOM节点，还可以部署在window、XMLHttpRequest等对象上面，等于统一了整个JavaScript的监听函数接口。

上面是addEventListener是推荐的指定监听函数的方法。

#### this对象的指向

在实际的编程过程总，监听函数内部的*this*对象，尝尝需要指向触发事件的那个*Element*节点。

*addEventListener*方法指定的监听函数，内部的*this*对象总是指向触发时间的节点。

```javascript
// HTML代码为
// <p id="para">Hello</p>

var id = 'doc';
var para = document.getElementById('para');

function hello(){
  console.log(this.id);
}

para.addEventListener('click', hello, false);
```

指向以上代码的时候，点击`p`会输出*pare*。因为监听函数被“拷贝”成了节点的一个属性。使用下面的写法会看的更清楚。

```javascript
para.onclick = hello;
```

但是要注意的是如果监听函数的Element节点的*on-*属性上面，*this*不会指向触发事件的元素节点。因为如果使用*on-*的话执行函数就相当于在全局作用域执行的，如果要解决我们就需要将执行函数直接写在on-上面。但是`不推荐`。

总结一下，以下写法的this对象都指向Element节点。

```javascript
// JavaScript代码
element.onclick = print
element.addEventListener('click', print, false)
element.onclick = function () {console.log(this.id);}

// HTML代码
<element onclick="console.log(this.id)">
```

以下写法的this对象，都指向全局对象。

```javascript
// JavaScript代码
element.onclick = function (){ doSomething() };
element.setAttribute('onclick', 'doSomething()');

// HTML代码
<element onclick="doSomething()">
```

## 事件的传播

### 传播的三个阶段

当一个事件发生以后，它会在不同的DOM节点之间传播（propagation）。这种传播分成三个阶段：

> 1. **第一阶段**：从window对象传导到目标节点，称为“捕获阶段”（capture phase）。
> 2. **第二阶段**：在目标节点上触发，称为“目标阶段”（target phase）。
> 3. **第三阶段**：从目标节点传导回window对象，称为“冒泡阶段”（bubbling phase）。

这种传播方式有一个问题就是，一个事件可能会在多个节点上触发：触发的节点以及节点的父节点，这种情况被我们称为*冒泡*。

### 事件的代理


由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

```javascript
var ul = document.querySelector('ul');

ul.addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```

上面就是一个例子，我们把应该绑定在*li*上的`click`事件绑定在了*ul*上面。

而如果我们不需要事件传递上去的话，我们可以使用`stopPropagation`。使用这个方法，事件就会在其触发的节点停止，不会*冒泡*。

## Event对象

事件发生以后，会生成一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了`Event.prototype`对象。

Event对象本身就是一个构造函数，可以用来生成新的实例。

```javascript
event = new Event(typeArg, eventInit);
```

Event构造函数接受两个参数。第一个参数是字符串，表示事件的名称；第二个参数是一个对象，表示事件对象的配置。该参数可以有以下两个属性。

> 1. bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡。
> 2. cancelable：布尔值，可选，默认为false，表示事件是否可以被取消。

```javascript
var ev = new Event("look", {"bubbles":true, "cancelable":false});
document.dispatchEvent(ev);
```

上面代码新建一个look事件实例，然后使用dispatchEvent方法触发该事件。

IE8及以下版本，事件对象不作为参数传递，而是通过window对象的event属性读取，并且事件对象的target属性叫做srcElement属性。所以，以前获取事件信息，往往要写成下面这样。

```javascript
function myEventHandler(event) {
  var actualEvent = event || window.event;
  var actualTarget = actualEvent.target || actualEvent.srcElement;
  // ...
}
```

上面的代码只是为了说明以前的程序为什么这样写，在新代码中，这样的写法不应该再用了。

以下介绍Event实例的属性和方法。

### bubbles , eventphase

这两个属性与事件的阶段有关

**bubbles**

*bubbles*返回的额是一个布尔值，表示当前事件是否会冒泡。









