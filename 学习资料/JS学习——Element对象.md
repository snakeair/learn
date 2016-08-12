# JS学习——Element对象

`Element`对象对应网页的HTML标签元素。每一个HTML标签元素，在DOM树上都会转化成一个`Element`节点对象（以下简称元素节点）。

元素节点的`nodeType`属性都是1，但是不同HTML标签生成的元素节点是不一样的。JavaScript内部使用不同的构造函数，生成不同的Element节点，比如`[`](undefined)标签的节点对象由`HTMLAnchorElement()`构造函数生成，``标签的节点对象由`HTMLButtonElement()`构造函数生成。因此，元素节点不是一种对象，而是一组对象。

## 属性

### 返回元素节点性质的属性

#### attributes

返回一个类似数组的对象，成员是当前元素节点的所有属性节点。返回值是动态的。

```html
<p id="para">Hello World</p>
<script>
var para = document.getElementById('para');
var attr = para.attributes[0];

attr.name // id
attr.value // para
</script>
```

```javascript
var para = document.getElementsByTagName("p")[0];

if (para.hasAttributes()) {
  var attrs = para.attributes;
  var output = "";
  for(var i = attrs.length - 1; i >= 0; i--) {
    output += attrs[i].name + "->" + attrs[i].value;
  }
  result.value = output;
} else {
  result.value = "No attributes to show";
}
```

#### id属性

id属性返回指定元素的id标识。该属性可读写。

#### tagName属性

tagName属性返回指定元素的大写的标签名，与nodeName属性的值相等。

```javascript
// 假定HTML代码如下
// <span id="span">Hello</span>
var span = document.getElementById("span");
span.tagName // "SPAN"
```

### 返回元素节点的HTML内容

#### innerHTML

返回钙元素包含的HTML代码，该属性是可读写的，常用来设置某个节点的内容。

如果属性设置为空值，则表示删除其包含的所有节点。

另，*innerHTML*会自行转义字符。

#### outerHTML

返回一个字符串，内容为指定元素和其所包含的所有子元素的代码。其也是可读写的。对其赋值表示替换掉当前元素。

```javascript
// <div id="container"><div id="d">Hello</div></div>

container = document.getElementById("container");
d = document.getElementById("d");
container.firstChild.nodeName // "DIV"
d.nodeName // "DIV"

d.outerHTML = "<p>Hello</p>";
container.firstChild.nodeName // "P"
d.nodeName // "DIV"
```

### 与元素节点的子元素相关的属性

#### children

返回一个类似数组的动态对象，包括当前元素节点的所有子元素。如果没有则为*0*。

#### childElementCount

childElementCount属性返回当前元素节点包含的子元素节点的个数。

#### firstElementChild

firstElementChild属性返回第一个子元素，如果没有，则返回null。

#### lastElementChild

lastElementChild属性返回最后一个子元素，如果没有，则返回null。

### 与元素节点的同级元素相关

#### nextElementSibling

返回指定元素的最后一个统计元素，没有返回null

#### previousElementSibling

返回指定元素的前一个同级元素，如果没有则返回null。

### className && classList

*className*用来读取和设置当前元素的class属性，它的值是一个字符串，*class*之间使用空格分隔。

*classLis*返回一个类似数组的对象，当前元素的每个class都是一个成员。

```html
<div class="one two three" id="myDiv"></div>
<script>
document.getElementById('myDiv').className
// "one two three"

document.getElementById('myDiv').classList
// {
//   0: "one"
//   1: "two"
//   2: "three"
//   length: 3
// }
</script>
```

*classList*有下列方法：

> 1. add()：增加一个class。
> 2. remove()：移除一个class。
> 3. contains()：检查当前元素是否包含某个class。
> 4. toggle()：将某个class移入或移出当前元素。接受两个参数，第二个位布尔值，*true*的话添加属性，*false*移除属性。
> 5. item()：返回指定索引位置的class。
> 6. toString()：将class的列表转为字符串。

### clientHeight，clientLeft，clientTop，clientWidth

**（1）clientHeight**

clientHeight属性返回元素节点的可见高度，包括padding、但不包括水平滚动条、边框和margin的高度，单位为像素。该属性可以计算得到，等于元素的CSS高度，加上CSS的padding高度，减去水平滚动条的高度（如果存在水平滚动条）。

如果一个元素是可以滚动的，则clientHeight只计算它的可见部分的高度。

**（2）clientLeft**

