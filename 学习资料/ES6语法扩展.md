# ES6语法扩展

## 字符串扩展

### 字符串判断

在ES6中又添加了三个用来检索控制字符串的方法，分别是：

> * includes(): 返回布尔值，表示是否能够找到参数字符串。
> * startsWith(): 返回布尔值，表示参数是否在源字符串头部。
> * endsWith(): 返回布尔值，表示参数是否在字符串尾部。

这三个方法还可以接受第二个参数：*includes  && startsWith*表示从第几*n*个位置开始；*endsWith*表示计算字符串的前*n*个元素。

```javascript
var s = 'Hello world!';

s.includes('Hello', 6) // false
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
```

### 字符串操作

**repeat()**

`repeat`返回新字符串并返回*n*次。

```javascript
'hello'repeat(2)  //hellohello
```

传入参数必须是正整数，

> 1. 如果传入负值或者*Infinity*会报错，如果传入小数则会取整。
> 2. 如果出传入*0* 或者 *NaN*则返回一个空字符串。
>
> 3. 如果传入的参数为字符串的则会先转换成为数字。



**padStart() && padEnd()**

这两个是ES7退出的属性，表示判断字符串的长度，如果长度不够则会在其头部或者尾部补齐。

```javascript
 'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'xxxxxxxxxx 
```

> 1. 如果字符串长度等于或者大于判断的数值的话返回源字符串；
> 2. 如果字符串长度加上用来补全的参数超过指定长度的话从左边开始截取指定参数；
> 3. 如果没有指定补全内容的话会默认使用空格进行补全。

### 输出模板

传统的字符串输出很繁琐，在ES6中重新规定了字符串输出的问题：

```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

`模板字符串`是增强版的字符串输出，用*`*反引号标示，可以同时输出多行字符串，同时还可以在字符串中嵌入变量。

```javascript
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

上面的例子中给模板字符嵌入了变量， 变量可以传入我们需要传入的信息，同时还可以传入函数，在进行输出的时候会按照一定规则转换为字符串，如果传入的是对象，则默认调用*toString*方法。

但是，如果模版字符串中的变量没有生命的话，JS会报错。

另外我们还可以在模板字符串的变量中再次嵌入其他变量：

```javascript
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```

如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。

```javascript
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"

// 写法二
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack') // "Hello Jack!"
```

**标签模板**

模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。

```javascript
alert`123`
// 等同于
alert(123)
```

标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

```javascript
var a = 5;
var b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

上面代码中，模板字符串前面有一个标识名`tag`，它是一个函数。整个表达式的返回值，就是`tag`函数处理模板字符串后的返回值。

如果上面的函数要执行的话就需要我们在去编写一个*tag*函数：

```javascript
function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return "OK";
}

// "Hello " , " world " , "" , 15 , 50 , "OK"
```

从某种意义上来说标签模板是一个另类的函数调用。

标签模板的另外一个作用就是过滤html字符串，防止用户恶意注入：

```javascript
var sender = '<script>alert("abc")</script>'; // 恶意代码
var message = SaferHTML`<p>${sender} has sent you a message.</p>`;

var message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```

以上就是一种防止恶意注入的方式，用户的输入信息会在*message*中进行转义，然会存储。

### String.raw()

ES6还为原生的String对象，提供了一个`raw`方法。

`String.raw`方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

```javascript
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'
```

如果原字符串的斜杠已经转义，那么`String.raw`不会做任何处理。

```javascript
String.raw`Hi\\n`
// "Hi\\n"
```

`String.raw`的代码基本如下。

```javascript
String.raw = function (strings, ...values) {
  var output = "";
  for (var index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
```

`String.raw`方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

`String.raw`方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有`raw`属性的对象，且`raw`属性的值应该是一个数组。

```javascript
String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'

// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
```

## 正则扩展

### RegExp构造函数

在ES5中，RegExp构造函数的参数有两种情况。

第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。

```javascript
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
```

第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。

```javascript
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;
```

但是，ES5不允许此时使用第二个参数，添加修饰符，否则会报错。

```javascript
var regex = new RegExp(/xyz/, 'i');
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
```

ES6改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

```javascript
new RegExp(/abc/ig, 'i').flags
// "i"
```

上面代码中，原有正则对象的修饰符是`ig`，它会被第二个参数`i`覆盖。

### 字符串的正则方法

