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







