clientLeft属性等于元素节点左边框（border）的宽度，单位为像素，包括垂直滚动条的宽度，不包括左侧的margin和padding。但是，除非排版方向是从右到左，且发生元素宽度溢出，否则是不可能存在左侧滚动条。如果该元素的显示设为`display: inline`，clientLeft一律为0，不管是否存在左边框。

**（3）clientTop**

clientTop属性等于网页元素顶部边框的宽度，不包括顶部的margin和padding。

**（4）clientWidth**

clientWidth属性等于网页元素的可见宽度，即包括padding、但不包括垂直滚动条（如果有的话）、边框和margin的宽度，单位为像素。

如果一个元素是可以滚动的，则clientWidth只计算它的可见部分的宽度。

### crollHeight，scrollWidth，scrollLeft，scrollTop

**（1）scrollHeight**

scrollHeight属性返回指定元素的总高度，包括由于溢出而无法展示在网页的不可见部分。如果一个元素是可以滚动的，则scrollHeight包括整个元素的高度，不管是否存在垂直滚动条。scrollHeight属性包括padding，但不包括border和margin。该属性为只读属性。

如果不存在垂直滚动条，scrollHeight属性与clientHeight属性是相等的。如果存在滚动条，scrollHeight属性总是大于clientHeight属性。当滚动条滚动到内容底部时，下面的表达式为true。

```javascript
element.scrollHeight - element.scrollTop === element.clientHeight
```

如果滚动条没有滚动到内容底部，上面的表达式为false。这个特性结合`onscroll`事件，可以判断用户是否滚动到了指定元素的底部，比如是否滚动到了《使用须知》区块的底部。

```javascript
var rules = document.getElementById("rules");
rules.onscroll = checking;

function checking(){
  if (this.scrollHeight - this.scrollTop === this.clientHeight) {
    console.log('谢谢阅读');
  } else {
    console.log('您还未读完');
  }
}
```

**（2）scrollWidth**

scrollWidth属性返回元素的总宽度，包括由于溢出容器而无法显示在网页上的那部分宽度，不管是否存在水平滚动条。该属性是只读属性。

**（3）scrollLeft**

scrollLeft属性设置或返回水平滚动条向右侧滚动的像素数量。它的值等于元素的最左边与其可见的最左侧之间的距离。对于那些没有滚动条或不需要滚动的元素，该属性等于0。该属性是可读写属性，设置该属性的值，会导致浏览器将指定元素自动滚动到相应的位置。

**（4）scrollTop**

scrollTop属性设置或返回垂直滚动条向下滚动的像素数量。它的值等于元素的顶部与其可见的最高位置之间的距离。对于那些没有滚动条或不需要滚动的元素，该属性等于0。该属性是可读写属性，设置该属性的值，会导致浏览器将指定元素自动滚动到相应位置。

```javascript
document.querySelector('div').scrollTop = 150;
```

上面代码将div元素向下滚动150像素。

## 方法

### 与元素节点属性有关

#### hasAttribute()

返回一个布尔值，表示当前元素节点是否含有指定HTML属性，

*hasAttribute()*是一个可以接受两个参数，只接受一个表示读取，接受两个表示写入，第二个属性是写入的内容。

#### getAttribute()

返回当前节点的指定属性，没有返回null

#### removeAttribute()

移除当前节点的指定属性

#### setAttribute()

修改或者新增当前节点的指定属性。

### 与获取当前元素节点的子元素相关

#### querySelector()

querySelector方法接受CSS选择器作为参数，返回父元素的第一个匹配的子元素。

```
var content = document.getElementById('content');
var el = content.querySelector('p');

```

上面代码返回content节点的第一个p元素。

注意，如果CSS选择器有多个组成部分，比如`div p`，querySelector方法会把父元素考虑在内。假定HTML代码如下。

```
<div id="outer">
  <p>Hello</p>
  <div id="inner">
    <p>World</p>
  </div>
</div>

```

那么，下面代码会选中第一个p元素。

```
var outer = document.getElementById('outer');
var el = outer.querySelector('div p');

```

#### querySelectorAll()

querySelectorAll方法接受CSS选择器作为参数，返回一个NodeList对象，包含所有匹配的子元素。

```
var el = document.querySelector('#test');
var matches = el.querySelectorAll('div.highlighted > p');

```

在CSS选择器有多个组成部分时，querySelectorAll方法也是会把父元素本身考虑在内。

还是以上面的HTML代码为例，下面代码会同时选中两个p元素。