字符串对象共有4个方法，可以使用正则表达式：`match()`、`replace()`、`search()`和`split()`。

ES6将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。

> * ``String.prototype.match`` 调用 `RegExp.prototype[Symbol.match]`
> * `String.prototype.replace` 调用 `RegExp.prototype[Symbol.replace]`
> * `String.prototype.search` 调用 `RegExp.prototype[Symbol.search]`
> * `String.prototype.split` 调用 `RegExp.prototype[Symbol.split]`

### U字符

ES6中添加了`u`修饰符，表示”Unicode牧师“，用来处理大于*\uFFFF*的字符。会正确处理四个字节的UTF-16编码。

**点字符**

点（`.`）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于`0xFFFF`的Unicode字符，点字符不能识别，必须加上`u`修饰符。

```javascript
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true
```

上面代码表示，如果不添加`u`修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。

**Unicode字符表示法**

在ES6中可以使用大括号表示Unicode字符，但是这种表达方式必须加上*u*修饰符才能识别。

```javascript
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
```

上面代码表示，如果不加`u`修饰符，正则表达式无法识别`\u{61}`这种表示法，只会认为这匹配61个连续的`u`。

**量词**

使用`u`修饰符后，所有量词都会正确识别码点大于`0xFFFF`的Unicode字符。

```
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true

```

另外，只有在使用`u`修饰符的情况下，Unicode表达式当中的大括号才会被正确解读，否则会被解读为量词。

```
/^\u{3}$/.test('uuu') // true

```

上面代码中，由于正则表达式没有`u`修饰符，所以大括号被解读为量词。加上`u`修饰符，就会被解读为Unicode表达式。

**预定义模式**

`u`修饰符也影响到预定义模式，能否正确识别码点大于`0xFFFF`的Unicode字符。

```
/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true

```

上面代码的`\S`是预定义模式，匹配所有不是空格的字符。只有加了`u`修饰符，它才能正确匹配码点大于`0xFFFF`的Unicode字符。

利用这一点，可以写出一个正确返回字符串长度的函数。

```
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2

```

**i修饰符**

有些Unicode字符的编码不同，但是字型很相近，比如，`\u004B`与`\u212A`都是大写的K。

```
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true

```

上面代码中，不加`u`修饰符，就无法识别非规范的K字符。

### y修饰符

先说一下*g*修饰符，*g*在正则中表示匹配剩余的位置。`y`的作用与*g*类似，但是不同的俄式，*g*会默认直接从第二次符合的位置开始进行匹配而忽略与第一个中间多余的字符串，而`y`则是从上一次匹配成功的后一位开始进行匹配。

```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]  匹配的内容是'aa_a'
r2.exec(s) // null    匹配的内容是'_aa_a'
```

另外，我们发现第二次使用*r2*的时候匹配错误，正常情况下应该是可以匹配到的，但是却输出了*null*。

实际上，在`y`修饰符默认调用了头部匹配表示*^*，所以，我们在第二次进行匹配的时候报错。

**split**

在`split`方法中使用`y`修饰符，原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。

```javascript
// 没有找到匹配
'x##'.split(/#/y)
// [ 'x##' ]

// 找到两个匹配
'##x'.split(/#/y)
// [ '', '', 'x' ]
```

后续的分隔符只有紧跟前面的分隔符，才会被识别。

```javascript
'#x#'.split(/#/y)
// [ '', 'x#' ]

'##'.split(/#/y)
// [ '', '', '' ]
```

**replace**

```javascript
const REGEX = /a/gy;
'aaxa'.replace(REGEX, '-') // '--xa'
```

面代码中，最后一个`a`因为不是出现下一次匹配的头部，所以不会被替换。

**match**

`y`修饰符在使用*match*的时候只能返回第一个匹配值，只有在与*g*连用的时候才能返回所有匹配值。

**sticky**

表示是否设置了`y`修饰符。

### flags属性

ES6新增属性，返回正则表达式的修饰符。



## 数值扩展

### 新方法

**Number.isFinite()  &&   Number.isNaN()**

`Number.isFinite()`用来检测一个数值是否有限（finite），而`Number.isNaN()`则是判断一个值是否是*NaN*。

在ES5中我们也可以部署`isFinite`和`isNaN`方法：

