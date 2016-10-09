# JS学习——Number

## 属性

> 1. `Number.POSITIVE_INFINITY`：正的无限，指向`Infinity`。
> 2. `Number.NEGATIVE_INFINITY`：负的无限，指向`-Infinity`。
> 3. `Number.NaN`：表示非数值，指向`NaN`。
> 4. `Number.MAX_VALUE`：表示最大的正数，相应的，最小的负数为`-Number.MAX_VALUE`。
> 5. `Number.MIN_VALUE`：表示最小的正数（即最接近0的正数，在64位浮点数体系中为`5e-324`），相应的，最接近0的负数为`-Number.MIN_VALUE`。
> 6. `Number.MAX_SAFE_INTEGER`：表示能够精确表示的最大整数，即`9007199254740991`。
> 7. `Number.MIN_SAFE_INTEGER`：表示能够精确表示的最小整数，即`-9007199254740991`。

## 方法

### ()Number.prototype.toString()

将一个字符串转换为数字，第一个()传入数字，第二个()传入进制（10 ， 2 ， 8 ， 12）。

### ()Number.prototype.toFixed()

将数字转为制定指定位数的小数。用法与上面类似。

### Number.prototype.toExponential()

转为科学计数法。

### Number.prototype.toPrecision()

将一个数转为指定位数的有效数字。

另外，我们可以自己定义一个方法然后让其被**`Number`**继承。

```javascript
Number.prototype.add = function (x) {
  return this + x;
};
(8).add(2)  		//10
```

需要注意的是，数值的自定义方法，只能定义在它的原型对象`Number.prototype`上面，数值本身是无法自定义属性的。

##自定义方法

与其他对象一样，Number.prototype对象上面可以自定义方法，被Number的实例继承。
```
Number.prototype.add = function (x) {
  return this + x;
};
```
上面代码为Number对象实例定义了一个add方法。

在数值上调用某个方法，数值会自动转为Number的实例对象，所以就得到了下面的结果。
```
8['add'](2) // 10
```
上面代码中，调用方法之所以写成8['add']，而不是8.add，是因为数值后面的点，会被解释为小数点，而不是点运算符。将数值放在圆括号中，就可以使用点运算符调用方法了。
```
(8).add(2) // 10
```
由于add方法返回的还是数值，所以可以链式运算。
```
Number.prototype.subtract = function (x) {
  return this - x;
};

(8).add(2).subtract(4)
// 6
```
上面代码在Number对象的实例上部署了subtract方法，它可以与add方法链式调用。

我们还可以部署更复杂的方法。
```
Number.prototype.iterate = function () {
  var result = [];
  for (var i = 0; i <= this; i++) {
    result.push(i);
  }
  return result;
};

(8).iterate()
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
```
上面代码在Number对象的原型上部署了iterate方法，可以将一个数值自动遍历为一个数组。

需要注意的是，数值的自定义方法，只能定义在它的原型对象Number.prototype上面，数值本身是无法自定义属性的。

```
var n = 1;
n.x = 1;
n.x // undefined
```
上面代码中，n是一个原始类型的数值。直接在它上面新增一个属性x，不会报错，但毫无作用，总是返回undefined。这是因为一旦被调用属性，n就自动转为Number的实例对象，调用结束后，该对象自动销毁。所以，下一次调用n的属性时，实际取到的是另一个对象，属性x当然就读不出来。

##END
