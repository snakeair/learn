# JS学习——DOM操作

`DOM`就是文档对象模型（Document Object Model）的简称。就是将html或者xml当作一个树状的结构*DOM Tree*来操作。

`节点`就是DOM的最小组成单位（node），一个文档的树形结构（DOM树），就是由各种不同类型的节点组成。

对于HTML文档，节点主要有以下六种类型：Document节点、DocumentType节点、Element节点、Attribute节点、Text节点和DocumentFragment节点。

|        节点        |   名称   |             含义             |
| :--------------: | :----: | :------------------------: |
|    Documents     |  文档节点  |   整个文档（window.document）    |
|   DucumentType   | 文档类型节点 |  文档的类型（比如<!DOCTYPE html>）  |
|     Element      |  元素节点  |   HTML元素（比如<body>、<a>等）    |
|    Attiribute    |  属性节点  | HTML元素的属性（比如class=”right”） |
|       Text       |  文本节点  |        HTML文档中出现的文本        |
| DocumentFragment | 文档碎片节点 |        HTML文档中出现的文本        |

浏览器有一个原生的Node对象，上面表格中的所有节点都是由此派生出来的，所以他们都会继承Node的属性和方法。

## Node节点的属性

`NodeName`返回节点名臣，`NodeType`返回节点常数。

| 类型                     | nodeName             | nodeType |
| ---------------------- | -------------------- | -------- |
| DOCUMENT_NODE          | #document            | 9        |
| ELEMENT_NODE           | 大写的HTML元素名           | 1        |
| ATTRIBUTE_NODE         | 等同于Attr.name         | 2        |
| TEXT_NODE              | #text                | 3        |
| DOCUMENT_FRAGMENT_NODE | #document-fragment   | 11       |
| DOCUMENT_TYPE_NODE     | 等同于DocumentType.name | 10       |

```javascript
document.nodeName // "#document"
document.nodeType // 9

document.querySelector('a').nodeType === 1
// true
document.querySelector('a').nodeType === Node.ELEMENT_NODE
// true
```

我们可以看到上面两种方式都可以获得节点的类型，但是相对来说使用`NodeType`会更加方便一些，但是`NodeType`返回的是一个数字，而对于数字则会容易记忆错误，所以在做项目的时候我们可以对每一个值赋予一个英文含义，这样会更加直观。

## 属性和方法

### 返回当前节点的相关节点。

#### ownerDocument

返回当前文档的顶级节点，及*documents*。

#### nextSibiling

获取当前节点之后的同级节点，如果其之后没有节点则返回*null*。如果其后面跟随的是一个空格则会返回一个文本节点。

```javascript
var el = document.getElementById('main').firstChild;
var i = 1;
while(el){
  console.log(i + '. ' + el.nodeName);
  el = el.nextSibiling;
  i++;
}
```

这是一个使用nexSibiling的一种用法，可以获取*id*为main的元素中的所有子元素。

#### previousSibling

如果`nextSibling`返回的是当前之后的节点的话，那么`previousSibling`返回的就是其之前的节点。

如果没有的话返回null

#### parentNode

返回父节点，说到父节点先说说节点：`element`、`document`、`documentframent`。*element*是节点元素，*documents*是根节点，*documentframent*是没有父节点的最小的文档对象（不懂）。所以我们可以看出来后两者是没有父节点的。另外还有那些生成后没有插入DOM树的节点父节点也是null。

```javascript
if (node.parentNode) {
  node.parentNode.removeChild(node);
}
//判断父节点是否存在，然后选择其子节点进行删除。
```

针对IE还有一个`parentElement`属性，这个属性与node的是一样的但是在ie中也可以生效。

### 返回当前节点内容

#### textContent

返回当前节点内所包含的所有文本

```javascript
// HTML代码为
// <div id="divA">This is <span>some</span> text</div>

document.getElementById("divA").textContent
// This is some text
```

