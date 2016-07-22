# 标准库

## Array对象

### 构造函数

`array`是JS的内置对象，也是一个构造函数，可以生成一个新的数组。

`Array`构造函数有一个很大的问题，就是不同的参数，会导致它的行为不一致。

```javascript
// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ ,]
new Array(2) // [ , ,]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非正整数参数（比如字符串、布尔值、对象等），
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

## Array方法

### isArray方法

```javascript
Array.isArray(a) // true
```

判断a是否是数组

### valueOf() 和 toString()

前者返回数组本身，后者将数组合并为字符串在进行输出，使用toString转换字符串的时候会默认加上**`,`**。

### push()，pop()

`push`在数组末端加上一个新元素并返回数组长度。

```javascript
var a = [1, 2, 3];
var b = [4, 5, 6];

Array.prototype.push.apply(a, b)
// 或者
a.push.apply(a, b)
```

这个是组合数组

`pop`为删除最后一个元素

### join()

`join`方法以括号内的参数作为分隔符，将所有数组成员组成一个字符串返回。如果在join后面再加上一个`call`方法就可以使用在字符串上。

```javascript
Array.prototype.join.call('hello', '-');
```

***注意***：这个方式只能在()中传入字符串，不能传入变量名。

### concat()

`concat`方法用于将新数组成员添加到原数组尾部，然后返回一个新数组。原数组是不变的。

```javascript
[1, 2, 3].concat(4, 5, 6)
```

concat可以接受数组也可以接受其他类型的值。另外，concat可以用于将对象合并为数组，但是必须借组call（与join类似）。

### shift()，unshift()

`shift`方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。

```javascript
var list = [1, 2, 3, 4, 5, 6];
var item;

while (item = list.shift()) {
  console.log(item);
}

list // []
```

`unshift`方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

### reverse()

`reverse`方法用于颠倒数组中元素的顺序，使用这个方法以后，返回改变后的原数组。

### slice()

`slice`方法用于提取原数组的一部分，返回一个新数组，原数组不变。slice可以接受两个参数，第一个是起始位置，第二个是终点，第二个可以省略也可以传入小于第一个参数的，在小于第一个参数的时候会输出一个空数组。如果不传入参数表示复制原有数组；如果传入的是负值，表示从末尾开始计算。

```javascript
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
```

在`slice`基础上我们可以调用`call`方法用来把类似数组的对象转换为数组。

### splice()

`splice`表示修改数组可以接受多个参数，第一个表示起始位置，第二个表示删除的数量，之后的表示插入的元素。如果第一个参数是负值，表示**从末尾开始删除**，如果只传入一个参数的话则会**将数组分割为两个，返回第二个数组**；如果第二个是0表示**不删除直接添加**。

### sort()

`sort`方法会对数组进行排列，由于大多数情况下我们需要自定义排序方式所以方法中可以使用函数。

```javascript
[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```

### map()

`map`方法对数组的所有成员依次调用一个函数，根据函数结果返回一个新数组。map使用方法很多，一个一个学。

`map`方法可以接受一个函数作为参数，函数可以接受三个参数，分别是当前成员，位置，和数组本身。

```javascript
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]
```

map不知可以处理数组还可以用来遍历字符串，但是在处理字符串的时候需要调用`call`，这种方式类似于调用`split`

```javascript
var upper = function (x) {
  return x.toUpperCase();
};

[].map.call('abc', upper)
// [ 'A', 'B', 'C' ]

'abc'.split('').map(upper)
// [ 'A', 'B', 'C' ]
```

使用上面的方式我们还可以使用`document.querySelectorAll`方法返回DOM节点集合，

`document.querySelectorAll`返回当前文档中匹配一个特定选择器的所有的元素

```javascript
var matches = document.querySelectorAll("div.note");
//表示返回文档中class为note的div元素。
```

`map`另外一种用法是在一个数组后调用，然后在其中传入函数和另外一个字符串。如果没有字符串的话map会调用函数调整其前面的数组，如果有字符串map会根据前面的字符串调用函数来调整传入的字符串参数。

```javascript
var arr = ['a', 'b', 'c'];

