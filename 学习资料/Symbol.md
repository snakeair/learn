# Symbol

首先，这是一种新的数据类型，是第七种，前六种分别是：undefined、null、布尔值、字符串、数值、对象。

Symbol值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```javascript
let s =Symbol();
typeof s;  // Symbol
```

`Symbol`不能使用*new*命令，否则会报错。

> 1. `Symbol`是独一无二得知，即使名称内容一样，使用全等符也是返回*false*。
> 2. `Symbol`可以接受一个字符串作为参数，也可以转为字符串。
> 3. `Symbol`可以转为布尔值，但是不能转为数值。

### 作为属性名的Symbol

首先我们已经知道了`Symbol`是一个独一无二得值，所以，我们就可以将`Symbol`作为一个唯一标识符来作为属性名，这样就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```javascript
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

以上为`Symbol`的赋值方法。注意，Symbol值最为对象属性名时，不能使用点运算符。

在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。

```javascript
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);
```

上面代码中，如果`s`不放在方括号中，该属性的键名就是字符串`s`，而不是`s`所代表的那个Symbol值。

`Symbol`可以声明一组常量，保证这组常量的值都是不等的，最后需要*注意*：`Symbol`值最为属性名时，该属性是公开属性，不是私有的。

### 实例：消除魔术字符串

所谓的魔术字符串，就是值在代码之中多次出现、与代码形成高强耦合的某一个具体的字符串或者数值。良好的代码应该尽量减少魔术字符串。

```javascript
function getArea(shape, options) {
  var area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```

以上代码中的*Triangle*就是一个魔术字符串。一般情况下，消除魔术字符串的方式就是将其写成一个变量。

```javascript
var shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  var area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

上面代码中，我们把“Triangle”写成`shapeType`对象的`triangle`属性，这样就消除了强耦合。

如果仔细分析，可以发现`shapeType.triangle`等于哪个值并不重要，只要确保不会跟其他`shapeType`属性的值冲突即可。因此，这里就很适合改用Symbol值。

```javascript
const shapeType = {
  triangle: Symbol()
};
```

上面代码中，除了将`shapeType.triangle`的值设为一个Symbol，其他地方都不用修改。

### 属性的遍历

Symbol作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有Symbol属性名。

`Object.getOwnPropertySymbols`方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值。

```javascript
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

下面是另一个例子，`Object.getOwnPropertySymbols`方法与`for...in`循环、`Object.getOwnPropertyNames`方法进行对比的例子。

```
var obj = {};

var foo = Symbol("foo");

Object.defineProperty(obj, foo, {
  value: "foobar",
});

for (var i in obj) {
  console.log(i); // 无输出
}

Object.getOwnPropertyNames(obj)
// []

Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]

```

上面代码中，使用`Object.getOwnPropertyNames`方法得不到`Symbol`属性名，需要使用`Object.getOwnPropertySymbols`方法。

另一个新的API，`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和Symbol键名。

```javascript
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
// [Symbol(my_key), 'enum', 'nonEnum']
```

由于以Symbol值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

```javascript
var size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

var x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```

上面代码中，对象x的size属性是一个Symbol值，所以`Object.keys(x)`、`Object.getOwnPropertyNames(x)`都无法获取它。这就造成了一种非私有的内部方法的效果。







