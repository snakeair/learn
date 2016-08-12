# JS学习——文本节点&&DocumentFragment节点

*Text*节点代表DOM中的所有节点的文本内容，如果一个节点只包含一段文本，那么他就有一个*Text*子节点，代表该节点的文本内容。

通常我们使用`Node`节点的`firstChild`、`nextSibling`等属性获取`Text`节点，或者使用`Document`节点的`createTextNode`方法创造一个`Text`节点。注意，*空格*也是一个文本节点。

## Text节点的属性

*data*等同于*nodeValue*属性，用来设置或者读取text节点的内容。

```javascript
// 读取文本内容
document.querySelector('p').firstChild.data
// 等同于
document.querySelector('p').firstChild.nodeValue

// 设置文本内容
document.querySelector('p').firstChild.data = 'Hello World';
```

*wholeText*表示将当前text节点与毗邻的text节点作为一个整体返回。大多数情况下，wholeText的返回值与data和textContent相同。但是，某些特殊情况会有差别。

```html
<p id="para">A <em>B</em> C</p>
<script>
var el = document.getElementById("para");
el.firstChild.wholeText // "A "
el.firstChild.data // "A "
</script>

<p id="para">A C</p>
<script>
el.removeChild(para.childNodes[1]);
el.firstChild.wholeText // "A C"
el.firstChild.data // "A "
</ script>
```

*length*返回当前文本长度

*nextElementSibling*返回紧跟在当前Text节点后面的那个同级Element节点。如果取不到这样的节点，则返回null。

*previousElementSibling*属性返回当前Text节点前面最近的那个Element节点。如果取不到这样的节点，则返回null。

## Text节点的方法

### appendData()，deleteData()，insertData()，replaceData()，subStringData()

以下5个方法都是编辑Text节点文本内容的方法。

appendData方法用于在Text节点尾部追加字符串。

deleteData方法用于删除Text节点内部的子字符串，第一个参数为子字符串位置，第二个参数为子字符串长度。

insertData方法用于在Text节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。

replaceData方法用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。

subStringData方法用于获取子字符串，第一个参数为子字符串在Text节点中的开始位置，第二个参数为子字符串长度。

```javascript
// HTML代码为
// <p>Hello World</p>
var pElementText = document.querySelector('p').firstChild;

pElementText.appendData('!');
// 页面显示 Hello World!
pElementText.deleteData(7,5);
// 页面显示 Hello W
pElementText.insertData(7,'Hello ');
// 页面显示 Hello WHello
pElementText.replaceData(7,5,'World');
// 页面显示 Hello WWorld
pElementText.substringData(7,10);
// 页面显示不变，返回"World "
```

### remove()

remove方法用于移除当前Text节点。

```javascript
// HTML代码为
// <p>Hello World</p>

document.querySelector('p').firstChild.remove()
// 现在页面代码为
// <p></p>
```

### splitText()，normalize()

splitText方法将Text节点一分为二，变成两个毗邻的Text节点。它的参数就是分割位置（从零开始），分割到该位置的字符前结束。如果分割位置不存在，将报错。

分割后，该方法返回分割位置后方的字符串，而原Text节点变成只包含分割位置前方的字符串。

```javascript
// html代码为 <p id="p">foobar</p>
var p = document.getElementById('p');
var textnode = p.firstChild;

var newText = textnode.splitText(3);
newText // "bar"
textnode // "foo"
```

normalize方法可以将毗邻的两个Text节点合并。

接上面的例子，splitText方法将一个Text节点分割成两个，normalize方法可以实现逆操作，将它们合并。

```javascript
p.childNodes.length // 2

// 将毗邻的两个Text节点合并
p.normalize();
p.childNodes.length // 1
```

## DocumentFragment节点

DocumentFragment节点代表一个文档的片段，本身就是一个完整的DOM树形结构。它没有父节点，不属于当前文档，操作DocumentFragment节点，要比直接操作DOM树快得多。

它一般用于构建一个DOM结构，然后插入当前文档。document.createDocumentFragment方法，以及浏览器原生的DocumentFragment构造函数，可以创建一个空的DocumentFragment节点。然后再使用其他DOM方法，向其添加子节点。

```javascript
var docFrag = document.createDocumentFragment();
// or
var docFrag = new DocumentFragment();

var li = document.createElement("li");
li.textContent = "Hello World";
docFrag.appendChild(li);

document.queryselector('ul').appendChild(docFrag);
```

上面代码创建了一个DocumentFragment节点，然后将一个li节点添加在它里面，最后将DocumentFragment节点移动到原文档。

一旦DocumentFragment节点被添加进原文档，它自身就变成了空节点（textContent属性为空字符串）。如果想要保存DocumentFragment节点的内容，可以使用cloneNode方法。

```javascript
document
  .queryselector('ul')
  .appendChild(docFrag.cloneNode(true));
```

DocumentFragment节点对象没有自己的属性和方法，全部继承自Node节点和ParentNode接口。也就是说，DocumentFragment节点比Node节点多出以下四个属性。

> - children：返回一个动态的HTMLCollection集合对象，包括当前DocumentFragment对象的所有子元素节点。
> - firstElementChild：返回当前DocumentFragment对象的第一个子元素节点，如果没有则返回null。
> - lastElementChild：返回当前DocumentFragment对象的最后一个子元素节点，如果没有则返回null。
> - childElementCount：返回当前DocumentFragment对象的所有子元素数量。

另外，Node节点的所有方法，都接受DocumentFragment节点作为参数（比如Node.appendChild、Node.insertBefore）。这时，DocumentFragment的子节点（而不是DocumentFragment节点本身）将插入当前节点。



















