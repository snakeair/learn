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

`slice`方法用于提取原数组的一部分，返回一个新数组，原数组不变。slice可以接受两个参数，第一个是起始位置，第二个是终点，第二个可以省略。如果传入的参数是负值，



































