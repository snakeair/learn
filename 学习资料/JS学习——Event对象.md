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

*bubbles*返回的额是一个布尔值，表示当前事件是否会冒泡。这个属性是个只读属性，只有在创建的时候可以改变，并却，除非对其进行了声明，否则，Event构造函数生成的时候是不冒泡的。

```javascript
function goInput(e) {
  if (!e.bubbles) {
    passItOn(e);
  } else {
    doOutput(e);
  }
}
```

上面的代码表示判断函数是否冒泡，然后去选择所要执行的内容。

**eventphase**

*eventphase*返回一个整数值，代表事件目前所处的节点位置。

```javascript
var phase = event.eventphase
```

> 1. 0，事件目前没有发生。
> 2. 1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。该过程是从Window对象到Document节点，再到HTMLHtmlElement节点，直到目标节点的父节点为止。
> 3. 2，事件到达目标节点，即target属性指向的那个节点。
> 4. 3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。该过程是从父节点一直到Window对象。只有bubbles属性为true时，这个阶段才可能发生。

### cancelable  &&  defaultPrevented

这两个方法于事件的默认行为有关

**cancelable**

*cancelable*返回一个布尔值表示事件可否取消，这是一个只读属性，只有在创建的时候才可以改写，除非声明，否则Event在创建的时候是默认不可取消的。

```javascript
var bool = event.cancelable
```

如果要取消某个事件我们需要在这个函数上调用*preventDefault*，但是这回改变浏览器对某种事件部署的默认行为。

**defaultPrevented**

*defaultPreventes*返回一个布尔值，表示该事件是否可以调用*preventDefault*方法。

### currentTarget  && target

**currentTarget**

返回事件当前所在的节点，即正在执行的函数所绑定的节点，而*target*是事件触发的节点，所以，如果事件处于捕获或者冒泡阶段的话，这两个方法所返回的内容就是不一致的。

```javascript
function hide(e){
  console.log(this === e.currentTarget);  // true
  e.currentTarget.style.visibility = "hidden";
}

para.addEventListener('click', hide, false);

```

上面代码中，点击para节点，该节点会不可见。另外，在监听函数中，currentTarget属性实际上等同于this对象。

**target**

target属性返回触发事件的那个节点，即事件最初发生的节点。如果监听函数不在该节点触发，那么它与currentTarget属性返回的值是不一样的。

```javascript
function hide(e){
  console.log(this === e.target);  // 有可能不是true
  e.target.style.visibility = "hidden";
}

// HTML代码为
// <p id="para">Hello <em>World</em></p>
para.addEventListener('click', hide, false);
```

上面的代码中，如果点击的事*em*元素的话，`e.target`返回的就是em节点，这时候返回的是*false*，并却隐藏了em元素。

### type，detail，timeStamp，isTrusted

这些属性与事件对象的其他信息有关

**type**

返回一个字符串，表示事件类型，具体的值同*addEventListener*方法和*removeEventListener*方法的第一个参数一致，大小写不敏感。

**datail**

返回一个数字，表示事件的某种信息。与事件的类型有关，对于鼠标事件，例如鼠标在某个位置按下的次数返回值都是*2*。

**timeStamp**

返回一个时间戳表示事件触发的时间。

```javascript
var number = event.timeStamp;
```

**isTrusted**

返回一个布尔值，表示该事件可否信赖。`chrome`不支持该属性。

### preventDefault()

preventDefault方法取消浏览器对当前事件的默认行为，比如点击链接后，浏览器跳转到指定页面，或者按一下空格键，页面向下滚动一段距离。该方法生效的前提是，事件的cancelable属性为true，如果为false，则调用该方法没有任何效果。

### stopPropagation()

阻止事件继续在DOM上传播，防止触发定义在其他元素上的监视函数，但是不会阻止目标的新定义的监听函数。

可以理解为，它是禁止事件继续冒泡的。

### stoplmmediatePropation()

阻止其他监听函数被调用。如果一个元素上面绑定了多个监听函数的话，正常情况下他们会被依次触发，但是如果其中一个调用了*stoplmmediataPropation()*的话，那么其他的监听函数就不会被触发。

## 鼠标事件

### 事件类型

**（1）click事件**

`click`事件当用户在Element节点、document节点、window对象上，单击鼠标（或者按下回车键）时触发。

“鼠标单击”定义为，用户在同一个位置完成一次`mousedown`动作和`mouseup`动作。它们的触发顺序是：`mousedown`首先触发，`mouseup`接着触发，`click`最后触发。

下面是一个设置click事件监听函数的例子。

```javascript
div.addEventListener("click", function( event ) {
  // 显示在该节点，鼠标连续点击的次数
  event.target.innerHTML = "click count: " + event.detail;
}, false);
```

下面的代码是利用click事件进行CSRF攻击（Cross-site request forgery）的一个例子。

```javascript
<a href="http://www.harmless.com/" onclick="
  var f = document.createElement('form');
  f.style.display = 'none';
  this.parentNode.appendChild(f);
  f.method = 'POST';
  f.action = 'http://www.example.com/account/destroy';
  f.submit();
  return false;">伪装的链接</a>
```