另外`textContent`不止可以读取，还可写入，但是写入的时候回完全替换掉节点内部的所有内容，而且会对插入内容的标签进行转义，所以`textContent`只能插入文本而不能插入文档。

对于Text节点和Comment节点，该属性的值与nodeValue属性相同。对于其他类型的节点，该属性会将每个子节点的内容连接在一起返回，但是不包括Comment节点。如果一个节点没有子节点，则返回空字符串。

document节点和doctype节点的textContent属性为null。如果要读取整个文档的内容，可以使用`document.documentElement.textContent`。

在IE浏览器，所有Element节点都有一个innerText属性。它与textContent属性基本相同，但是有几点区别。

#### nodeValue

nodeValue属性返回或设置当前节点的值，格式为字符串。但是，该属性只对Text节点、Comment节点、XML文档的CDATA节点有效，其他类型的节点一律返回null。

因此，nodeValue属性一般只用于Text节点。对于那些返回null的节点，设置nodeValue属性是无效的。

### 返回当前节点的子节点

#### childNodes

返回一个当前节点的所有子节点的合集*NodeList*。*NodeList*是一个动态的合计，一旦子节点发生变化，会立即反应在结果中。另外如果我们获取HTML元素节点的话还会包含有`Text`和`Comment`节点。

#### firstChild && lastChild

返回当前节点的第一个或者最后一个节点，如果没有返回*null*。

`firstChild`不只能返回元素节点还可以返回文本节点

```html
<p id="para-01">
  <span>First span</span>
</p>

<script type="text/javascript">
  console.log(
    document.getElementById('para-01').firstChild.nodeName
  ) // "#text"
</script>
```

上面的代码中由于*p*之后有个回车键，所以firstChild返回就是一个空白字符。

### baseURI

返回一个字符串，由当前网页的协议、域名和所在目录组成，表示当前网页的绝对路径。如果无法获取则返回*null*。*该属性是只读的*

通常情况下，该属性由当前网址的URL（即window.location属性）决定，但是可以使用HTML的<base>标签，改变该属性的值。

```html
<base href="http://www.example.com/page.html">
<base target="_blank" href="http://www.example.com/page.html">
```

该属性不仅document对象有（`document.baseURI`），元素节点也有（`element.baseURI`）。通常情况下，它们的值是相同的。

## Node节点的方法

### 以子节点有关

#### appendChild()

接受一个节点作为对象，将其作为最后一个子节点插入当前节点。

```javascript
var p = document.createElement("p");
document.body.appendChild(p);
```

如果参数节点是为挡住的其他节点，appenChild方法会将其从原来位置移动到新位置。

#### hadChildNodes()

返回一个布尔值表示当前节点是否有子节点。

```javascript
var foo = document.getElementById("foo");

if ( foo.hasChildNodes() ) {
  foo.removeChild( foo.childNodes[0] );
}
```

如果我们结合之前的例子可以写一个遍历当前节点所有子节点的函数

```javascript
function DOMComb (oParent, oCallback) {
  if (oParent.hasChildNodes()) {
    for (var oNode = oParent.firstChild; oNode; oNode = oNode.nextSibling) {
      DOMComb(oNode, oCallback);
    }
  }
  oCallback.call(oParent);
}
```

上面的代码中先判断是否有子节点，然后实用*for*声明第一个子节点，在进行一次遍历，最后调用输出。

### 与节点操作有关

#### cloneNode()

克隆一个节点，有一个*布尔值*作为参数，默认*false*，设置为*true*时表示克隆。

```javascript
var cloneUL = document.querySelector('ul').cloneNode(true);
```

如果我们要克隆节点的话，必须传入一个*true*作为参数，同时，在克隆的时候会将整个元素拷贝，包括其所有子元素。

`cloneNode`还有一个需要注意的：在克隆节点的时候回丢失*addEventLinster*方法和*on-*属性，（既：*node.onclick - fn*）。另外在克隆的时候要注意**id是唯一的**。