```
var outer = document.getElementById('outer');
var el = outer.querySelectorAll('div p');

```

#### getElementsByClassName()

getElementsByClassName方法返回一个HTMLCollection对象，成员是当前元素节点的所有匹配指定class的子元素。该方法与document.getElementsByClassName方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。

#### getElementsByTagName()

getElementsByTagName方法返回一个HTMLCollection对象，成员是当前元素节点的所有匹配指定标签名的子元素。该方法与document.getElementsByClassName方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。此外，该方法搜索之前，会统一将标签名转为小写。

### closest() && matches()

*closest()*返回与指定CSS选择器相匹配的父类节点或其本身，没有返回null

*matches()*返回一个布尔值，表示当前元素是否匹配指定css选择器。

该方法带有浏览器前缀，下面的函数可以兼容不同的浏览器，并且在浏览器不支持时，自行部署这个功能。

```javascript
function matchesSelector(el, selector) {
  var p = Element.prototype;
  var f = p.matches
    || p.webkitMatchesSelector
    || p.mozMatchesSelector
    || p.msMatchesSelector
    || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}

// 用法
matchesSelector(
  document.getElementById('myDiv'),
  'div.someSelector[some-attribute=true]'
)
```

### getBoundingClientRect()，getClientRects()

**（1）getBoundingClientRect()**

getBoundingClientRect方法返回一个对象，该对象提供当前元素节点的大小、它相对于视口（viewport）的位置等信息，基本上就是CSS盒状模型的内容。

```
var rect = obj.getBoundingClientRect();

```

上面代码中，getBoundingClientRect方法返回的对象，具有以下属性（全部为只读）。

- bottom：元素底部相对于视口的纵坐标。
- height：元素高度（等于bottom减去top）。
- left：元素左上角相对于视口的坐标。
- right：元素右边界相对于视口的横坐标。
- top：元素顶部相对于视口的纵坐标。
- width：元素宽度（等于right减去left）。

由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。

注意，getBoundingClientRect方法的所有属性，都把边框（border属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，width和height包括了元素本身 + padding + border。

**（1）getClientRects()**

getClientRects方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形。每个矩形都有`bottom`、`height`、`left`、`right`、`top`和`width`六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

对于盒状元素（比如div和p），该方法返回的对象中只有该元素一个成员。对于行内元素（比如span、a、em），该方法返回的对象有多少个成员，取决于该元素在页面上占据多少行。

```
<span id="inline">
Hello World
Hello World
Hello World
</span>

```

上面代码是一个行内元素span，如果它在页面上占据三行，getClientRects方法返回的对象就有三个成员，如果它在页面上占据一行，getClientRects方法返回的对象就只有一个成员。

```
var el = document.getElementById('inline');
el.getClientRects().length // 3
el.getClientRects()[0].left // 8
el.getClientRects()[0].right // 113.908203125
el.getClientRects()[0].bottom // 31.200000762939453
el.getClientRects()[0].height // 23.200000762939453
el.getClientRects()[0].width // 105.908203125

```

这个方法主要用于判断行内元素是否换行，以及行内元素的每一行的位置偏移。

### insertAdjacentHTML()，remove()

以下方法操作元素节点的DOM树。

**（1）insertAdjacentHTML()**

insertAdjacentHTML方法解析字符串，然后将生成的节点插入DOM树的指定位置。

```javascript
element.insertAdjacentHTML(position, text);
```

该方法接受两个参数，第一个是指定位置，第二个是待解析的字符串。

指定位置共有四个。

- beforebegin：在当前元素节点的前面。
- afterbegin：在当前元素节点的里面，插在它的第一个子元素之前。
- beforeend：在当前元素节点的里面，插在它的最后一个子元素之后。
- afterend：在当前元素节点的后面。’

```javascript
// 原来的HTML代码：<div id="one">one</div>
var d1 = document.getElementById('one');
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
// 现在的HTML代码：
// <div id="one">one</div><div id="two">two</div>
```

该方法不是彻底置换现有的DOM结构，这使得它的执行速度比innerHTML操作快得多。所有浏览器都支持这个方法，包括IE 6。

**（2）remove()**

remove方法用于将当前元素节点从DOM树删除。

```javascript
var el = document.getElementById('div-01');
el.remove();
```

### scrollIntoView()

scrollIntoView方法滚动当前元素，进入浏览器的可见区域。

```javascript
el.scrollIntoView(); // 等同于el.scrollIntoView(true)
el.scrollIntoView(false);
```

该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true。



