```javascript
(function (global) {
  var global_isFinite = global.isFinite;

  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);

(function (global) {
  var global_isNaN = global.isNaN;

  Object.defineProperty(Number, 'isNaN', {
    value: function isNaN(value) {
      return typeof value === 'number' && global_isNaN(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

两个新属性与传统的全局方法`isFinite()`和`isNaN()`的区别在于，传统方法先调用`Number()`将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回`false`。

**Number.parseInt()   &&   Number.parseFloat()**

这两个属性被移植到Number上，用来减少全局方法，是JS更加模块化。

```javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

**Number.isInteger()**

用来判断一个值是否是整数。另外，在JS中整数和浮点数的存储方式是一样的所以*3* 和*3.0*是相等的。

```javascript
(function (global) {
  var floor = Math.floor,
    isFinite = global.isFinite;

  Object.defineProperty(Number, 'isInteger', {
    value: function isInteger(value) {
      return typeof value === 'number' && isFinite(value) &&
        value > -9007199254740992 && value < 9007199254740992 &&
        floor(value) === value;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

以上是在ES5中实现`Number.isInteger()`方法的函数。

**Number.EPSILON**

首先这是一个常量。

```javascript
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// '0.00000000000000022204'
```

可以看到这是一个很小的浮点数，要知道浮点数在计算的时候会有一定的误差，在ES6中设置这个常量就是来判定浮点数的，我们获得的浮点数误差低于这个常量的时候就默认得到了正确的结果。

**安全整数和Numer.isSafeInteger()**

JavaScript能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值。

```javascript
Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1
// true

Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false
```

上面代码中，超出2的53次方之后，一个数就不精确了。

ES6引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。

`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内。

这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。

```javascript
Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}
```

实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。

```javascript
Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003
```

### Math对象的扩展

ES6在Math对象上新增了17个与数学相关的方法。所有这些方法都是静态方法，只能在Math对象上调用。

**Math.trunc()**

用于除去一个数字的小数部分，返回整数部分

```javascript
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
```

对于非数值和控制返回NaN。

**Math.sign()**

用于判断一个数值是正数、负数或者0。

>* 参数为正数，返回+1；
>* 参数为负数，返回-1；
>* 参数为0，返回0；
>* 参数为-0，返回-0;
>* 其他值，返回NaN。

对于没有部署这个方法的环境，可以用下面的代码模拟。

```javascript
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};
```

**Math.cbrt()**

用于计算一个数的立方根。

```javascript
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734
```

对于非数值，`Math.cbrt`方法内部也是先使用`Number`方法将其转为数值。

```javascript
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
```

对于没有部署这个方法的环境，可以用下面的代码模拟。

```javascript
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};
```

**Math.clz32()**

JavaScript的整数使用32位二进制形式表示，`Math.clz32`方法返回一个数的32位无符号整数形式有多少个前导0。

```javascript
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
```

上面代码中，0的二进制形式全为0，所以有32个前导0；1的二进制形式是`0b1`，只占1位，所以32位之中有31个前导0；1000的二进制形式是`0b1111101000`，一共有10位，所以32位之中有22个前导0。

`clz32`这个函数名就来自”count leading zero bits in 32-bit binary representations of a number“（计算32位整数的前导0）的缩写。

左移运算符（`<<`）与`Math.clz32`方法直接相关。

```javascript
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2
```

对于小数，`Math.clz32`方法只考虑整数部分。

```javascript
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
```

对于空值或其他类型的值，`Math.clz32`方法会将它们先转为数值，然后再计算。

```javascript
Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31
```

**Math.imul()**

`Math.imul`方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。

```javascript
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4
```

如果只考虑最后32位，大多数情况下，`Math.imul(a, b)`与`a * b`的结果是相同的，即该方法等同于`(a * b)|0`的效果（超过32位的部分溢出）。之所以需要部署这个方法，是因为JavaScript有精度限制，超过2的53次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，`Math.imul`方法可以返回正确的低位数值。

```javascript
(0x7fffffff * 0x7fffffff)|0 // 0
```

上面这个乘法算式，返回结果为0。但是由于这两个二进制数的最低位都是1，所以这个结果肯定是不正确的，因为根据二进制乘法，计算结果的二进制最低位应该也是1。这个错误就是因为它们的乘积超过了2的53次方，JavaScript无法保存额外的精度，就把低位的值都变成了0。`Math.imul`方法可以返回正确的值1。

```javascript
Math.imul(0x7fffffff, 0x7fffffff) // 1
```

**Math.fround()**

返回一个数的单精度浮点数形式。