#### insertBefore()

将某个节点插入当前节点的指定位置。它可以接受两个参数，第一个参数是需要插入的节点，第二个表示当前节点的子节点，新节点会插入到这个节点之前。如果只有一个参数的话，会默认添加到元素的最末；如果要插入到某个节点的后面的话我们可以在第二个参数上面调用*nextSilbing*。

#### removeChild()

移除所选节点，它返回的是被移除的节点。

```javascript
var element = document.getElementById("top");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

这是一个移除当前节点的所有子节点的例子。被移除的节点仍然在内存中，但是已经不是DOM的一部分了，所以我们仍然可以使用。

#### replaceChild()

使用新节点替换当前节点的某一个子节点。它接受两个参数，第一个是新节点，第二个是被替换的节点，返回值为被替换的节点。

```javascript
replacedNode = parentNode.replaceChild(newChild, oldChild);
```

### 用于节点的相互比较

#### contains

```javascript
document.body.contains(node)
```

接受一个参数，返回一个布尔值，表示参数是否是当前节点的后代节点

#### compareDocumentPosition()

compareDocumentPosition方法的用法，与contains方法完全一致，返回一个7个比特位的二进制值，表示参数节点与当前节点的关系。

| 二进制值   | 数值   | 含义                        |
| ------ | ---- | ------------------------- |
| 000000 | 0    | 两个节点相同                    |
| 000001 | 1    | 两个节点不在同一个文档（即有一个节点不在当前文档） |
| 000010 | 2    | 参数节点在当前节点的前面              |
| 000100 | 4    | 参数节点在当前节点的后面              |
| 001000 | 8    | 参数节点包含当前节点                |
| 010000 | 16   | 当前节点包含参数节点                |
| 100000 | 32   | 浏览器的私有用途                  |

```javascript
// HTML代码为
// <div id="writeroot">
//   <form>
//     <input id="test" />
//   </form>
// </div>

var x = document.getElementById('writeroot');
var y = document.getElementById('test');

x.compareDocumentPosition(y) // 20
y.compareDocumentPosition(x) // 10
```

#### isEqualNode()

返回一个布尔值，检测两个节点是否相同：*类型、属性、子节点*。

### normalize()

用于清理当前节点内的所有text节点，它会出去所有的空文本节点，将整个文本合并。

normailize方法用于清理当前节点内部的所有Text节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。

```javascript
var wrapper = document.createElement("div");

wrapper.appendChild(document.createTextNode("Part 1 "));
wrapper.appendChild(document.createTextNode("Part 2 "));

wrapper.childNodes.length // 2

wrapper.normalize();

wrapper.childNodes.length // 1
```

上面代码使用normalize方法之前，wrapper节点有两个Text子节点。使用normalize方法之后，两个Text子节点被合并成一个。

## NodeList接口，HTMLCollection接口

### NodeList接口

有些属性和方法返回的是一组节点，比如*Node.childNodes、document.querySelectorAll()*。它们返回的都是一个部署了`NodeList`接口的对象。

`NodeList`返回的有时候是一个动态集合，有时候是一个静态集合。所谓动态集合就是可以随着DOM变化而变化的，而静态则相反，不会反应DOM的变化。

`Node.childNodes`返回的就是一个动态的，而`document.querySelectorAll`返回的则是一个静态的

NodeList接口提供length属性和数字索引，因此可以像数组那样，使用数字索引取出每个节点，但是它本身并不是数组，不能使用pop或push之类数组特有的方法。

```javascript
// 数组的继承链
myArray --> Array.prototype --> Object.prototype --> null

// NodeList的继承链
myNodeList --> NodeList.prototype --> Object.prototype --> null
```

从上面的继承链可以看到，NodeList接口对象并不继承Array.prototype，因此不具有数组接口提供的方法。如果要在NodeList接口使用数组方法，可以将NodeList接口对象转为真正的数组。

```javascript
var div_list = document.querySelectorAll('div');
var div_array = Array.prototype.slice.call(div_list);
```

也可以通过下面的方法调用。

```javascript
var forEach = Array.prototype.forEach;