**（2）dblclick事件**

`dblclick`事件当用户在`element`、`document`、`window`对象上，双击鼠标时触发。该事件会在`mousedown`、`mouseup`、`click`之后触发。

**（3）mouseup事件，mousedown事件**

mouseup事件在释放按下的鼠标键时触发。

mousedown事件在按下鼠标键时触发。

**（4）mousemove事件**

`mousemove`事件当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次代码。

**（5）mouseover事件，mouseenter事件**

`mouseover`事件和`mouseenter`事件，都是鼠标进入一个节点时触发。

两者的区别是，`mouseenter`事件只触发一次，而只要鼠标在节点内部移动，`mouseover`事件会在子节点上触发多次。

```javascript
// HTML代码为
// <ul id="test">
//   <li>item 1</li>
//   <li>item 2</li>
//   <li>item 3</li>
// </ul>

var test = document.getElementById('test');

// 进入test节点以后，该事件只会触发一次
// event.target 是 ul 节点
test.addEventListener('mouseenter', function (event) {
  event.target.style.color = 'purple';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);

// 进入test节点以后，只要在子Element节点上移动，该事件会触发多次
// event.target 是 li 节点
test.addEventListener('mouseover', function (event) {
  event.target.style.color = 'orange';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);
```

**（6）mouseout事件，mouseleave事件**

mouseout事件和mouseleave事件，都是鼠标离开一个节点时触发。

两者的区别是，mouseout事件会冒泡，mouseleave事件不会。子节点的mouseout事件会冒泡到父节点，进而触发父节点的mouseout事件。mouseleave事件就没有这种效果，所以离开子节点时，不会触发父节点的监听函数。

**（7）contextmenu**

`contextmenu`事件在一个节点上点击鼠标右键时触发，或者按下“上下文菜单”键时触发。

### MouseEvent对象

鼠标事件使用MouseEvent对象表示，它继承UIEvent对象和Event对象。浏览器提供一个MouseEvent构造函数，用于新建一个MouseEvent实例。

```javascript
event = new MouseEvent(typeArg, mouseEventInit);
```

`MouseEvent`构造函数第一个值是事件名称，可能是`click\mousedown\mouseleave\mouseout\mouseover`，而第二个参数则是一个初始化的对象，其可能是：

> 1. screenX，设置鼠标相对于屏幕的水平坐标（但不会移动鼠标），默认为0，等同于MouseEvent.screenX属性。
> 2. screenY，设置鼠标相对于屏幕的垂直坐标，默认为0，等同于MouseEvent.screenY属性。
> 3. clientX，设置鼠标相对于窗口的水平坐标，默认为0，等同于MouseEvent.clientX属性。
> 4. clientY，设置鼠标相对于窗口的垂直坐标，默认为0，等同于MouseEvent.clientY属性。
> 5. ctrlKey，设置是否按下ctrl键，默认为false，等同于MouseEvent.ctrlKey属性。
> 6. shiftKey，设置是否按下shift键，默认为false，等同于MouseEvent.shiftKey属性。
> 7. altKey，设置是否按下alt键，默认为false，等同于MouseEvent.altKey属性。
> 8. metaKey，设置是否按下meta键，默认为false，等同于MouseEvent.metaKey属性。
> 9. button，设置按下了哪一个鼠标按键，默认为0。-1表示没有按键，0表示按下主键（通常是左键），1表示按下辅助键（通常是中间的键），2表示按下次要键（通常是右键）。
> 10. buttons，设置按下了鼠标哪些键，是一个3个比特位的二进制值，默认为0。1表示按下主键（通常是左键），2表示按下次要键（通常是右键），4表示按下辅助键（通常是中间的键）。
> 11. relatedTarget，设置一个Element节点，在mouseenter和mouseover事件时，表示鼠标刚刚离开的那个Element节点，在mouseout和mouseleave事件时，表示鼠标正在进入的那个Element节点。默认为null，等同于MouseEvent.relatedTarget属性。

以下属性也是可配置的，都继承自UIEvent构造函数和Event构造函数。

> 1. bubbles，布尔值，设置事件是否冒泡，默认为false，等同于Event.bubbles属性。
> 2. cancelable，布尔值，设置事件是否可取消，默认为false，等同于Event.cancelable属性。
> 3. view，设置事件的视图，一般是window或document.defaultView，等同于Event.view属性。
> 4. detail，设置鼠标点击的次数，等同于Event.detail属性。

下面是一个例子。

```javascript
function simulateClick() {
  var event = new MouseEvent('click', {
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.getElementById('checkbox');
  cb.dispatchEvent(event);
}
```

上面代码生成一个鼠标点击事件，并触发该事件。

以下介绍MouseEvent实例的属性。

**altKey，ctrlKey，metaKey，shiftKey**

这三个属性都是返回一个*布尔值*表示是否按下了其项对应的按键。

**button **

返回一个数值表示按下的是鼠标的那个按键

