# JS学习——Object对象

## 概述

`Object`大多数时候是作为构造函数来使用的，它可以接受一个参数，如果该参数是一个对象，则返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象。

```javascript
var o1 = {a: 1};
var o2 = new Object(o1);
o1 === o2 // true

new Object(123) instanceof Number
// true
```

> * 注意，通过`new Object()`的写法生成新对象，与字面量的写法`o = {}`是等价的。

与其他构造函数一样，如果要在`Object`对象上面部署一个方法，有两种做法。

### 部署在Object对象本身

```javascript
Object.print = function(o){ console.log(o) };
```

### 部署在Object.prototype对象

所有构造函数都有一个`prototype`属性，用来指向一个原型对象。只要是定义在prototype上的属性和方法，会被所有实例共享。

## Object()

`Object`本身当作工具方法使用时，可以将任意值转为对象。这个方法常用于保证某个值一定是对象。

```javascript
Object() // 返回一个空对象
Object() instanceof Object // true

Object(undefined) // 返回一个空对象
Object(undefined) instanceof Object // true

Object(null) // 返回一个空对象
Object(null) instanceof Object // true

Object(1) // 等同于 new Number(1)
Object(1) instanceof Object // true
Object(1) instanceof Number // true

Object('foo') // 等同于 new String('foo')
Object('foo') instanceof Object // true
Object('foo') instanceof String // true

Object(true) // 等同于 new Boolean(true)
Object(true) instanceof Object // true
Object(true) instanceof Boolean // true
```

如果`Object`方法的参数是一个对象，它总是返回原对象。

```javascript
var arr = [];  / {}  /  arr = function(){}
Object(arr)  //返回原数组
Object(arr) === arr  //true
```

我们利用这一点可以判断变量是否是对象的函数

```javascript
function isObject(value) {
  return value === Object(value);
}

isObject([]) // true
isObject(true) // false
```

## Object 对象的静态方法

### Object.keys()，Object.getOwnPropertyNames()

以上两个方法类似，一般都是用于遍历对象的属性（自身属性，非继承），然后返回一个数组，区别是，`keys`只返回可枚举属性，而`getOwnPropertyNames`还返回不可枚举的属性。另，这两个方法返回的都是数组。

```javascript
var o = {
  p1: 123,
  p2: 456
};

Object.keys(o)
// ["p1", "p2"]

Object.getOwnPropertyNames(o)
// ["p1", "p2"]
```

另，我们可以在这两个方法的后面使用`length`来判断对象的长度。

## 其他方法

**（1）对象属性模型的相关方法**

> * Object.getOwnPropertyDescriptor()：获取某个属性的attributes对象。
> * Object.defineProperty()：通过attributes对象，定义某个属性。
> * Object.defineProperties()：通过attributes对象，定义多个属性。
> * Object.getOwnPropertyNames()：返回直接定义在某个对象上面的全部属性的名称。

**（2）控制对象状态的方法**

> * Object.preventExtensions()：防止对象扩展。
> * Object.isExtensible()：判断对象是否可扩展。
> * Object.seal()：禁止对象配置。
> * Object.isSealed()：判断一个对象是否可配置。
> * Object.freeze()：冻结一个对象。
> * Object.isFrozen()：判断一个对象是否被冻结。

**（3）原型链相关方法**

> * Object.create()：生成一个新对象，并该对象的原型。
> * Object.getPrototypeOf()：获取对象的Prototype对象

## Object对象的实例方法

除了`Object`对象本身的方法外，在`Object.prototype`上也部署的有很多方法。

> 1. `valueOf()`：返回当前对象对应的值。
> 2. `toString()`：返回当前对象对应的字符串形式。
> 3. `toLocaleString()`：返回当前对象对应的本地字符串形式。
> 4. `hasOwnProperty()`：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
> 5. `isPrototypeOf()`：判断当前对象是否为另一个对象的原型。
> 6. `propertyIsEnumerable()`：判断某个属性是否可枚举。

### Object.prototype.valueOf()

`valueOf`用于返回一个对象的值，默认返回对象本身，同时，如果我们使用JS的自动类型转化的话就会默认调用它。

```javascript
var o = new Object();
o.valueOf = function (){
  return 2;
};

1 + o // 3
```

另外如果像上面在对象中定义一个`valueOf`的方法的话，这个方法就会覆盖掉原有的`Object.prototype.valueOf`。

另外，我们在调用的时候只能书写为`Object.valueOf`而不能写为`Object.prototype.valueOf`

### Object.prototype.toString()

`toString`方法用于返回一个对象的字符串形式。默认返回类型字符串*[object object]*。

单纯的字符串是没有用的，但是我们可以通过定义**toString**来得到我们想要的东西，在正式工作中我们可以对数组、字符串、函数、甚至是Date都不树上toString方法来覆盖掉原有的方法。

```javascript
var o = new Object();

o.toString = function () {
  return 'hello';
};

o + ' ' + 'world' // "hello world"
```

我们知道通过`toString`会返回*[object object]*，其中第二个object表示该值的构造函数。

我们在使用tostring的时候可以通过`call`在任意值上调用`Object.prototype.toString`来判断这个值（对象）的类型

```javascript
Object.prototype.toString.call(value)
```

其返回得值与其类型相同

> 1. 其他对象：返回`[object " + 构造函数的名称 + "]`。
> 2. RegExp对象：返回`[object RegExp]`。
> 3. Error对象：返回`[object Error]`。
> 4. Date对象：返回`[object Date]`。
> 5. arguments对象：返回`[object Arguments]`。
> 6. 函数：返回`[object Function]`。

其他常见类型不在列举。对比一下使用valueOf要比typeof运算符更精确。

```javascript
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"
```

在上面这个`type`函数的基础上，还可以加上专门判断某种类型数据的方法。

```javascript
['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp',
 'NaN',
 'Infinite'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
```





