[1, 2].map(function(e){
  return this[e];
}, arr)
// ['b', 'c']

var f = function(n){ return n + 1 };

[1, undefined, 2].map(f) // [2, NaN, 3]
[1, null, 2].map(f) // [2, 1, 3]
[1, , 2].map(f) // [2, , 3]
```

`map方法不会跳过undefined和null，但是会跳过空位`

### forEach()

`forEach`和`map`类似，只不过forEach没有返回值。

`forEach`方法的参数与`map`方法一致，也是一个函数，数组的所有成员会依次执行该函数。它接受三个参数，分别是当前位置的值、当前位置的编号和整个数组。

```javascript
var out = [];

[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem);
}, out);
// 1 , 4 , 9
```

这个方式最后得到的**out**是调整原始数组后的，而如果我们使用`map`的话得到的是一个空置。

上面代码中，空数组`out`是`forEach`方法的第二个参数，结果，回调函数内部的`this`关键字就指向`out`。这个参数对于多层`this`非常有用，因为多层`this`通常指向是不一致的。

```javascript
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) {
      console.log(this.name);
    });
  }
};
obj.print()  //没有输出
```

上面代码中，`obj.print`方法有两层`this`，它们的指向是不一致的。外层的`this.times`指向`obj`对象，内层的`this.name`指向顶层对象`window`（详细解释参见《面向对象编程》一章）。这显然是违背原意的，解决方法就是使用`forEach`方法的第二个参数固定`this`。

```javascript
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) {
      console.log(this.name);
    }, this);
  }
};

obj.print()
// 张三
// 张三
// 张三
```

### filter()

`filter`方法参数是一个函数，所有数组成员以此执行函数，返回`true`的组成一个新数组，该方法不会改变原数组。filter还可以接受第二个参数，第二个参数用来指定**函数的`this`对象**

### some()，every()

这两个方法类似“断言”（assert），用来判断数组成员是否符合某种条件。与上面两个相同，他们也是接受一个函数作为参数，函数也是接受三个参数，依次是当前位置的成员、当前位置的序号和整个数组。

`some`在判断数组的时候只要有一个返回**true**整个数组都返回，否则返回*false*。

`every`则是判断整个数组，所有元素都返回**true**才返回，否则返回*false*。

注意，对于空数组，`some`方法返回`false`，`every`方法返回`true`，回调函数都不会执行。`some`和`every`方法还可以接受第二个参数，用来绑定函数中的`this`关键字。

### reduce()，reduceRight()

`reduce`方法和`reduceRight`方法依次处理数组的每个成员，最终累计为一个值。不同点是，reduce是从左到右，而另外一个则相反。

这两个方法的第一个参数都是一个函数。该函数接受以下四个参数。

>1. 累积变量，默认为数组的第一个成员
>2. 当前变量，默认为数组的第二个成员
>3. 当前位置（从0开始）
>4. 原数组

```javascript
[1, 2, 3, 4, 5].reduce(function(x, y){
  console.log(x, y)
  return x + y;
});
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

解析下上面代码，首先在第一次的*x*和*y*是方法前数组的前两个参数，之后再执行的时候*x*表示前一次执行的结果，*y*表示下面一个未执行操作的数组元素。另外**reduce**可以接受第二个参数表示起始数值，像上面的代码如果传入第二个参数*10*的话最后结果就是*25*因为这时候第一次执行的时候*x*表示的就是10。一般情况下，第二个数字是为了防止出现空数组的时候`reduce`报错。

## 链式使用

上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用。

```javascript
var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
})
.filter(function (email) {
  return /^t/.test(email);
})
.forEach(alert);
// 弹出tom@example.com
```

上面代码中，先产生一个所有Email地址组成的数组，然后再过滤出以`t`开头的Email地址。









