> 1. -1：没有按下键。
> 2. 0：按下主键（通常是左键）。
> 3. 1：按下辅助键（通常是中键或者滚轮键）。
> 4. 2：按下次键（通常是右键）。

我们在使用的时候可以结合js中的方法*switch*来使用：

```javascript
// HTML代码为
// <button onmouseup="whichButton(event);">点击</button>

var whichButton = function (e) {
  switch (e.button) {
    case 0:
      console.log('Left button clicked.');
      break;
    case 1:
      console.log('Middle button clicked.');
      break;
    case 2:
      console.log('Right button clicked.');
      break;
    default:
      console.log('Unexpected code: ' + e.button);
  }
}
```

这样我们就可以根据不同的按键来做不同的处理。

**buttons**

表示同时按下多个按键：

> 1. 1：二进制为001，表示按下左键。
> 2. 2：二进制为010，表示按下右键。
> 3. 4：二进制为100，表示按下中键或滚轮键。

上面的表示在按下的按键所对应的二进制数字，举例：如果同时按下三个按键的话输出的则回事*111*。

下面我们介绍一下事件位置的属性和方法

**clienX && clientY**

这两个表示鼠标相对于浏览器窗口的位置，与页面的长度宽度无关

**movementX && movementY**

表示鼠标距离上一次*mousemove*之后所移动的位置。

如果计算横向移动的话相当于*currentEvent.movementX = currentEvent.screenX - previousEvent.screenX*。而纵向移动的距离则是*Y*。

**screenX && screenY**

表示鼠标相对于屏幕的位置。

**relatedTarget**

表示反悔次要相关节点，如果没有相关节点则返回null。

| 事件名称       | target属性 | relatedTarget属性 |
| ---------- | -------- | --------------- |
| focusin    | 接受焦点的节点  | 丧失焦点的节点         |
| focusout   | 丧失焦点的节点  | 接受焦点的节点         |
| mouseenter | 将要进入的节点  | 将要离开的节点         |
| mouseleave | 将要离开的节点  | 将要进入的节点         |
| mouseout   | 将要离开的节点  | 将要进入的节点         |
| mouseover  | 将要进入的节点  | 将要离开的节点         |
| dragenter  | 将要进入的节点  | 将要离开的节点         |
| dragexit   | 将要离开的节点  | 将要进入的节点         |

举个例子：

```javascript
// HTML代码为
// <div id="outer" style="height:50px;width:50px;border-width:1px solid black;">
//   <div id="inner" style="height:25px;width:25px;border:1px solid black;"></div>
// </div>

var inner = document.getElementById("inner");

inner.addEventListener("mouseover", function (){
  console.log('进入' + event.target.id + " 离开" + event.relatedTarget.id);
});
inner.addEventListener("mouseenter", function (){
  console.log('进入' + event.target.id + " 离开" + event.relatedTarget.id);
});
inner.addEventListener("mouseout", function (){
  console.log('离开' + event.target.id + " 进入" + event.relatedTarget.id);
});
inner.addEventListener("mouseleave", function (){
  console.log('离开' + event.target.id + " 进入" + event.relatedTarget.id);
});

// 鼠标从outer进入inner，输出
// 进入inner 离开outer
// 进入inner 离开outer

// 鼠标从inner进入outer，输出
// 离开inner 进入outer
// 离开inner 进入outer
```

**wheel事件**

这个是滚轮事件，也是现在为止唯一的一个滚轮事件，他除了上面已经介绍过的几个共有的属性外还有一下属性：

> 1. deltaX：返回一个数值，表示滚轮的水平滚动量。
> 2. deltaY：返回一个数值，表示滚轮的垂直滚动量。
> 3. deltaZ：返回一个数值，表示滚轮的Z轴滚动量。
> 4. deltaMode：返回一个数值，表示滚动的单位，适用于上面三个属性。0表示像素，1表示行，2表示页。

```javascript
var syntheticEvent = new WheelEvent("syntheticWheel", {"deltaX": 4, "deltaMode": 0});
```

上面的*WheelEvent*是 wheel中的一个构造函数，它可以就收两个参数，第一个是事件的名称，第二个参数是配置对象。

## 键盘事件

键盘事件主要指的是我们按下键盘是触发的事件主要有三种

> 1. `keydown`：按下键盘按键后触发
> 2. `keyup`：放松键盘按键后触发
> 3. `keypress`：按下飞*alt、shift、ctrl和 meta*按键触发

如果我们按下键盘之后不放松的话会重复触发*keydown->keypress*直到放松按键触发 keyup 事件为止。

键盘事件使用KeyboardEvent对象表示，该对象继承了UIEvent和MouseEvent对象。浏览器提供KeyboardEvent构造函数，用来新建键盘事件的实例。

```javascript
event = new KeyboardEvent(typeArg, KeyboardEventInit);
```

KeyboardEvent构造函数的第一个参数是一个字符串，表示事件类型，第二个参数是一个事件配置对象，可配置以下字段。

