# Generator函数

## 基本概念

Generator函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。本章详细介绍Generator函数的语法和API，它的异步编程应用请看《异步操作》一章。

从语法上来看，*Generator*可以理解为一个状态机，其内部封装了多个内部状态。而在执行的时候*Generator*会返回一个遍历对象。返回的遍历器对象可以依次遍历*Generator*内部的每一个状态。

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

上面的代码是*Generator*的一个简单的函数，它和普通的函数区别是在function关键字后面有一个`*`，而且在函数的内部使用了关键字`yield`关键字，它用于定义不同的内部状态。

上面的代码中有两个*yield*关键字，但是他有三个状态，因为最后一句return语句也算是一个状态语句。

我们在调用Generator的时候与普通的函数的调用方式一样，但是不同的是在调用之后Generator之后，该函数并不执行，而且最后返回的也不是运行结果，而是一个指向内部状态的指针对象，也就是上面所说的遍历器对象。

那么在Generator内部又是怎么运行的：在Generator中*yield*是一个暂停执行的标记，函数在运行之后会再遇到*yield*之后停止，知道调用`next`才会再继续执行知道再次遇到*yield*或者*return*。

### yield语句

首先我们知道*yield*是Generator中的暂停标志，而*next*是执行标志，而他的运行方式如下：

> 1. 遇到`yield`语句，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。
> 2. 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`语句。
> 3. 如果没有再遇到新的`yield`语句，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
> 4. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

在Generator中的这种暂停方式叫做——惰性求值。

```javascript
function* gen() {
  yield console.log(5+3);
}

gen()	
console.log(1);
gen().next();
```

我们执行上面的代码发现第一次执行*gen*的时候没有输出，因为在第一次执行的时候遇到了*yield*所以函数暂停了执行。

```javascript
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)){
  console.log(f);
}
```

上面的代码是或报错，*forEach*方法的参数是一个函数，但是不是一个Generator函数，所以会运行错误。

另外，`yield`语句如果用在一个表达式之中，必须放在圆括号里面。

```javascript
console.log('Hello' + yield); // SyntaxError
console.log('Hello' + yield 123); // SyntaxError

console.log('Hello' + (yield)); // OK
console.log('Hello' + (yield 123)); // OK
```

`yield`语句用作函数参数或赋值表达式的右边，可以不加括号。

```javascript
foo(yield 'a', yield 'b'); // OK
let input = yield; // OK
```

### 与Iterator接口的关系

由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的`Symbol.iterator`属性，从而使得该对象具有Iterator接口。

```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

上面代码中，Generator函数赋值给`Symbol.iterator`属性，从而使得`myIterable`对象具有了Iterator接口，可以被`...`运算符遍历了。

## next方法的参数

首先，*yield*是没有返回值的，或者说他的返回值是*undefined*。但是有的时候程序需要传入参数，所以*next*上面可以添加一个参数，这个参数就会被当作上一个*yield*的返回值。

`注意`，前一句收的是*next*的参数是上一个*yield*的返回值，所以第一个*yield*是不能使用的。所以，如果在第一调用的时候就能够输入值，我们就需要用其他的方式，例如在包一层：

```javascript
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')
// First input: hello!
```

上面代码中，Generator函数如果不用`wrapper`先包一层，是无法第一次调用`next`方法，就输入参数的。

## for...of循环

`for...of`循环可以自动遍历Generator函数时生成的`Iterator`对象，且此时不再需要调用`next`方法。

```javascript
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

上面代码使用`for...of`循环，依次显示5个`yield`语句的值。这里需要注意，一旦`next`方法的返回对象的`done`属性为`true`，`for...of`循环就会中止，且不包含该返回对象，所以上面代码的`return`语句返回的6，不包括在`for...of`循环之中。

```javascript
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

上面代码中，对象`jane`原生不具备Iterator接口，无法用`for...of`遍历。这时，我们通过Generator函数`objectEntries`为它加上遍历器接口，就可以用`for...of`遍历了。加上遍历器接口的另一种写法是，将Generator函数加到对象的`Symbol.iterator`属性上面。

```javascript
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

除了`for...of`循环以外，扩展运算符（`...`）、解构赋值和`Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将Generator函数返回的Iterator对象，作为参数。

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```





  











## END