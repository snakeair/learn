# ES6学习——Class

## 概述

在以往的方式中，JS依靠构造函数来定义和生成新对象。这种方式传统的面向对象语言有很大差异，所以，在ES6中，JS引入了类*class*。通过*class*关键字可以直接定义类：

```javascript
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

//ES5
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

上面的代码定义了一个“类”，里面有一个*constructor*的方法，这就是构造方法。而*this*关键字则代表实例对象。也就是说class声明的*Point*等于下方的函数*Point*。

所以在ES6中，*class*可以看作是构造函数的另一种写法。

```javascript
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
var b = new Point();
b....
```

上面的代码表明了，类的数据类型就是函数，类本身就指向构造函数。而且，我们在使用的使用也是直接使用*new*命令，与构造函数一致。

在*类*中也有构造函数的*prototype*属性，而且，类的所有方法都是定义在*prototype*属性上面。所有调用的使用可以：

```javascript
class Bar {
  doStuff() {
    console.log('stuff');
  }
}
var b = new Bar();
b.doStuff === b.prototype.doStuff; //true

Ojbect.assign(Bar.prototype , {
  toString(){},
  toValue(){}
});
```

所以，我们在定义新方法的时候可以添加在*prototype*上面。`Object.assign`方法可以很方便的一次向类添加多个方法。

同样，在*class*中，*prototype*的*constructor*属性指向的是其*类*本身。

```javascript
Point.prototype.constructor === Point //true
```

但是与ES5不同的是，在*class*内部定义的方法，是不可枚举的。

### constructor方法

`constructor`方法是一个默认的方法，在通过*new*生成实例的时候，会自动调用该方法。在一个类中必定有一个*constructor*方法，如果没有对其进行定义的话，JS会默认添加一个空的方法。

*constructor*方法返回实例对象*this*，它是可以指定另外一个对象的。

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

### 类的实例对象

在类的实例操作上面*class*与ES5差别不大，没有进行大的调整。

> 1. 生成实例的时候必须使用*new*关键字，否则报错。
> 2. 实例的属性除非显式定义在其本身*this*，否则都定义在其原型*class*上。
> 3. 所有的实例共享一个原型对象，在进行属性修改的时候要注意是否影响到原型。



**注意**：*class*不存在变量提升。在类出现前声明实例会报错。

### Class表达式

没有变化，类可以使用表达式的形式出现

```javascript
const Class = class me {
	constructor(name){
      this.name = name;
	}
	sayName(){
		console.log(this.name)
	}
}('张三');

person.sayName(); // "张三"
```

在以表达式形式出现的时候可以写出立即执行的 Class。但是注意，以表达式形式的话*class*的类名是表达式的名字，而不是class后面跟随的，在上面代码中就是*me*，这个*me*只是在Class内部代码可用，指代当前类。如果不需要可以不写。

在上面的代码中*person.sayName();*就是一个利己执行的类的实例。

### 私有方法

私有方法是常见需求，但是ES6中没有提供专门的方法来声明，这就需要一点技巧：

**在类外声明**

我们知道在*class*内部声明的方法都是对外可见的，那么我们就可以在类外进行声明:

```javascript
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }
}

function bar(baz) {
  return this.snaf = baz;
}
```

上面的代码中，*foo*是公有方法，但是其内部调用的是*bar.call(this , baz)*。这就使得*bar*实际上成为了当前模块的私有方法。

**Symbol**

还有一种方法是利用`Symbol`值的唯一性，将私有方法的名字命名为一个`Symbol`值。

```javascript
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

上面代码中，`bar`和`snaf`都是`Symbol`值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

### this的指向

类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，`this`会指向该方法运行时所在的环境，因为找不到`print`方法而导致报错。

一个比较简单的解决方法是，在构造方法中绑定`this`，这样就不会找不到`print`方法了。

```javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

另一种解决方法是使用箭头函数。

```javascript
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```

还有一种解决方法是使用`Proxy`，获取方法的时候，自动绑定`this`。

```javascript
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```



## Class的继承

首先，在类中我们不必在使用原型链来实现继承了，我们可以通过`extends`关键字来实现继承。

```javascript
class ColorPoint extends Point();
```

```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

但是有一点，我们在使用*extends*做继承的时候需要zai*constructor*内部调用方法*super*，这个方法是用来新建父级的*this*对象的，因为子类没有自己的*this*对象，所以他只能从父级中继承。

ES5的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。ES6的继承机制完全不同，实质是先创造父类的实例对象`this`（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

### 类的prototype属性和_ _ proto _ _属性

首先，在大多数浏览器的ES5实现中，每一个对象都有*__ proto __*属性，指向对应的构造函数的prototype属性，Class作为构造函数的语法糖，同时具有prototype属性和__ proto __属性，因此同时存在两条继承链

> 1. 子类的`__proto__`属性，表示构造函数的继承，总是指向父类。
> 2. 子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

在类的扩展中有《对象的扩展》一章，里面给出了*Object.setPrototypeOf*方法的实现。

```javascript
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

因此，就得到了上面的结果。

```javascript
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```

### Object.getPrototypeOf()

`Object.getPrototypeOf`方法可以用来从子类上获取父类。

```javascript
Object.getPrototypeOf(ColorPoint) === Point
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类

### super关键字

`super`有两种用法，

> 1. 作为函数调用时（即*super(...args)*），`super`代表父类的构造函数。
> 2. 作为对象调用时，（即*super.prop*或者*super.method()*），`super`代表父类。

```javascript
class B extends A {
  get m() {
    return this._p * super._p;
  }
  set m() {
    throw new Error('该属性只读');
  }
}
```

上面代码中，子类通过`super`关键字，调用父类实例的`_p`属性。

由于，对象总是继承其他对象的，所以可以在任意一个对象中，使用`super`关键字。

```javascript
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

### 实例的__ proto __属性

子类实例的__ proto __ 属性的 __ proto __ 属性，指向父类实例的 __ proto __ 属性。也就是说，子类的原型的原型，是父类的原型。

```javascript
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```

上面代码中，`ColorPoint`继承了`Point`，导致前者原型的原型是后者的原型。

因此，通过子类实例的`__proto__.__proto__`属性，可以修改父类实例的行为。

```javascript
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"
```

上面代码在`ColorPoint`的实例`p2`上向`Point`类添加方法，结果影响到了`Point`的实例`p1`。

## 原生构造函数的继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有下面这些。

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前，这些原生构造函数是无法继承的，比如，不能自己定义一个`Array`的子类。

```javascript
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});
```

上面代码定义了一个继承Array的`MyArray`类。但是，这个类的行为与`Array`完全不一致。

```javascript
var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
```

之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过`Array.apply()`或者分配给原型对象都不行。原生构造函数会忽略`apply`方法传入的`this`，也就是说，原生构造函数的`this`无法绑定，导致拿不到内部属性。

ES5是先新建子类的实例对象`this`，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array构造函数有一个内部属性`[[DefineOwnProperty]]`，用来定义新属性时，更新`length`属性，这个内部属性无法在子类获取，导致子类的`length`属性行为不正常。

下面的例子中，我们想让一个普通对象继承`Error`对象。

```javascript
var e = {};

Object.getOwnPropertyNames(Error.call(e))
// [ 'stack' ]

Object.getOwnPropertyNames(e)
// []
```

上面代码中，我们想通过`Error.call(e)`这种写法，让普通对象`e`具有`Error`对象的实例属性。但是，`Error.call()`完全忽略传入的第一个参数，而是返回一个新对象，`e`本身没有任何变化。这证明了`Error.call(e)`这种写法，无法继承原生构造函数。

ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承。下面是一个继承`Array`的例子。

```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