> 1. key，对应KeyboardEvent.key属性，默认为空字符串。
> 2. ctrlKey，对应KeyboardEvent.ctrlKey属性，默认为false。
> 3. shiftKey，对应KeyboardEvent.shiftKey属性，默认为false。
> 4. altKey，对应KeyboardEvent.altKey属性，默认为false。
> 5. metaKey，对应KeyboardEvent.metaKey属性，默认为false。
>
>

### key，charCode

key属性返回一个字符串，表示按下的键名。如果同时按下一个控制键和一个符号键，则返回符号键的键名。比如，按下Ctrl+a，则返回a。如果无法识别键名，则返回字符串Unidentified。

主要功能键的键名（不同的浏览器可能有差异）：Backspace，Tab，Enter，Shift，Control，Alt，CapsLock，CapsLock，Esc，Spacebar，PageUp，PageDown，End，Home，Left，Right，Up，Down，PrintScreen，Insert，Del，Win，F1～F12，NumLock，Scroll等。

charCode属性返回一个数值，表示keypress事件按键的Unicode值，keydown和keyup事件不提供这个属性。注意，该属性已经从标准移除，虽然浏览器还支持，但应该尽量不使用。

## 进度事件

所谓的进度事件就是浏览器在加载内容是触发的事件其中包括：XHTMLHttpRequest发出的 http 请求、link 请求、img、video、style 等需要外部夹在的事件。

> 1. abort事件：当进度事件被中止时触发。如果发生错误，导致进程中止，不会触发该事件。
> 2. error事件：由于错误导致资源无法加载时触发。
> 3. load事件：进度成功结束时触发。
> 4. loadstart事件：进度开始时触发。
> 5. loadend事件：进度停止时触发，发生顺序排在error事件\abort事件\load事件后面。
> 6. progress事件：当操作处于进度之中，由传输的数据块不断触发。
> 7. timeout事件：进度超过限时触发。

上面就是进度事件所包含的内容，在不同的阶段和状态下都有不同的事件弹出，所以我们可以根据浏览器所触发的事件来为我们的网站添加效果。例如：

```javascript
image.addEventListener('load', function(event) {
  image.classList.add('finished');
});

image.addEventListener('error', function(event) {
  image.style.display = 'none';
});
```

上面的代码表示监听 `img`加载如果加载成功了现实出来，而如果没有加载成功的话就隐藏掉。

但是有个问题是，一般情况下，我们的 JS 都是写在页面最下面的，一般这个时候页面已经加载完毕了，所以上面的代码是一般是没有办法触发的，这时候我们就需要在里面加上一点其他东西：

```javascript
function loaded (){
  //函数
}
if (image.complete) {
  loaded();
} else {
  image.addEventListener('load', loaded);
}
```

上面的代码中我们将 img 的加载判断做了一个*loaded*的函数，然后使用下面的*if*语句来触发。

进度事件使用ProgressEvent对象表示。ProgressEvent实例有以下属性。

> 1. lengthComputable：返回一个布尔值，表示当前进度是否具有可计算的长度。如果为false，就表示当前进度无法测量。
> 2. total：返回一个数值，表示当前进度的总长度。如果是通过HTTP下载某个资源，表示内容本身的长度，不含HTTP头部的长度。如果lengthComputable属性为false，则total属性就无法取得正确的值。
> 3. loaded：返回一个数值，表示当前进度已经完成的数量。该属性除以total属性，就可以得到目前进度的百分比。

## 触摸事件

触摸事件有三个对象组成：

> 1. Touch：表示触摸点，表示触摸的动作，里面有触摸的：形状、大小、压力、事件、位置、目标元素等等。
> 2. TouchList：表示触摸的点的数量
> 3. TouchEvent：表示触摸所触发的事件。

### Touch 对象

**(1)  identifier**表示 Touch 的一独一无二的标识符。

```javascript
var id = touchItem.identifier;
```

TouchList对象的identifiedTouch方法，可以根据这个属性，从一个集合里面取出对应的Touch对象。

**(2)  screenX，screenY，clientX，clientY，pageX，pageY**

screenX属性和screenY属性，分别表示触摸点相对于屏幕左上角的横坐标和纵坐标，与页面是否滚动无关。

clientX属性和clientY属性，分别表示触摸点相对于浏览器视口左上角的横坐标和纵坐标，与页面是否滚动无关。

pageX属性和pageY属性，分别表示触摸点相对于当前页面左上角的横坐标和纵坐标，包含了页面滚动带来的位移。

**（3）radiusX，radiusY，rotationAngle**

radiusX属性和radiusY属性，分别返回触摸点周围受到影响的椭圆范围的X轴和Y轴，单位为像素。

rotationAngle属性表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间。

上面这三个属性共同定义了用户与屏幕接触的区域，对于描述手指这一类非精确的触摸，很有帮助。指尖接触屏幕，触摸范围会形成一个椭圆，这三个属性就用来描述这个椭圆区域。

**（4）force**

force属性返回一个0到1之间的数值，表示触摸压力。0代表没有压力，1代表硬件所能识别的最大压力。

**（5）target**

target属性返回一个Element节点，代表触摸发生的那个节点。

### TouchList对象