```javascript
Math.fround(1.337) // 1.3370000123977661
Math.fround(1.5)   // 1.5
Math.fround(NaN)   // NaN
```

**Math.hypot()**

返回所有参数的平方和的平方根。

```javascript
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
```

**对数方法**

ES6新增了4个对数方法

> * Math.expm1()： 返回返回ex - 1，即`Math.exp(x) - 1`。
> * `Math.log1p(x)`：返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果`x`小于-1，返回`NaN`。
> * `Math.log10(x)`返回以10为底的`x`的对数。如果`x`小于0，则返回NaN。
> * `Math.log2(x)`返回以2为底的`x`的对数。如果`x`小于0，则返回NaN。
>

**三角函数**

ES6新增了6个三角函数方法

> - `Math.sinh(x)` 返回`x`的双曲正弦（hyperbolic sine）
> - `Math.cosh(x)` 返回`x`的双曲余弦（hyperbolic cosine）
> - `Math.tanh(x)` 返回`x`的双曲正切（hyperbolic tangent）
> - `Math.asinh(x)` 返回`x`的反双曲正弦（inverse hyperbolic sine）
> - `Math.acosh(x)` 返回`x`的反双曲余弦（inverse hyperbolic cosine）
> - `Math.atanh(x)` 返回`x`的反双曲正切（inverse hyperbolic tangent）

**指数运算符**

ES7新增了一个指数运算符（`**`），目前Babel转码器已经支持。

```javascript
2 ** 2 // 4
2 ** 3 // 8
```

指数运算符可以与等号结合，形成一个新的赋值运算符（`**=`）。

```javascript
let a = 2;
a **= 2;
// 等同于 a = a * a;

let b = 3;
b **= 3;
// 等同于 b = b * b * b;
```

## 数组的扩展

### Array.from()

`Array.from()`用于将两类对象转为数组：类似数组的对象和可遍历的对象（包括Set和Map）。

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

上面就是将一个对象转为数组的方法，使用`Array.from()`会更加简洁。

实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的`arguments`对象。`Array.from`都可以将它们转为真正的数组。

```javascript
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```

上面代码中，`querySelectorAll`方法返回的是一个类似数组的对象，只有将这个对象转为真正的数组，才能使用`forEach`方法。

只要是部署了Iterator接口的数据结构，`Array.from`都能将其转为数组。

```javascript
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
```

上面代码中，字符串和Set结构都具有Iterator接口，因此可以被`Array.from`转为真正的数组。

如果参数是一个数组则返回一个一模一样的数组。另外，如果使用扩展运算符（*. . .*）也可以将某些数据结构转为数组。

扩展运算符实际上是调用了遍历器接口*Symbol.iterator*，如果一个对象没有部署这个接口，就无法展缓。`Array.from`支持类似数组的对象，什么是类似数组，就是其属性中包含`length`属性。因此，任何有*length*属性的对象，都可以通过`Array.from`来转为数组，额这个时候扩展运算符就无法转换。

```javascript
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```

另外，`Array.from()`还可以接收第二个参数，作用类似于数组的*map*方法：对每份元素进行处理，然后再返回。

```javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
```

如果*map*里面的参数用到了*this*关键字，还可以传入第三个参数，用来绑定*this*。

```javascript
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
```

`Array.from()`的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于`\uFFFF`的Unicode字符，算作两个字符的bug。

```javascript
function countSymbols(string) {
  return Array.from(string).length;
}
```

### Array.of()

`Array.of`方法用于将一组值，转换为数组。

```javascript
Array.of(3, 11, 8) // [3,11,8]

Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

如上面的代码，在ES5中我们直接使用*Array*来处理数组，但是传入的个数不同会造成其结果也不同。而我们使用`Array,of()`则不论传入多少参数其行为都是统一的。

### 数组实例的

**copyWithin()**

`copyWithin()`方法，是在当前数组内部，将指定位置的成员复制到其他位置，然后返回当前数组。这个方法会修改房钱数组。

```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

> 1. target（必需）：从该位置开始替换数据。
> 2. start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
> 3. end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

它可以就收三个参数，且这三个参数都是数字，如果不是则会自行转为数值。

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```

**find()  &&  findIndex()**

先说一下`find()`，它表示在数组内部搜索一个复合条件的成员，如果符合条件返回*true*，如果不则返回*undefined*。而`findIndex()`则是查询复合条件的数组的位置，符合条件返回其位置，没有返回*-1*。

两个方法都是接受一个回调函数作为参数，而回调函数可以接受三个参数：*当前值、位置、原数组*。

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
```

