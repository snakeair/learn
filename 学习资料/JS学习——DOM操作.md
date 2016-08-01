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

### ownerDocument

返回当前文档的顶级节点，及*documents*。

### nextSibiling

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









