# JS学习——JSON对象

**JSON**一种数据交换的文本格式，

> 1. 数组或对象的每个成员的值，可以是简单值，也可以是复合值。
> 2. 简单值分为四种：字符串、数值（必须以十进制表示）、布尔值和null（NaN, Infinity, -Infinity和undefined都会被转为null）。
> 3. 复合值分为两种：符合JSON格式的对象和符合JSON格式的数组。
> 4. 数组或对象最后一个成员的后面，不能加逗号。
> 5. 数组或对象之中的字符串必须使用双引号，不能使用单引号。
> 6. 对象的成员名称必须使用双引号。

格式

```json
["one", "two", "three"]

{ "one": 1, "two": 2, "three": 3 }

{"names": ["张三", "李四"] }

[ { "name": "张三"}, {"name": "李四"} ]
```

需要注意的是，空数组和空对象都是合格的JSON值，null本身也是一个合格的JSON值，但是*undefined*不是

### JSON.stringify()

用于将一个字符串转为json。

```javascript
JSON.stringify('abc');
```

注意，在json中如果有一个成员是`undefined`、函数或者XML对象，这个成员就会被忽略，如果它属于一个数组那么数组这回被转为null。

`stringify`会忽略不可遍历的属性。他还可以接受一个数组参数来，制定需要转换字符串的属性。

```javascript
 var obj = {
    'prop1': 'value1',
    'prop2': 'value2',
    'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
//变量数组声明了只转换1和2两个元素。
```

与此同时*stringify*还可以接受一个函数作为参数，以改变默认的字符串化的行为。