TouchList对象是一个类似数组的对象，成员是与某个触摸事件相关的所有触摸点。比如，用户用三根手指触摸，产生的TouchList对象就有三个成员，每根手指对应一个Touch对象。

TouchList实例的length属性，返回TouchList对象的成员数量。

TouchList实例的identifiedTouch方法和item方法，分别使用id属性和索引值（从0开始）作为参数，取出指定的Touch对象。

### TouchEvent对象

TouchEvent对象继承Event对象和UIEvent对象，表示触摸引发的事件。除了被继承的属性以外，它还有一些自己的属性。

**（1）键盘相关属性**

以下属性都为只读属性，返回一个布尔值，表示触摸的同时，是否按下某个键。

- altKey 是否按下alt键
- ctrlKey 是否按下ctrl键
- metaKey 是否按下meta键
- shiftKey 是否按下shift键

**（2）changedTouches**

changedTouches属性返回一个TouchList对象，包含了由当前触摸事件引发的所有Touch对象（即相关的触摸点）。

对于touchstart事件，它代表被激活的触摸点；对于touchmove事件，代表发生变化的触摸点；对于touchend事件，代表消失的触摸点（即不再被触碰的点）。

```javascript
var touches = touchEvent.changedTouches;
```

**（3）targetTouches**

targetTouches属性返回一个TouchList对象，包含了触摸的目标Element节点内部，所有仍然处于活动状态的触摸点。

```javascript
var touches = touchEvent.targetTouches;
```

**（4）touches**

touches属性返回一个TouchList对象，包含了所有仍然处于活动状态的触摸点。

```javascript
var touches = touchEvent.touches;
```





### 触摸事件的种类

触摸引发的事件，有以下几类。可以通过TouchEvent.type属性，查看到底发生的是哪一种事件。

> - touchstart：用户接触触摸屏时触发，它的target属性返回发生触摸的Element节点。
> - touchend：用户不再接触触摸屏时（或者移出屏幕边缘时）触发，它的target属性与touchstart事件的target属性是一致的，它的changedTouches属性返回一个TouchList对象，包含所有不再触摸的触摸点（Touch对象）。
> - touchmove：用户移动触摸点时触发，它的target属性与touchstart事件的target属性一致。如果触摸的半径、角度、力度发生变化，也会触发该事件。
> - touchcancel：触摸点取消时触发，比如在触摸区域跳出一个情态窗口（modal window）、触摸点离开了文档区域（进入浏览器菜单栏区域）、用户放置更多的触摸点（自动取消早先的触摸点）。

下面是一个例子：

```javascript
var el = document.getElementsByTagName("canvas")[0];
el.addEventListener("touchstart", handleStart, false);
el.addEventListener("touchmove", handleMove, false);

function handleStart(evt) {
  // 阻止浏览器继续处理触摸事件，
  // 也阻止发出鼠标事件
  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    console.log(touches[i].pageX, touches[i].pageY);
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    var id = touches[i].identifier;
    var touch = touches.identifiedTouch(id);
    console.log(touch.pageX, touch.pageY);
  }
}
```



## 文档事件

### beforeunload事件，unload事件，load事件，error事件，pageshow事件，pagehide事件

以下事件与网页的加载与卸载相关。

**（1）beforeunload事件**

`beforeunload`事件在窗口将要关闭，或者网页（即`document`对象）将要卸载时触发。它可以用来防止用户不小心关闭网页。

根据标准，只要在该事件的回调函数中，调用了`event.preventDefault()`，或者`event.returnValue`属性的值是一个非空的值，就会自动跳出一个确认框，让用户确认是否关闭网页。如果用户点击“取消”按钮，网页就不会关闭。`event.returnValue`属性的值，会显示在确认对话框之中。

```javascript
window.addEventListener('beforeunload', function( event ) {
  event.returnValue = '你确认要离开吗？';
});

window.addEventListener('beforeunload', function( event ) {
  event.preventDefault();
});
```

但是，浏览器的行为很不一致，Chrome就不遵守`event.preventDefault()`，还是会关闭窗口，而IE需要显式返回一个非空的字符串。而且，大多数浏览器在对话框中不显示指定文本，只显示默认文本。因此，可以采用下面的写法，取得最大的兼容性。

```javascript
window.addEventListener('beforeunload', function (e) {
  var confirmationMessage = '确认关闭窗口？';

  e.returnValue = confirmationMessage;
  return confirmationMessage;
});
```

需要特别注意的是，许多手机浏览器默认忽视这个事件，而桌面浏览器也可以这样设置，所以这个事件有可能根本不生效。所以，不能依赖它来阻止用户关闭窗口。

**（2）unload事件**

unload事件在窗口关闭或者document对象将要卸载时触发，发生在window、body、frameset等对象上面。它的触发顺序排在beforeunload、pagehide事件后面。unload事件只在页面没有被浏览器缓存时才会触发，换言之，如果通过按下“前进/后退”导致页面卸载，并不会触发unload事件。

当unload事件发生时，document对象处于一个特殊状态。所有资源依然存在，但是对用户来说都不可见，UI互动（window.open、alert、confirm方法等）全部无效。这时即使抛出错误，也不能停止文档的卸载。