**fill()**

`fill`方法使用给定值，填充一个数组。

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]
```

`fill`方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

```

上面代码表示，`fill`方法从1号位开始，向原数组填充7，到2号位之前结束。

**entries()  &&  keys()  &&  values()**
这三个方法都是用于遍历数组的。他们都返回一个遍历器对象，可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

**includes()**

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。该方法属于ES7，但Babel转码器已经支持。

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true
```

`includes()`可以接收两个参数，第一个是查询的值，第二个是开始的位置，如果第二个参数是负值的话表示从后开始查询，如果第二个参数大于数组的长度的话会继续默认从0开始查询。

实际上在ES5中我们有，*indexOf*来实现这个功能，但是*indexOf*其内部调用的是*===*所以在匹配NaN的时候就会出现误判，而使用`inculdes`则不会出现这种现象。

另外，Map和Set数据结构有一个`has`方法，需要注意与`includes`区分。

- Map结构的`has`方法，是用来查找键名的，比如`Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
- Set结构的`has`方法，是用来查找值的，比如`Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。

### 数组的空位

首先我们要明确一点——空位不是*undefined*。undefined也是一个值。

但是，在ES5中各个方法对空位的处理完全不同，大多数情况下会忽略空位，但是，也有别的现象。而到了ES6，JS则明确的将空位转为了*undefined*来进行处理。但是在某些方法中也会去有其他的现象出现，所以在使用的时候尽量不要出现*空位*。

## 函数的扩展

### 函数默认值

首先一点，在ES6中允许为函数参数指定默认值，这一点在前我们已经说到过。至于为什么可以直接指定默认参数：我们在阅读代码的时候可以更加方便易懂，同时，有利于将来的代码优化。

注意：变量参数是默认声明，所以不能使用*let*和*const*来再次声明。另外，如果在使用默认值的时候出现需要直接调用默认值的话，不能传入空值或者不传值，需要在调用默认值的位置上写入*undefined*来调用。

在指定了默认值之后，函数的额*length*属性将返回没有指定默认值的参数的，也就是说，指定默认值之后，*length*属性失真。

```javascript
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

另外需要注意一点，如果设置默认值的不是最后一个参数，而其之后的参数有没有设置默认值的话，*length*也不会计入其后面的参数。

**作用域**

首先需要注意的一点是：如果参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则是一样的，即先是当前函数的作用域，然后才是全局作用域。

```javascript
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```

上面代码中，参数*y*的默认值等于*x*。调用时，由于函数作用域内部的变量*x*已经生成，所以*y*等于参数*x*，而不是全局变量*x*。

```javascript
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```

上面的代码中，由于*x*没有在函数内部生成，所以在函数内部的*x*指向了全局变量*1*。如果*x*没有在外部生成，那么函数会报错，虽然在内部使用了*let*声明*x*，但是*x*出现于*let*前。

如果参数的默认值是一个函数，该函数的作用域是其声明时所在的作用域。

```javascript
let foo = 'outer';

function bar(func = x => foo) {
  let foo = 'inner';
  console.log(func()); // outer
}

bar();
```

上面代码中，函数`bar`的参数`func`的默认值是一个匿名函数，返回值为变量`foo`。这个匿名函数声明时，`bar`函数的作用域还没有形成，所以匿名函数里面的`foo`指向外层作用域的`foo`，输出`outer`。

下面是一个更复杂的例子。

```javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
```

上面代码中，函数`foo`的参数`y`的默认值是一个匿名函数。函数`foo`调用时，它的参数`x`的值为`undefined`，所以`y`函数内部的`x`一开始是`undefined`，后来被重新赋值`2`。但是，函数`foo`内部重新声明了一个`x`，值为`3`，这两个`x`是不一样的，互相不产生影响，因此最后输出`3`。

如果将`var x = 3`的`var`去除，两个`x`就是一样的，最后输出的就是`2`。

```javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
```

**应用**

利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

```javascript
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter
```

上面代码的`foo`函数，如果调用的时候没有参数，就会调用默认值`throwIfMissing`函数，从而抛出一个错误。

从上面代码还可以看到，参数`mustBeProvided`的默认值等于`throwIfMissing`函数的运行结果（即函数名之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在运行时执行（即如果参数已经赋值，默认值中的函数就不会运行），这与python语言不一样。

