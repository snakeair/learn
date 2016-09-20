# EC

# MAScript 6入门

首先，`ES6`作为最新的JS标准，大部分的浏览器支持率都不是很高，如果我们要学习的话最好的方式是使用NodeJS来进行学习。Node支持很多的ES6新属性还可以使用其中的插件来处理我们的代码。

我们可以使用`nvm`来部署Node环境，但是*window*不支持nvm，我们需要使用*nvm-window*或者*nvmw*。

```ruby
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/<version number>/install.sh | bash
$ source ~/.nvm/nvm.sh
$ nvm install node
```

上面是*nvm*的安装命令，第一句是安装，第二句是激活。在win下只需要将nvm改为上面的两种就可以了。

在Node中使用一下命令可以查看Node支持的ES6的属性：  

```javascript
$ node --v8-options | grep harmony
```

## 转码

首先我们在使用*ES6*的时候最担心的就是兼容问题，在这里又一个`babel`可以将ES6转译为ES5的代码。

例如

```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

要使用*babel*首先我们要

***

### 配置文件.babelr

Babel的配置文件是`.babelrc`，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。

```json
{
  "presets" : [],
  "plugins" : []
}
```

`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```ruby
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

然后，将这些规则加入`.babelrc`。

```json
  {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

注意，以下所有Babel工具和模块的使用，都必须先写好`.babelrc`。

`Babel`提供*babel-cli*工具，用于命令行转码。

```ruby
$ npm install --global babel-cli
```

使用上面代码安装成功之后可以使用下列命令进行转码：

```ruby
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

### babel-register

`babel-register`模块用来改写`require`命令，他会给require加上一个层级，每次我们使用*require*加载*js \ jsx \ es \ es6*文件的时候就会默认的使用*babel*进行转码。

```ruby
$ npm install --save-dev babel-register
```

使用上面代码安装，然后再进行加载：

```ruby
require = ('babel-register');
require = ('./index.js')
```

需要注意的是，`babel-register`只会对`require`命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

### babel-core

如果某些代码需要调用Babel的API进行转码，就要使用`babel-core`模块。

安装命令如下。

```ruby
$ npm install babel-core --save
```

然后，在项目中就可以调用`babel-core`。

```javascript
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

配置对象`options`，可以参看官方文档[http://babeljs.io/docs/usage/options/](http://babeljs.io/docs/usage/options/)。

下面是一个例子。

```javascript
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

上面代码中，`transform`方法的第一个参数是一个字符串，表示需要被转换的ES6代码，第二个参数是转换的配置对象。

### babel-polyfill

babel默认的只转码新的JS语法，但是不会转码新的API，所以我们需要使用`babel-polyfill`来为当前环境做一个垫片。

```ruby
$ npm install --save babel-polyfill
```

照理，先安装插件，然后再在脚本头部引入：

```javascript
import 'babel-polyfill';
//或者
requrie('babel-polyfill')
```

Babel默认不转码的API非常多，详细清单可以查看`babel-plugin-transform-runtime`模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

## let和const命令

### let命令

#### 基本语法

`let`是一个类似于*var*的命令，它也是用于声明变量的。但是`let`只有在代码块内部的时候才有效。也就是说，*let*只是用来声明局部变量的。这也就是说*let*声明的变量只有在代码块之内才有效，所以在使用某些方法的时候会出现一些不同的效果。

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

例如上面的代码，我们在*for*之内使用*let*，而它只在代码块之内有效，所以再进行打印的时候就相当于*()*之内是没有内容的，所以最后输出的是*6*。

>* *let* 不存在变量提升我们必须要在使用之前声明，否则会报错。
>* *let* 不允许重复声明。
>* ​

**暂时性死区**

上面我们说了*let*不存在变量提升，这就代表了我们在使用let的变量的时候就必须先声明它，然后再去调用，这就是我们所谓的`暂时性死区`。

需要注意的一点是，由于*let*的出现我们所使用的*typeof*也出现了一些变化，之前我们使用typeof的时候如果在声明之前使用它，打印出*undefined*但是，如果现在我们使用*let*的话就会报错。

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

实际上在之前就有暂时性死区，只不过比较少出现，例如上面的例子，由于参数`x`默认值等于另一个参数`y`，而此时`y`还没有声明，属于”死区“。如果`y`的默认值是`x`，就不会报错，因为此时`x`已经声明了。

### 块级作用域

ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。

```javascript
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}

f(); // undefined
```

上面代码中，函数f执行后，输出结果为`undefined`，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

第二种场景，用来计数的循环变量泄露为全局变量。

```javascript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

#### ES6的块级作用域

`let`实际上为JavaScript新增了块级作用域。它只在代码块中可以使用在代码块之外是无法读取到的。

实际上ES6中对块级作用域最大的改变是*可以在块级作用域中声明函数*在之前，函数是不可以在会计作用域中声明的，一旦我们使用了严格模式如此编写就会报错。

但是在ES6中我们可以在块级作用域中直接声明函数，它类似于*let*，同理，在代码块之外我们声明的函数就是不可用的。

```javascript
//ES5
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();  //I am inside!
}());

//ES6
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();  //I am outside!
}());
```

在上面的代码中第一部分在使用的时候实际上是第二次声明的*f()*被提升带了*if()*之外。而第二次则是直接忽略了*f()*。

不过同样的，这种行为差异会对浏览器和代码产生很大的影响，所以在*ES6*中规定了，浏览器的实现可以有自己的行为方式。

> * 允许在块级作用域内声明函数。
> * 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
> * 同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对ES6的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作`let`处理。

### const命令

`const`声明的是一个只读的常量，一旦声明就不能改变。另外，常量一点生命就必须立即初始化，不能留作以后添加。

`const`只在所声明的代码块之内有效。没有变量提升，存在暂时性死区以及必须先声明在使用，同时不能重复声明。它的这些特性与*let*一样。

*const*在声明复合型变量的时候变量名不指向数据，而是指向数据所在的地址。*const*命令只保证变量名指向的地址不变，而不保证该地址的数据不变。

### 全局对象的属性

全局对象是最顶层的对象，在浏览器环境指的是`window`对象，在Node.js指的是`global`对象。ES5之中，全局对象的属性与全局变量是等价的。但是在ES6中对此做了修改，ES6中新规定的*let*、*const* 、 *class*这些命令声明的全局变量，将不再属于全局对象的属性。也就是说，在ES6中全局属性和全局对象的属性不在挂钩。

## 变量的解构赋值

解构赋值有很多种

> * 数组的解构赋值
> * 对象的解构赋值
> * 字符串的解构赋值
> * 数值和布尔值的解构赋值
> * 函数参数的解构赋值

### 数组的解构赋值

**基本用法**

从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

那么什么是解构赋值：

```javascript
var [a, b, c] = [1, 2, 3];
```

上面的就是解构赋值，是在*ES6*中一种新的赋值方式，我们可以用数组的形式直接给变量赋值，当然了前提是必须两边的结构是一样的。而如果赋值失败的话返回的则是*undefined*。

```javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];  // 1 2 3
let [x, y] = [1, 2, 3];   // 1 2
```

另外就是还有一直是不完全解构，就死左边需要赋值的变量要比右边的变量值少，

对于Set结构，也可以使用数组的解构赋值。

```javascript
let [x, y, z] = new Set(["a", "b", "c"]);
x // "a"
```

事实上，只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。

```javascript
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

上面代码中，`fibs`是一个Generator函数，原生具有Iterator接口。解构赋值会依次从这个接口获取值。

**默认值**

解构赋值允许指定默认值。

```javascript
var [foo = true] = [];
foo // true

[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

在我们进行赋值的时候，如果变量已经有默认值的话，再次赋值就会将其覆盖掉，如果我们需要继续使用默认值，我们其相对于数组的位置上使用*undefined*，这样就会赋值失败，继续使用默认值。

```javascript
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```

如果默认值是一个表达式，那么这个表达式就是惰性的，只有在用到的时候才会求值。

### 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

```javascript
var { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

上面的是一一对应的，如果变量名与属性名不一致，必须携程下面这样：

```javascript
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。

```javascript
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```javascript
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

上面代码中，真正被赋值的是变量`baz`，而不是模式`foo`。另外，解构赋值的变量都会重新声明，所以如果使用*let*或者*const*的话会报错。

这时候需要写成：

```javascript
let foo;
({foo} = {foo: 1}); // 成功
```

再加上一对括号之后，下面的赋值行为代码块，而不是赋值语句，当然了还是可以复制成功的。

和数组一样，解构也可以用于嵌套结构的对象。

```javascript
var obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

var { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

注意，这时`p`是模式，不是变量，因此不会被赋值。

```javascript
var node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

var { loc: { start: { line }} } = node;
line // 1
loc  // error: loc is undefined
start // error: start is undefined
```

上面代码中，只有`line`是变量，`loc`和`start`都是模式，不会被赋值。

### 字符串的解构赋值

字符串也可以进行解构赋值，当然了实际上JS是将字符串转换成为一个类似数组的对象然后再去赋值。

```javascript
const [a, b , c , d , e ] = "hello";
// 返回 h , e , l , l , o
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量`s`都能取到值。

解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

```javascript
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 函数参数的解构赋值

函数的参数也可以使用解构赋值。

```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

上面代码中，函数`add`的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量`x`和`y`。对于函数内部的代码来说，它们能感受到的参数就是`x`和`y`。

下面是另一个例子。

```javascript
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```

函数参数的解构也可以使用默认值。

```javascript
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上面代码中，函数`move`的参数是一个对象，通过对这个对象进行解构，得到变量`x`和`y`的值。如果解构失败，`x`和`y`等于默认值。

注意，下面的写法会得到不一样的结果。

```javascript
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面代码是为函数`move`的参数指定默认值，而不是为变量`x`和`y`指定默认值，所以会得到与前一种写法不同的结果。

`undefined`就会触发函数参数的默认值。

```javascript
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

### 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。



**不能使用圆括号的情况**

> 1. 变量声明语句中，不能带有圆括号。
> 2. 涵涵素参数中，模式不能带有圆括号。
> 3. 赋值语句中，不能将整个模式，或者嵌套模式中的一层，放在圆括号之中。

```javascript
var [(a)] = [1];

function f([(z)]) { return z; }

({ p: a }) = { p: 42 };

[({ p: a }), { x: c }] = [{}, {}];

//以上全部报错
```



**可以使用圆括号的情况**

可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```javascript
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。

### 用途

解构赋值有很多用途

> 1. 交换变量的值。
> 2. 从函数中返回多个值，如果函数的结果是多个值得话只能以数组或对象形式出现，所以解构赋值可以很方便的起出来。
> 3. 定义函数的参数。
> 4. 提取JSON数据
> 5. 函数参数的默认值
> 6. 函数参数的默认值，可以直接指定参数的默认值，避免在函数内部重写。
> 7. 输入模块的制定方法