```javascript
window.addEventListener('unload', function(event) {
  console.log('文档将要卸载');
});
```

如果在window对象上定义了该事件，网页就不会被浏览器缓存。

**（3）load事件，error事件**

load事件在页面加载成功时触发，error事件在页面加载失败时触发。注意，页面从浏览器缓存加载，并不会触发load事件。

这两个事件实际上属于进度事件，不仅发生在document对象，还发生在各种外部资源上面。浏览网页就是一个加载各种资源的过程，图像（image）、样式表（style sheet）、脚本（script）、视频（video）、音频（audio）、Ajax请求（XMLHttpRequest）等等。这些资源和document对象、window对象、XMLHttpRequestUpload对象，都会触发load事件和error事件。

**（4）pageshow事件，pagehide事件**

默认情况下，浏览器会在当前会话（session）缓存页面，当用户点击“前进/后退”按钮时，浏览器就会从缓存中加载页面。

pageshow事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。

第一次加载时，它的触发顺序排在load事件后面。从缓存加载时，load事件不会触发，因为网页在缓存中的样子通常是load事件的监听函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的JavaScript脚本（比如DOMContentLoaded事件的监听函数）也不会执行。

```javascript
window.addEventListener('pageshow', function(event) {
  console.log('pageshow: ', event);
});
```

pageshow事件有一个persisted属性，返回一个布尔值。页面第一次加载时，这个属性是false；当页面从缓存加载时，这个属性是true。

```javascript
window.addEventListener('pageshow', function(event){
  if (event.persisted) {
    // ...
  }
});
```

pagehide事件与pageshow事件类似，当用户通过“前进/后退”按钮，离开当前页面时触发。它与unload事件的区别在于，如果在window对象上定义unload事件的监听函数之后，页面不会保存在缓存中，而使用pagehide事件，页面会保存在缓存中。

pagehide事件的event对象有一个persisted属性，将这个属性设为true，就表示页面要保存在缓存中；设为false，表示网页不保存在缓存中，这时如果设置了unload事件的监听函数，该函数将在pagehide事件后立即运行。

如果页面包含frame或iframe元素，则frame页面的pageshow事件和pagehide事件，都会在主页面之前触发。

### DOMContentLoaded事件，readystatechange事件

以下事件与文档状态相关。

**（1）DOMContentLoaded事件**

当HTML文档下载并解析完成以后，就会在document对象上触发DOMContentLoaded事件。这时，仅仅完成了HTML文档的解析（整张页面的DOM生成），所有外部资源（样式表、脚本、iframe等等）可能还没有下载结束。也就是说，这个事件比load事件，发生时间早得多。

```
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM生成");
});
```

注意，网页的JavaScript脚本是同步执行的，所以定义DOMContentLoaded事件的监听函数，应该放在所有脚本的最前面。否则脚本一旦发生堵塞，将推迟触发DOMContentLoaded事件。

**（2）readystatechange事件**

readystatechange事件发生在Document对象和XMLHttpRequest对象，当它们的readyState属性发生变化时触发。

```javascript
document.onreadystatechange = function () {
  if (document.readyState == "interactive") {
    // ...
  }
}
```

IE8不支持DOMContentLoaded事件，但是支持这个事件。因此，可以使用readystatechange事件，在低版本的IE中代替DOMContentLoaded事件。

### scroll事件，resize事件

以下事件与窗口行为有关。

**（1）scroll事件**

`scroll`事件在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。

```javascript
window.addEventListener('scroll', callback);
```

由于该事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。推荐的做法是使用`requestAnimationFrame`或`setTimeout`控制该事件的触发频率，然后可以结合`customEvent`抛出一个新事件。

```javascript
(function() {
  var throttle = function(type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  // 将scroll事件重定义为optimizedScroll事件
  throttle('scroll', 'optimizedScroll');
})();

window.addEventListener('optimizedScroll', function() {
  console.log("Resource conscious scroll callback!");
});
```

上面代码中，`throttle`函数用于控制事件触发频率，`requestAnimationFrame`方法保证每次页面重绘（每秒60次），只会触发一次`scroll`事件的监听函数。也就是说，上面方法将`scroll`事件的触发频率，限制在每秒60次。

改用`setTimeout`方法，可以放置更大的时间间隔。

```javascript
(function() {
  window.addEventListener('scroll', scrollThrottler, false);

  var scrollTimeout;
  function scrollThrottler() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
        actualScrollHandler();
      }, 66);
    }
  }

  function actualScrollHandler() {
    // ...
  }
}());
```

上面代码中，`setTimeout`指定`scroll`事件的监听函数，每66毫秒触发一次（每秒15次）。

下面是一个更一般的`throttle`函数的写法。

```javascript
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('scroll', throttle(callback, 1000));
```

上面的代码将`scroll`事件的触发频率，限制在一秒一次。

`lodash`函数库提供了现成的`throttle`函数，可以直接引用。

```javascript
window.addEventListener('scroll', _.throttle(callback, 1000));
```