另外，可以将参数默认值设为`undefined`，表明这个参数是可以省略的。

```javascript
function foo(optional = undefined) { ··· }
```

**reset**

ES6引入rest参数（形式为*...变量名*），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。要注意一点，*rest*前面可以有其他参数，但是在*rest*之后不能出现其他参数。

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

上面代码的add函数是一个求和函数，利用rest参数，可以向该函数传入任意数目的参数。另外，*rest*参数中的标量代表一个数组，所以，数组的方法都可以用于这个变量。

### 扩展运算符

**. . . **

扩展运算符（spread）是三个点（`...`）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
```

该运算符主要用于函数调用。

```javascript
function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y;
}

var numbers = [4, 38];
add(...numbers) // 42
```

扩展运算符与正常的函数参数可以结合使用，非常灵活。

```javascript
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

在ES5中我们使用*apply*来将函数的参数处理为数组，而在ES6中有了扩展运算符，所以我们可以直接使用扩展运算符，而且，我们使用扩展运算符更加简洁易懂

```javascript
// ES5的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);
// ES6的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f(...args);


// ES5的写法
Math.max.apply(null, [14, 3, 77])
// ES6的写法
Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77);
```

上面的代码就是扩展运算符代替*apply*的例子之一。

#### 扩展运算符的应用

**合并数组**

扩展运算符提供了数组合并的新写法。

```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

**与解构赋值结合实用**

扩展运算符可以与解构赋值结合起来，用于生成数组。

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []:

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```

**函数的返回值**

在常规的函数中只有一个返回值，如果需要返回多个值的话只能返回对象或者数组，而现在可以直接返回一个扩展运算符构成的数据。

```javascript
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```

上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数`Date`。

**字符串**

扩展运算符可以将字符串转为真正的数组

```javascript
[...'hello']
// ['h' , 'e' , 'l' , 'l' , 'o']
```

**实现了Iterator接口的对象**

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。

```javascript
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```

上面代码中，`querySelectorAll`方法返回的是一个`nodeList`对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于`NodeList`对象实现了Iterator接口。

但是如果一个对象没有部署*Iterator*接口我们就是用扩展运算符的话就会报错。

**Map和Set结构，Generator函数**

扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。

```javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```

Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

```javascript
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```

上面代码中，变量`go`是一个Generator函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

如果对没有`iterator`接口的对象，使用扩展运算符，将会报错。

```javascript
var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

### name属性

函数的*name*属性，返回该函数的函数名。

```javascript
function foo(){}
foo.name  //foo
```

实际上这个属性在ES5中已经有了，但是知道ES6中才正式写入标准，但是在ES5中的表现和ES6中有所不同

> * 如果函数是一个匿名函数，*name*在ES5中返回空，在EE6中返回函数名；
> * 如果函数赋值给一个变量，*name*都会返回原函数名。
> * 在构造函数中返回的函数实例中，*name*属性为“anonymous"
> * *bind*返回的函数，name属性值回家上”bound“前缀

### 箭头函数

ES6中函数最大的改变就是允许箭头*=>*来定义函数。在之前我们已经使用过了*=>*。

```javascript
var f =v => v;

var f = function(){
	return v;
}
```

以上两个函数是相等的。

> 1. 如果函数没有参数或者有多个参数，就是用一个括号来表示参数部分
> 2. 如果*=>*代码块部分多余一条语句就要使用大括号括起来，同时使用*return*返回。
> 3. 如果*=>*返回的是一个对象，则必须在外部加上一个括号，因为大括号被解释为代码块。

```javascript
var f = () => 5;
var sum = (num1, num2) => num1 + num2;

var sum = (num1, num2) => { return num1 + num2; }

var getTempItem = id => ({ id: id, name: "Temp" });
```

在编写复杂的函数的时候我们可能没有办法使用*=>*因为这会在成阅读上的障碍，但是在处理简易的工具函数或者回调函数的时候会更好一些。

```javascript
const isEven = n => n % 2 == 0;
const square = n => n * n;

[1,2,3].map(x => x * x);