forEach.call(element.childNodes, function(child){
  child.parentNode.style.color = '#0F0';
});
```

上面代码让数组的forEach方法在NodeList接口对象上调用。

不过，遍历NodeList接口对象的首选方法，还是使用for循环。

```javascript
for (var i = 0; i < myNodeList.length; ++i) {
  var item = myNodeList[i];
}
```

不要使用for…in循环去遍历NodeList接口对象，因为for…in循环会将非数字索引的length属性和下面要讲到的item方法，也遍历进去，而且不保证各个成员遍历的顺序。

ES6新增的for…of循环，也可以正确遍历NodeList接口对象。

```javascript
var list = document.querySelectorAll( 'input[type=checkbox]' );
for (var item of list) {
  item.checked = true;
}
```

NodeList接口提供item方法，接受一个数字索引作为参数，返回该索引对应的成员。如果取不到成员，或者索引不合法，则返回null。

```javascript
nodeItem = nodeList.item(index)

// 实例
var divs = document.getElementsByTagName("div");
var secondDiv = divs.item(1);
```

上面代码中，由于数字索引从零开始计数，所以取出第二个成员，要使用数字索引1。

所有类似数组的对象，都可以使用方括号运算符取出成员，所以一般情况下，都是使用下面的写法，而不使用item方法。

```javascript
nodeItem = nodeList[index]
```

### HTMLCollection接口

`HTMLCollection`与`NodeList`类似，都是节点集合，但是*html*的成员都是element节点，且是动态集合，`document.links、docuement.forms、document.images`等属性，返回的都是HTMLCollection接口对象。部署了该接口的对象具有length属性和数字索引，因此是一个类似于数组的对象。

`item`方法根据成员的位置（从0开始），返回该成员。如果取不到成员或者索引不合法则会返回*null*。

namedItem方法根据成员的ID属性或name属性，返回该成员。如果没有对应的成员，则返回null。

```javascript
// HTML代码为
// <form id="myForm"></form>
var elem = document.forms.namedItem("myForm");
// 等价于下面的写法
var elem = document.forms["myForm"];
```

由于item方法和namedItem方法，都可以用方括号运算符代替，所以建议一律使用方括号运算符。

## ParentNode接口，ChildNode接口

不同的节点除了继承Node接口以外，还会继承其他接口。ParentNode接口用于获取当前节点的Element子节点，ChildNode接口用于处理当前节点的子节点（包含但不限于Element子节点）。

### ParentNode接口

`ParentNode`接口用于获取Element子节点。*Element节点、Document节点和DocumentFragment节点*，部署了ParentNode接口。凡是这三类节点，都具有以下四个属性，用于获取Element子节点。

#### children

返回一个动态的*HTMLCollection*集合，由当前节点的所有Element子节点组成。

#### firstElementChild && lastElementChild

返回当前节点的第一个或最后一个Element子节点，如果不存在返回*null*

#### childElementCount

返回所有Element子节点的数目。

### ChildNode接口

用于处理子节点：*Element*、*documentType*、*CharacterData*接口部署了ChildNode接口。这三类都可以使用一下三种方法，但是目前位置没有浏览器支持后三种：

#### remove

移除当前节点

#### before && after

在当前节点前或者后插入一个同级节点，插入DOM的就是该节点对象；如果参数是文本插入DOM就是参数对应的文本节点。

#### replaceWith

用指定节点替换当前节点。如果参数是节点对象，替换当前节点的就是该节点对象；如果参数是文本，替换当前节点的就是参数对应的文本节点。

## html元素

`html`元素是网页的根元素，`document.documentElement`就指向这个元素。

### clientWidth  &&  clientHeight

返回可视区域的大小

### dataset

`dataset`属性用于操作HTML标签元素的`data-*`属性。下面是一个有`data-*`属性的`div`节点。

```
<div id="myDiv" data-id="myId"></div>