**（2）resize事件**

resize事件在改变浏览器窗口大小时触发，发生在window、body、frameset对象上面。

```javascript
var resizeMethod = function(){
  if (document.body.clientWidth < 768) {
    console.log('移动设备');
  }
};

window.addEventListener("resize", resizeMethod, true);
```

该事件也会连续地大量触发，所以最好像上面的scroll事件一样，通过throttle函数控制事件触发频率。

### hashchange事件，popstate事件

以下事件与文档的URL变化相关。

**（1）hashchange事件**

hashchange事件在URL的hash部分（即#号后面的部分，包括#号）发生变化时触发。如果老式浏览器不支持该属性，可以通过定期检查location.hash属性，模拟该事件，下面就是代码。

```javascript
(function(window) {
  if ( "onhashchange" in window.document.body ) { return; }

  var location = window.location;
  var oldURL = location.href;
  var oldHash = location.hash;

  // 每隔100毫秒检查一下URL的hash
  setInterval(function() {
    var newURL = location.href;
    var newHash = location.hash;

    if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });

      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);

})(window);
```

hashchange事件对象除了继承Event对象，还有oldURL属性和newURL属性，分别表示变化前后的URL。

**（2）popstate事件**

popstate事件在浏览器的history对象的当前记录发生显式切换时触发。注意，调用history.pushState()或history.replaceState()，并不会触发popstate事件。该事件只在用户在history记录之间显式切换时触发，比如鼠标点击“后退/前进”按钮，或者在脚本中调用history.back()、history.forward()、history.go()时触发。

该事件对象有一个state属性，保存history.pushState方法和history.replaceState方法为当前记录添加的state对象。

```javascript
window.onpopstate = function(event) {
  console.log("state: " + event.state);
};
history.pushState({page: 1}, "title 1", "?page=1");
history.pushState({page: 2}, "title 2", "?page=2");
history.replaceState({page: 3}, "title 3", "?page=3");
history.back(); // state: {"page":1}
history.back(); // state: null
history.go(2);  // state: {"page":3}
```

上面代码中，pushState方法向history添加了两条记录，然后replaceState方法替换掉当前记录。因此，连续两次back方法，会让当前条目退回到原始网址，它没有附带state对象，所以事件的state属性为null，然后前进两条记录，又回到replaceState方法添加的记录。

浏览器对于页面首次加载，是否触发popstate事件，处理不一样，Firefox不触发该事件。

### cut事件，copy事件，paste事件

以下三个事件属于文本操作触发的事件。

- cut事件：在将选中的内容从文档中移除，加入剪贴板后触发。
- copy事件：在选中的内容加入剪贴板后触发。
- paste事件：在剪贴板内容被粘贴到文档后触发。

这三个事件都有一个clipboardData只读属性。该属性存放剪贴的数据，是一个DataTransfer对象，具体的API接口和操作方法，请参见《触摸事件》的DataTransfer对象章节。

### 焦点事件

焦点事件发生在Element节点和document对象上面，与获得或失去焦点相关。它主要包括以下四个事件。

- focus事件：Element节点获得焦点后触发，该事件不会冒泡。
- blur事件：Element节点失去焦点后触发，该事件不会冒泡。
- focusin事件：Element节点将要获得焦点时触发，发生在focus事件之前。该事件会冒泡。Firefox不支持该事件。
- focusout事件：Element节点将要失去焦点时触发，发生在blur事件之前。该事件会冒泡。Firefox不支持该事件。

这四个事件的事件对象，带有target属性（返回事件的目标节点）和relatedTarget属性（返回一个Element节点）。对于focusin事件，relatedTarget属性表示失去焦点的节点；对于focusout事件，表示将要接受焦点的节点；对于focus和blur事件，该属性返回null。

由于focus和blur事件不会冒泡，只能在捕获阶段触发，所以addEventListener方法的第三个参数需要设为true。

```javascript
form.addEventListener("focus", function( event ) {
  event.target.style.background = "pink";
}, true);
form.addEventListener("blur", function( event ) {
  event.target.style.background = "";
}, true);
```

上面代码设置表单的文本输入框，在接受焦点时设置背景色，在失去焦点时去除背景色。

浏览器提供一个FocusEvent构造函数，可以用它生成焦点事件的实例。

```javascript
var focusEvent = new FocusEvent(typeArg, focusEventInit);
```

上面代码中，FocusEvent构造函数的第一个参数为事件类型，第二个参数是可选的配置对象，用来配置FocusEvent对象。

## 自定义事件和事件模拟

除了浏览器预定义的那些事件，用户还可以自定义事件，然后手动触发。

```javascript
// 新建事件实例
var event = new Event('build');

// 添加监听函数
elem.addEventListener('build', function (e) { ... }, false);

// 触发事件
elem.dispatchEvent(event);
```

上面代码触发了自定义事件，该事件会层层向上冒泡。在冒泡过程中，如果有一个元素定义了该事件的监听函数，该监听函数就会触发。

由于IE不支持这个API，如果在IE中自定义事件，需要使用后文的“老式方法”。

