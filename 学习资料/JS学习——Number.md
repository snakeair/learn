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


