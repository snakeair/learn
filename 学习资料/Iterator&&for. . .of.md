# Iterator    &&   for. . .of

## Iterator

在退出ES6之后，JS有了四中数据类型：*数组、对象、Set和Map*。同时这四种类型还可以组合使用，来定义自己的数据结构，这时候为了处理他们就需要一个统一的接口机制。

`Iterator`就是这种机制，它是一个接口，为不同的数据类型提供统一的访问机制。只要数据部署了*Iterator*接口，既可以完成遍历操作。

Iterator的作用：

> 1. 一是为各种数据结构，提供一个统一的、简便的访问接口；
> 2. 二是使得数据结构的成员能够按某种次序排序；
> 3. 三是ES6创造了一种新的遍历命令*for...of*循环，Iterator接口主要供*for...of*消费。

Iterator的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。

下面是一个模拟`next`方法返回值的例子。

```javascript
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

上面代码定义了一个`makeIterator`函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组`['a', 'b']`执行这个函数，就会返回该数组的遍历器对象（即指针对象）`it`。

*next*方法返回一个对象，表示当前数据成员的信息。这个对象具有*value*和*done*两个属性，*value*属性返回当前位置的成员，*done*属性是一个布尔值，表示遍历的是否结束，即是否还有必要再一次调用*next*方法。

```javascript
var it = idMaker();

it.next().value // '0'
it.next().value // '1'
it.next().value // '2'
// ...

function idMaker() {
  var index = 0;

  return {
    next: function() {
      return {value: index++, done: false};
    }
  };
}
```

面的例子中，遍历器生成函数`idMaker`，返回一个遍历器对象（即指针对象）。但是并没有对应的数据结构，或者说，遍历器对象自己描述了一个数据结构出来。



   