### CustomEvent()

Event构造函数只能指定事件名，不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，需要使用CustomEvent构造函数生成自定义的事件对象。

```javascript
var event = new CustomEvent('build', { 'detail': 'hello' });
function eventHandler(e) {
  console.log(e.detail);
}
```

上面代码中，CustomEvent构造函数的第一个参数是事件名称，第二个参数是一个对象，该对象的detail属性会绑定在事件对象之上。

下面是另一个例子。

```javascript
var myEvent = new CustomEvent("myevent", {
  detail: {
    foo: "bar"
  },
  bubbles: true,
  cancelable: false
});

el.addEventListener('myevent', function(event) {
  console.log('Hello ' + event.detail.foo);
});

el.dispatchEvent(myEvent);
```

IE不支持这个方法，可以用下面的垫片函数模拟。

```javascript
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();
```

### 事件的模拟

有时，需要在脚本中模拟触发某种类型的事件，这时就必须使用这种事件的构造函数。

下面是一个通过MouseEvent构造函数，模拟触发click鼠标事件的例子。

```javascript
function simulateClick() {
  var event = new MouseEvent('click', {
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.getElementById('checkbox');
  cb.dispatchEvent(event);
}
```

### 自定义事件的老式写法

老式浏览器不一定支持各种类型事件的构造函数。因此，有时为了兼容，会用到一些非标准的方法。这些方法未来会被逐步淘汰，但是目前浏览器还广泛支持。除非是为了兼容老式浏览器，尽量不要使用。

**（1）document.createEvent()**

document.createEvent方法用来新建指定类型的事件。它所生成的Event实例，可以传入dispatchEvent方法。

```javascript
// 新建Event实例
var event = document.createEvent('Event');

// 事件的初始化
event.initEvent('build', true, true);

// 加上监听函数
document.addEventListener('build', doSomething, false);

// 触发事件
document.dispatchEvent(event);
```

createEvent方法接受一个字符串作为参数，可能的值参见下表“数据类型”一栏。使用了某一种“事件类型”，就必须使用对应的事件初始化方法。

| 事件类型           | 事件初始化方法                 |
| -------------- | ----------------------- |
| UIEvents       | event.initUIEvent       |
| MouseEvents    | event.initMouseEvent    |
| MutationEvents | event.initMutationEvent |
| HTMLEvents     | event.initEvent         |
| Event          | event.initEvent         |
| CustomEvent    | event.initCustomEvent   |
| KeyboardEvent  | event.initKeyEvent      |

**（2）event.initEvent()**

事件对象的initEvent方法，用来初始化事件对象，还能向事件对象添加属性。该方法的参数必须是一个使用`Document.createEvent()`生成的Event实例，而且必须在dispatchEvent方法之前调用。

```javascript
var event = document.createEvent('Event');
event.initEvent('my-custom-event', true, true, {foo:'bar'});
someElement.dispatchEvent(event);
```

initEvent方法可以接受四个参数。

- type：事件名称，格式为字符串。
- bubbles：事件是否应该冒泡，格式为布尔值。可以使用event.bubbles属性读取它的值。
- cancelable：事件是否能被取消，格式为布尔值。可以使用event.cancelable属性读取它的值。
- option：为事件对象指定额外的属性。

### 事件模拟的老式写法

事件模拟的非标准做法是，对document.createEvent方法生成的事件对象，使用对应的事件初始化方法进行初始化。比如，click事件对象属于MouseEvent对象，也属于UIEvent对象，因此要用initMouseEvent方法或initUIEvent方法进行初始化。

**（1）event.initMouseEvent()**

initMouseEvent方法用来初始化Document.createEvent方法新建的鼠标事件。该方法必须在事件新建（document.createEvent方法）之后、触发（dispatchEvent方法）之前调用。

initMouseEvent方法有很长的参数。

```javascript
event.initMouseEvent(type, canBubble, cancelable, view,
  detail, screenX, screenY, clientX, clientY,
  ctrlKey, altKey, shiftKey, metaKey,
  button, relatedTarget
);
```

上面这些参数的含义，参见MouseEvent构造函数的部分。

模仿并触发click事件的写法如下。

```javascript
var simulateDivClick = document.createEvent('MouseEvents');

simulateDivClick.initMouseEvent('click',true,true,
  document.defaultView,0,0,0,0,0,false,
  false,false,0,null,null
);

divElement.dispatchEvent(simulateDivClick);
```

**（2）UIEvent.initUIEvent()**

`UIEvent.initUIEvent()`用来初始化一个UI事件。该方法必须在事件新建（document.createEvent方法）之后、触发（dispatchEvent方法）之前调用。

```javascript
event.initUIEvent(type, canBubble, cancelable, view, detail)
```

该方法的参数含义，可以参见MouseEvent构造函数的部分。其中，detail参数是一个数值，含义与事件类型有关，对于鼠标事件，这个值表示鼠标按键在某个位置按下的次数。

```javascript
var e = document.createEvent("UIEvent");
e.initUIEvent("click", true, true, window, 1);
```



## end