上面代码定义了一个`MyArray`类，继承了`Array`构造函数，因此就可以从`MyArray`生成数组的实例。这意味着，ES6可以自定义原生数据结构（比如Array、String等）的子类，这是ES5无法做到的。

上面这个例子也说明，`extends`关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。

```javascript
class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]
x.push(3);
x // [1, 2, 3]

x.revert();
x // [1, 2]
```

上面代码中，`VersionedArray`结构会通过`commit`方法，将自己的当前状态存入`history`属性，然后通过`revert`方法，可以撤销当前版本，回到上一个版本。除此之外，`VersionedArray`依然是一个数组，所有原生的数组方法都可以在它上面调用。

下面是一个自定义`Error`子类的例子。

```javascript
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...
```

注意，继承`Object`的子类，有一个[行为差异](http://stackoverflow.com/questions/36203614/super-does-not-pass-arguments-when-instantiating-a-class-extended-from-object)。

```javascript
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
console.log(o.attr === true);  // false
```

上面代码中，`NewObj`继承了`Object`，但是无法通过`super`方法向父类`Object`传参。这是因为ES6改变了`Object`构造函数的行为，一旦发现`Object`方法不是通过`new Object()`这种形式调用，ES6规定`Object`构造函数会忽略参数。

 ![img_02](images\img_02.png)

 ![img_01](images\img_01.png)

上面两个图片是ES5 &&  ES6的继承方式示意图

## Class的取值和赋值

Class的取值和赋值方式与之前的一样，还是使用`get`来进行处理`set`。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123
//我们在调取prop的时候对其进行了赋值行为，所以触发了set

inst.prop
// 'getter'
// 在调取prop的时候我们呢没有任何操作仅仅是调用，所以出发了get。
```

上面的代码是一个简单的例子：

存值函数和取值函数是设置在属性的descriptor对象上的。

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html");
"get" in descriptor  // true
"set" in descriptor  // true
```

上面代码中，存值函数和取值函数是定义在`html`属性的描述对象上面，这与ES5完全一致。

## Class的静态方法、属性和实例属性

### 静态方法

静态方法就是可以直接在Class上面直接调取的方法，这种方法也只能在Class上面直接调取，如果是在实例上调用的话回抛出一个错误。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

另外，父类的静态方法可以被子类继承到。而且还可以从`super`对象上调用。

### 静态属性

同静态方法一样，静态属性也是直接绑定在Class上面的，但是，不同的是静态方法可以直接在类内部进行声明，而静态属性则只能在类的外部声明：

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

### 实例属性

以前我们如果需要定义实例属性的话只能写在*constructor*上面，但是在类中，我们可以声明：

```javascript
class MyClass {
  myProp = 42;

  constructor() {
    console.log(this.myProp); // 42
  }
}
```

上面代码中，`myProp`就是`MyClass`的实例属性。在`MyClass`的实例上，可以读取这个属性。

有了新的写法以后，可以不在`constructor`方法里面定义。

```javascript
class ReactCounter extends React.Component {
  state = {
    count: 0
  };
}
```

这种写法比以前更清晰。

### 静态属性

类的静态属性只要在上面的实例属性写法前面，加上`static`关键字就可以了。

```javascript
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myProp); // 42
  }
}
```

同样的，这个新写法大大方便了静态属性的表达。

```javascript
// 老写法
class Foo {
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```

上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。

## new.target属性

 `new.target`是ES6中的一个新属性，用于检测构造函数是否是使用*new*进行调用的，如果不是会返回*undefined*，如果是则返回构造函数（类）本身。

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

上面的代码是一个简单的例子，另外需要注意的一点是，如果在父类中调用`new.target`的话子类集成之后返回值为子类，

利用这一点我们可以创建一个只能够用于继承的类：

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

## Mixin模式的实现

Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。它在ES6的实现如下。

```javascript
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

上面代码的`mix`函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```javascript
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```



## END







