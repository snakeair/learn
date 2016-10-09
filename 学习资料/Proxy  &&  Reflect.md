# Proxy  &&  Reflect

首先，`Proxy`用于修改某些操作的默认行为，它是在目标对象之前架设了一层“拦截”，外界对该对象的访问，都必须先通过这层拦截。

```javascript
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1;	//第一次只有设置没有读取
//  setting count!  
++obj.count		//是读取后进行++，所以是先读取在设置
//  getting count!
//  setting count!
//  2
```

上面的代码就是对控对象架设了一层拦截，重新定义了*get*和*set*行为。实际上`Proxy`是重载了点运算符，即用自己的定义覆盖了语言的原始定义。

```javascript
var proxy = new Proxy(target , handler)
```

ES6中原生提供Proxy构造函数，用来生成实例。

Proxy对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个Proxy实例，*target*参数表示所要拦截的目标对象，*handler*参数也是一个对象，用来定制拦截行为。

作为构造函数，Proxy接受两个参数，第一个表示所要代理的目标对象，即如果没有Proxy介入的话，操作原来要访问的就是这个对象；第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数。

如果*handler*没有设置任何拦截的话，那就等同于直接访问原对象。

```javascript
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

以上代码中，*handler*是一个空对象，没有任何拦截效果，访问*handler*就等同于方位*target*。

Proxy实例也可以作为其他对象的原型对象

```javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    console.log 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

以上代码中，*proxy*对象是*obj*对象的原型，*obj*对象本身没有*time*属性，所以根据原型链，会在*proxy*对象上读取该属性，导致被拦截。

同一个拦截器函数，可以设置拦截多个操作。

```javascript
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1,2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo // "Hello, foo"
```

下面是Proxy支持的拦截操作一览。

对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

**（1）get(target, propKey, receiver)**

拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。

最后一个参数`receiver`是一个对象，可选，参见下面`Reflect.get`的部分。

**（2）set(target, propKey, value, receiver)**

拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。

**（3）has(target, propKey)**

拦截`propKey in proxy`的操作，以及对象的`hasOwnProperty`方法，返回一个布尔值。

**（4）deleteProperty(target, propKey)**

拦截`delete proxy[propKey]`的操作，返回一个布尔值。

**（5）ownKeys(target)**

拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`，返回一个数组。该方法返回对象所有自身的属性，而`Object.keys()`仅返回对象可遍历的属性。

**（6）getOwnPropertyDescriptor(target, propKey)**

拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。

**（7）defineProperty(target, propKey, propDesc)**

拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。

**（8）preventExtensions(target)**

拦截`Object.preventExtensions(proxy)`，返回一个布尔值。

**（9）getPrototypeOf(target)**

拦截`Object.getPrototypeOf(proxy)`，返回一个对象。

**（10）isExtensible(target)**

拦截`Object.isExtensible(proxy)`，返回一个布尔值。

**（11）setPrototypeOf(target, proto)**

拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。

如果目标对象是函数，那么还有两种额外操作可以拦截。

**（12）apply(target, object, args)**

拦截Proxy实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。

**（13）construct(target, args)**

拦截Proxy实例作为构造函数调用的操作，比如`new proxy(...args)`。









