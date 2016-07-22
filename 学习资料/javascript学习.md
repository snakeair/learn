# javascript学习

`理论部分不进行在此学习，直接学习应用部分，部分已经熟识的也不在进行记录`

## 基本语法

### 条件语句

#### if语句

```javascript
if(a > 10){
	console.log(a);
}else if( a <= 9){
	console.log('a<10');
}
```

上面的就是if语句，如果`if..else..`的只有两种方式的话可以这么使用

```javascript
a >10 ? console.log(a):console.log('a < 10');
```

上面的三元运算符，表示先判断**?**前面的语句如果正确了知行**:**前面的，如果错误了知行后面的。

#### switch语句

```javascript
switch (x) {
  case 1:
    console.log('x 于1');
    break;
  case 2:
    console.log('x 等于2');
    break;
  default:
    console.log('x 等于其他值');
}
```

上面的就是switch语句，在有多个`if..else..`语句的时候可以使用，每一个条件结尾都有一个**break**这个是为了结束switch语句，如果我们需要判断所有符合的条件的话就不需要添加，注意，switch语句结尾必须有**default**作为结尾，

#### while循环语句

```javascript
var i = 0;
while (i < 100) {
  console.log('i当前为：' + i);
  i += 1;
}
```

只要条件值`while`就会执行下去。

#### do..while语句

与`while`类似只不过`do..while`会执行一次，即会先执行**do**的内容然后字啊执行while的内容。while结尾必须有一个**;**

### 标签

#### break和continue标签

这两个的作用都是跳出，但是**break**是直接跳出代码块或者循环，而**continue**则是跳过本次循环执行下一次。

#### label标签

```javascript
label:
	statement
```

相当于定位符，可以使用breakh和continue直接跳到声明的位置。

### 数据类型

```javascript
typeof 123 // "number"
typeof '123' // "string"
typeof false // "boolean"
function f() {}
typeof f     // "function"
typeof undefined// "undefined"
typeof window // "object"
typeof {} // "object"
typeof [] // "object"
typeof null // "object"
null == undefined  //"true"
false == undefined //"false"
false == null //"false"
"" == null  //"false"
"" == false  //"true"
"" == undefined //"false"
undefined === undefined  "true"
null === null  //"true"
null === undefined  //"false"
NaN == NaN  //"false"
NaN == null //"false"
NaN == undefined // "false"

```