var result = values.sort((a, b) => a - b);

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```

以上代码的最后一个例子是*rest*与*=>*的结合。
**注意事项**

> 1. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
> 2. 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
> 3. 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
> 4. 不可以使用`yield`命令，因此箭头函数不能用作Generator函数。

```javascript
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
```

上面代码中，`setTimeout`的参数是一个箭头函数，这个箭头函数的定义生效是在`foo`函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时`this`应该指向全局对象`window`，这时应该输出`21`。但是，箭头函数导致`this`总是指向函数定义生效时所在的对象（本例是`{id: 42}`），所以输出的是`42`。

箭头函数可以让`setTimeout`里面的`this`，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。

```javascript
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
```

上面代码中，`Timer`函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的`this`绑定定义时所在的作用域（即`Timer`函数），后者的`this`指向运行时所在的作用域（即全局对象）。所以，3100毫秒之后，`timer.s1`被更新了3次，而`timer.s2`一次都没更新。

箭头函数可以让`this`指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM事件的回调函数封装在一个对象里面。

```javascript
var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};
```

上面代码的`init`方法中，使用了箭头函数，这导致这个箭头函数里面的`this`，总是指向`handler`对象。否则，回调函数运行时，`this.doSomething`这一行会报错，因为此时`this`指向`document`对象。

`this`指向的固定化，并不是因为箭头函数内部有绑定`this`的机制，实际原因是箭头函数根本没有自己的`this`，导致内部的`this`就是外层代码块的`this`。正是因为它没有`this`，所以也就不能用作构造函数。

所以，箭头函数转成ES5的代码如下。

```javascript
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

上面代码中，转换后的ES5版本清楚地说明了，箭头函数里面根本没有自己的`this`，而是引用外层的`this`。

请问下面的代码之中有几个`this`？

```javascript
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```

上面代码之中，只有一个`this`，就是函数`foo`的`this`，所以`t1`、`t2`、`t3`都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的`this`，它们的`this`其实都是最外层`foo`函数的`this`。

除了`this`，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`。

```javascript
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
```

上面代码中，箭头函数内部的变量`arguments`，其实是函数`foo`的`arguments`变量。

另外，由于箭头函数没有自己的`this`，所以当然也就不能用`call()`、`apply()`、`bind()`这些方法去改变`this`的指向。

```javascript
(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']
```

上面代码中，箭头函数没有自己的`this`，所以`bind`方法无效，内部的`this`指向外部的`this`。

长期以来，JavaScript语言的`this`对象一直是一个令人头痛的问题，在对象方法中使用`this`，必须非常小心。箭头函数”绑定”`this`，很大程度上解决了这个困扰。

**嵌套的箭头函数**

箭头函数内部，还可以再使用箭头函数。下面是一个ES5语法的多重嵌套函数。

```javascript
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]
```

上面这个函数，可以使用箭头函数改写。

```javascript
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]
```

下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。

```javascript
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12
```

如果觉得上面的写法可读性比较差，也可以采用下面的写法。

```javascript
const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12
```

箭头函数还有一个功能，就是可以很方便地改写λ演算。

```javascript
// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
```

上面两种写法，几乎是一一对应的。由于λ演算对于计算机科学非常重要，这使得我们可以用ES6作为替代工具，探索计算机科学。

### 函数绑定

函数绑定是在ES7中出提出的用来取代`call`、`apply`、`bind`调用。虽然该语法还是ES7的一个[提案](https://github.com/zenparsing/es-function-bind)，但是Babel转码器已经支持。

函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

```javascript
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```

### 尾调用优化

尾调用，就是在函数最后一步调用另外一个函数。

```javascript
 // 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
```

上面三种都不属于尾调用，前两种是在调用之后还有后续操作，而在最后一个，虽然调用之后没有其他操作，但是在JS中如果不进行输出的又一个默认的*return*

````javascript
function f(x){
  g(x);
  return undefined
}
````

#### 优化

尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```javascript
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f(x) 的调用帧，只保留 g(3) 的调用帧。

这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

```javascript
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```

上面的函数不会进行尾调用优化，因为内层函数`inner`用到了外层函数`addOne`的内部变量`one`。



`关于尾调用有很多其他信息，表示看不懂，之后再看`

连接地址[尾调用教程](http://es6.ruanyifeng.com/#docs/function#尾调用优化)

## 对象的扩展

### 属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```javascript
function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
```

CommonJS模块输出变量，就非常合适使用简洁写法。

```javascript
var ms = {};

function getItem (key) {
  return key in ms ? ms[key] : null;
}

function setItem (key, value) {
  ms[key] = value;
}

function clear () {
  ms = {};
}

module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};
```

#### 属性名表达式





