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



















































