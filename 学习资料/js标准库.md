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































