#  JS学习——Decument节点操作

`document`节点是文档的根节点，每张网页都有自己的`document`节点。`window.document`属性就指向这个节点。也就是说，只要浏览器开始载入HTML文档，这个节点对象就存在了，可以直接调用。

> 1. 对于正常的网页，直接使用`document`或`window.document`。
> 2. 对于`iframe`载入的网页，使用`iframe`节点的`contentDocument`属性。
> 3. 对Ajax操作返回的文档，使用XMLHttpRequest对象的`responseXML`属性。
> 4. 对于某个节点包含的文档，使用该节点的`ownerDocument`属性。

上面这四种`document`节点，都部署了[Document接口](http://dom.spec.whatwg.org/#interface-document)，因此有共同的属性和方法。当然，各自也有一些自己独特的属性和方法，比如HTML和XML文档的`document`节点就不一样。

## document节点属性

### 属性指向文档内部

#### doctype

文档`DTD`声明，如果没有则返回*null*，一般使用*document.firstChild*返回的就是这个节点。

#### defaultView

返回document对象所在的window对象。否则返回null

#### body && head

返回与其名字相同的文档节点，注意body有时候返回的可能是`frameset`节点。另外获取`head`有两种方式：

```javascript
document.head === documents.querySelector('head')
```

### 属性返回文本信息

#### documentURl , URL

两个属性相同，都是返回档期文档的网址，。不同是：`documentURI`返回的是所有文档都具备的，`URL`返回的是HTML文档独有的。

```javascript
ducument.documentURI === document.URL  //true
```

另外，如果文档锚点变化，这两个属性不会变化，但是`document.location`会跟着变化。

#### domain

返回当前文本的域名。如果无法获取就返回`null`。

#### lastModified

返回当前文档最后修改的时间戳，格式为字符串。

```javascript
document.lastModified
// Tuesday, July 10, 2001 10:19:42
```

另外，`lastModified`返回的是字符串，所以不能够直接比较，如果需要比较的话需要使用`date.parse`将格式转换。

#### document.location

返回当前文档的URL信息

```javascript
// 当前网址为 http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.href // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol // "http:"
document.location.host // "www.example.com:4097"
document.location.hostname // "www.example.com"
document.location.port // "4097"
document.location.pathname // "/path/a.html"
document.location.search // "?x=111"
document.location.hash // "#part1"
document.location.user // "user"
document.location.password // "passed"
```

`location`有以下方法

> 1. location.assign()
> 2. location.reload()
> 3. location.toString()

```javascript
// 跳转到另一个网址
document.location.assign('http://www.google.com')
// 优先从服务器重新加载
document.location.reload(true)
// 优先从本地缓存重新加载（默认值）
document.location.reload(false)
// 跳转到新网址，并将取代掉history对象中的当前记录
document.location.replace('http://www.google.com');
// 将location对象转为字符串，等价于document.location.href
document.location.toString()
```

如果将新的网址赋值给`location`对象，网页就会自动跳转到新网址。

```javascript
document.location = 'http://www.example.com';
// 等同于
document.location.href = 'http://www.example.com';
```

也可以指定相对URL。

```javascript
document.location = 'page2.html';
```

如果指定的是锚点，浏览器会自动滚动到锚点处。

```javascript
document.location = '#top';
```

注意，采用上面的方法重置URL，跟用户点击链接跳转的效果是一样的。上一个网页依然将保存在浏览器历史之中，点击“后退”按钮就可以回到前一个网页。

如果不希望用户看到前一个网页，可以使用`location.replace`方法，浏览器`history`对象就会用新的网址，取代当前网址，这样的话，“后退”按钮就不会回到当前网页了。它的一个应用就是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。

`document.location`属性与`window.location`属性等价。

```javascript
document.location === window.location // true
```

历史上，IE曾经不允许对`document.location`赋值，为了保险起见，建议优先使用`window.location`。如果只是单纯地获取当前网址，建议使用`document.URL`，语义性更好。

### document.referrer，document.title，document.characterSet

`document.referrer`属性返回一个字符串，表示当前文档的访问来源，如果是无法获取来源或是用户直接键入网址，而不是从其他网页点击，则返回一个空字符串。

`document.title`属性返回当前文档的标题，该属性是可写的。

```javascript
document.title = '新标题';
```

`document.characterSet`属性返回渲染当前文档的字符集，比如UTF-8、ISO-8859-1。

### 与文档行文有关

#### readyState

返回当前文档状态：

> 1. *loading*：加载html代码中
> 2. *interactive*：加载外部资源
> 3. *complete*：加载完成

#### designMode

designMode属性控制当前document是否可编辑。通常会打开iframe的designMode属性，将其变为一个所见即所得的编辑器。

```javascript
iframe_node.contentDocument.designMode = "on";
```

### 返回文档的环境信息

#### implementatio

implementation属性返回一个对象，用来甄别当前环境部署了哪些DOM相关接口。implementation属性的hasFeature方法，可以判断当前环境是否部署了特定版本的特定接口。

```javascript
document.implementation.hasFeature( 'HTML', '2.0')
// true

document.implementation.hasFeature('MutationEvents','2.0')
// true
```

上面代码表示，当前环境部署了DOM HTML 2.0版和MutationEvents的2.0版。

#### compatMod

`compatMode`属性返回浏览器处理文档的模式，可能的值为`BackCompat`（向后兼容模式）和`CSS1Compat`（严格模式）。

一般来说，如果网页代码的第一行设置了明确的`DOCTYPE`（比如``），`document.compatMode`的值都为`CSS1Compat`。

### 返回动态的文档元素集合

#### anchors

返回页面中的所有的制定了name属性的*a*元素

#### embeds

返回网页中所有嵌入对象，即*embed*标签。返回格式为类似数组的对象*nodeList*。

#### forms

返回页面中的表单

#### images

返回页面中的图片

#### links

返回所有连接，即具有href属性的*a*标签。

#### scripts

scripts属性返回当前文档的所有脚本（即script标签）。

```javascript
var scripts = document.scripts;
if (scripts.length !== 0 ) {
  console.log("当前网页有脚本");
}
```

#### styleSheets

styleSheets属性返回一个类似数组的对象，包含了当前网页的所有样式表。该属性提供了样式表操作的接口。然后，每张样式表对象的cssRules属性，返回该样式表的所有CSS规则。这又方便了操作具体的CSS规则。

```javascript
var allSheets = [].slice.call(document.styleSheets);

```

上面代码中，使用slice方法将document.styleSheets转为数组，以便于进一步处理。

## document对象的方法

### open()，close()，write()，writeln()

```javascript
// 页面显示“helloworld”
document.open();
document.write('hello');
document.write('world');
document.close();
```

先看上面的例子，*open*表示创建一个新的文档，*write*表示对齐进行写入，*close*表示关闭

如果页面已经解析完成（DOMContentLoaded事件发生之后），再调用write方法，它会先调用open方法，擦除当前文档所有内容，然后再写入。

```javascript
document.addEventListener("DOMContentLoaded", function(event) {
  document.write('<p>Hello World!</p>');
});

// 等同于

document.addEventListener("DOMContentLoaded", function(event) {
  document.open();
  document.write('<p>Hello World!</p>');
  document.close();
});
```

如果在页面渲染过程中调用`write`方法，并不会调用`open`方法。（可以理解成，open方法已调用，但close方法还未调用。）

```javascript
<html>
<body>
hello
<script type="text/javascript">
  document.write("world")
</script>
</body>
</html>
```

在浏览器打开上面网页，将会显示“hello world”。

需要注意的是，虽然调用close方法之后，无法再用write方法写入内容，但这时当前页面的其他DOM节点还是会继续加载。

```javascript
<html>
<head>
<title>write example</title>
<script type="text/javascript">
  document.open();
  document.write("hello");
  document.close();
</script>
</head>
<body>
world
</body>
</html>
```

在浏览器打开上面网页，将会显示“hello world”。

总之，除了某些特殊情况，应该尽量避免使用`document.write`这个方法。

`document.writeln`方法与`write`方法完全一致，除了会在输出内容的尾部添加换行符。

```javascript
document.write(1);
document.write(2);
// 12

document.writeln(1);
document.writeln(2);
// 1
// 2
//
```

注意，`writeln`方法添加的是ASCII码的换行符，渲染成HTML网页时不起作用。

### hasFocus()

返回一个布尔值，表示当前文档中是否有元素被激活或者获得焦点。

```javascript
focused = document.hasFocus();
```

注意，有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点。比如如果用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。

### 用来选中当前文档元素的

#### querySelector()

返回指定CSS选择器的元素节点，如果多个节点满足则返回第一个匹配节点。

```javascript
var obj = document.querySelector('#main > [ng-click]');
```

`注意`：*querySelector()*无法选中CSS伪类元素*:befor & :after*

#### getElementById() 

获取指定ID的元素节点，如果没有返回null。

#### querySelectorAll()

返回指定CSS选择器的所有节点，返回的是NodeList类型的对象，非动态集合。

#### getElementsByClassName()

返回指定CSS名的一个类似数组的对象。返回结果为动态集合。如果要获取多个CSS名的话可以使用*空格*进行分割。

### getElementsByTagName()

返回指定类型的标签，返回值是一个*HTMLCollection*对象，是一个动态集合。

`注意`：getElementsByTagName会将参数*转为小写*后再进行所搜。

#### getElementsByName()

获取指定*name*值得HTML元素，返回值是一个NodeList对象，但不是动态集合。

注意：IE在使用这个方法的时候也会获取相同的ID的元素。

#### elementFromPoint()

返回页面指定位置的元素,如果元素不可返回则返回其父级元素。如果坐标无意义则返回null。

```javascript
var element = document.elementFromPoint(x , y);
```

### 生成元素节点

#### creatElement()

生成HTML元素节点。

```javascript
var newDiv = document.createElement("div");
```

createElement方法的参数为元素的标签名，即元素节点的tagName属性。如果传入大写的标签名，会被转为小写。如果参数带有尖括号（即<和>）或者是null，会报错。

#### creatTextNode()

生成文本节点，参数为需要生成的内容。另外，*creatTextNode*会在输出时转义*非引号*的代码。

#### createAttribute()

生成一个新的属性对象节点，并返回。

```javascript
var node = document.getElementById("div1");
var a = document.createAttribute("my_attrib");
a.value = "newVal";
node.setAttributeNode(a);
// 等同于
var node = document.getElementById("div1");
node.setAttribute("my_attrib", "newVal");
```

上面代码中，由于`createTextNode`方法不转义双引号，导致`onmouseover`方法被注入了代码。

#### createDocumentFragment()

createDocumentFragment方法生成一个DocumentFragment对象。

```javascript
var docFragment = document.createDocumentFragment();
```

DocumentFragment对象是一个存在于内存的DOM片段，但是不属于当前文档，常常用来生成较复杂的DOM结构，然后插入当前文档。这样做的好处在于，因为DocumentFragment不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的DOM有更好的性能表现。

```javascript
var docfrag = document.createDocumentFragment();

[1, 2, 3, 4].forEach(function(e) {
  var li = document.createElement("li");
  li.textContent = e;
  docfrag.appendChild(li);
});

document.body.appendChild(docfrag);
```

### createEvent()

createEvent方法生成一个事件对象，该对象可以被element.dispatchEvent方法使用，触发指定事件。

```javascript
var event = document.createEvent(type);
```

createEvent方法的参数是事件类型，比如UIEvents、MouseEvents、MutationEvents、HTMLEvents。

```javascript
var event = document.createEvent('Event');
event.initEvent('build', true, true);
document.addEventListener('build', function (e) {
  // ...
}, false);
document.dispatchEvent(event);
```

### 用于遍历节点

#### creatNodelterator()

返回一个DOM的子节点遍历器。

```javascript
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);
```

上面代码返回body元素的遍历器。createNodeIterator方法的第一个参数为遍历器的根节点，第二个参数为所要遍历的节点类型，这里指定为元素节点。其他类型还有所有节点（NodeFilter.SHOW_ALL）、文本节点（NodeFilter.SHOW_TEXT）、评论节点（NodeFilter.SHOW_COMMENT）等。

#### creatTreeWalker()

createTreeWalker方法返回一个DOM的子树遍历器。它与createNodeIterator方法的区别在于，后者只遍历子节点，而它遍历整个子树。

createTreeWalker方法的第一个参数，是所要遍历的根节点，第二个参数指定所要遍历的节点类型。

```javascript
var treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var nodeList = [];

while(treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);
```

上面代码遍历body节点下属的所有元素节点，将它们插入nodeList数组。

### 获取外部文档节点

#### adopNode

获取某个节点，从起原来文档移除出入当前文档，并返回出入后的新节点。

```javascript
node = document.adoptNode(externalNode);
```

importNode方法从外部文档拷贝指定节点，插入当前文档。

```javascript
var node = document.importNode(externalNode, deep);*importNode()
```

#### importNode

方法用于创造一个外部节点的拷贝，然后插入当前文档。它的第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为true。

另外一个需要注意的地方是，importNode方法只是拷贝外部节点，这时该节点的父节点是null。下一步还必须将这个节点插入当前文档的DOM树。

```javascript
var iframe = document.getElementsByTagName("iframe")[0];
var oldNode = iframe.contentWindow.document.getElementById("myNode");
var newNode = document.importNode(oldNode, true);
document.getElementById("container").appendChild(newNode);
```

### addEventListener()，removeEventListener()，dispatchEvent()

以下三个方法与Document节点的事件相关。这些方法都继承自EventTarget接口，详细介绍参见《Event对象》章节的《EventTarget》部分。

```javascript
// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```

