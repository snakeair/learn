# 标准库——属性描述对象

JS提供了一个内部数据结构，用来描述一个对象的属性行为，控制它的行为。例如：

```javascript
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

>1. `value`用来存放属性的属性值
>2. `writable`存放一个布尔值，表示属性（*value*）是否可辨，默认为**true**
>3. `enumerable`存放一个布尔值，表示属性是否可枚举，默认为**true**，它会是某些操作（*for..in..*）是否跳过该属性
>4. `configurable`存放一个布尔值，表示“可配置性”默认为**true**，false时会阻止某些操作改写该属性。
>5. `get`和`set`表示属性的取值。

## Object.getOwnPropertyDescriptor()

`Object.getOwnPropertyDescriptor`方法可以读出对象自身属性的属性描述对象，即上面举例的那些属性。

## Object.defineProperty()，Object.defineProperties()

`Object.defineProperty`方法允许通过定义属性描述对象，来定义或修改一个属性，然后返回修改后的对象。它的格式如下。

```javascript
var o = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});

o.p
// 123

o.p = 246;
o.p
// 123
// 因为writable为false，所以无法改变该属性的值
```

如果我们一次需要改变多个属性的时候可以使用`defineProperties`

```javascript
var o = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});
```

有一个需要注意的地方，在我们定义元素的`get & set`属性的时候我们就不能设置*wretable*为true，或者在设置的同时定义*value*属性，会报错，因为get和set就是对value的设置。

另外这两个属性还可以接受第三个对象，这个对象表示元素的`writable`、`configurable`、`enumerable`默认值都是*false*。

## 元属性

 元属性就是上面的所讲的那些描述对象属性的属性。

### 可枚举性（enumerable）

它表示一个属性是否可以被枚举被遍历，如果*enumerable*被设置为*false*的话：

>1. `for..in`循环
>2. `Object.keys`方法
>3. `JSON.stringify`方法

使用上面三个操作的时候就不会获取到该属性。所以，一般情况下，enumerable主要用来设置不可见属性。例如注释等信息。

### 可配置性（configurable）

这个属性是决定我们是否可以修改其所属的对象的各个属性。当*configerable*为*false*的时候，value、writable、enumerable和configurable都不能被修改了。



















