```

要读取`data-id`属性，可以从当前节点的`dataset.id`属性读取。

```
var id = document.getElementById("myDiv").dataset.id;

```

要设置`data-id`属性，可以直接对`dataset.id`赋值。如果该属性不存在，将会被新建。

```
document.getElementById('myDiv').dataset.id = 'hello';

```

删除一个`data-*`属性，可以直接使用`delete`命令。

```
delete document.getElementById("myDiv").dataset.id;

```

除了`dataset`属性，也可以用`getAttribute('data-foo')`、`removeAttribute('data-foo')`、`setAttribute('data-foo')`、`hasAttribute('data-foo')`等方法操作`data-*`属性。

需要注意的是，`dataset`属性使用骆驼拼写法表示属性名，这意味着`data-hello-world`会用`dataset.helloWorld`表示。而如果此时存在一个`data-helloWorld`属性，该属性将无法读取，也就是说，`data-*`属性本身只能使用连词号，不能使用骆驼拼写法。

### tabindex

用于指定当前html元素节点是否可以被*tab*遍历，以及遍历顺序

```javascript
var b1 = document.getElementById("button1");
b1.tabIndex = 1;
```

如果 *tabindex = -1* ，tab键跳过当前元素。

如果 *tabindex = 0 *，表示tab键将遍历当前元素。如果一个元素没有设置tabindex，默认值就是0。

如果* tabindex* 大于0，表示tab键优先遍历。值越大，就表示优先级越大。

### 页面位置相关属性

>1. offsetParent：当前HTML元素的最靠近的、并且CSS的position属性不等于static的父元素。
>2. offsetTop：当前HTML元素左上角相对于offsetParent的垂直位移。
>3. offsetLeft：当前HTML元素左上角相对于offsetParent的水平位移。
>4. style：读写页面元素行内样式

### Element对象

> 1. querySelector方法
> 2. querySelectorAll方法
> 3. getElementsByTagName方法
> 4. getElementsByClassName方法

上面四个方法只用于选择Element对象的子节点。因此，可以采用链式写法来选择子节点。

```javascript
document.getElementById('header').getElementsByClassName('a')
```

#### elementFromPoint

用于选择指定坐标最上层的Element对象

```javascript
document.elementFromPoint(50,50)
//选中在坐标（50 50）这个位置的最上层元素
```

#### html元素相关属性方法

> 1. hasAttribute()：返回一个布尔值，表示Element对象是否有该属性。
> 2. getAttribute()
> 3. setAttribute()
> 4. removeAttribute()

#### matchesSelector

返回一个布尔值，表示Element对象是否符合某个css选择器

```javascript
document.querySelector('li').matchesSelector('li:first-child')
```

这个方法需要加上浏览器前缀，需要写成mozMatchesSelector()、webkitMatchesSelector()、oMatchesSelector()、msMatchesSelector()。

#### focus

移动焦点

#### table

> 1. **insertRow()**：在指定位置插入一个新行（tr）。
> 2. **deleteRow()**：在指定位置删除一行（tr）。
> 3. **insertCell()**：在指定位置插入一个单元格（td）。
> 4. **deleteCell()**：在指定位置删除一个单元格（td）。
> 5. **createCaption()**：插入标题。
> 6. **deleteCaption()**：删除标题。
> 7. **createTHead()**：插入表头。
> 8. **deleteTHead()**：删除表头。

table元素有以下属性：

> 1. **caption**：标题。
> 2. **tHead**：表头。
> 3. **tFoot**：表尾。
> 4. **rows**：行元素对象，该属性只读。
> 5. **rows.cells**：每一行的单元格对象，该属性只读。
> 6. **tBodies**：表体，该属性只读。



## END







