# JS学习——String

`String`是JS的原生对象之一，用来生成字符串包装对象。

```javascript
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 // "string"
typeof s2 // "object"

s2.valueOf() // "abc"
```

上面代码中，变量`s1`是字符串，`s2`是对象。由于`s2`是对象，所以有自己的方法，`valueOf`方法返回的就是它所包装的那个字符串。

实际上，字符串的包装对象是一个类似数组的对象（像，但不是）。

```javascript
new String("abc")
// String {0: "a", 1: "b", 2: "c", length: 3}
```

`String`还可以当作工具使用，将任意类型的值转为字符串。

## 实例对象的属性和方法

### charAt()

返回指定位置的字符，参数从0开始，如果传入的参数是负值或者超过字符串长度则返回空值。另外，可以使用数组下标代替：

```javascript
'abc'.charAt(1) // "b"
'abc'[1] // "b"
```

### charCodeAt()

返回指定位置字符的Unicode码点。

### concat()

将多个字符串连接起来并返回，不会修改原有字符串。

```javascript
'a'.concat('b', 'c') // "abc"

var one = 1;
var two = 2;
var three = '3';
''.concat(one, two, three) // "123"
one + two + three // "33"
```

另外，如果传入的前后两个字符都是数字的话**concat**会被解析成为*+*，返回的也会是一个数字。

### slice()

`slice`表示从原字符串取出子字符串并返回，不会改变原字符串。类似于数组中的`slice`方法，同样可以接受两个参数，第一个是其实位置，第二个是结束位置（不包含结束位置）。如果不传入第二个则返回余下的所有字符。其他方法与在数组中的操作相同。

另，*slice*不会改变原字符串。

```javascript
'JavaScript'.slice(-6) // "Script"
'JavaScript'.slice(0, -6) // "Java"
'JavaScript'.slice(-2, -1) // "p"
```

### substring()

`substring`方法用于从原字符串取出子字符串并返回，不改变原字符串。它与`slice`作用相同，但有一些奇怪的规则，因此不建议使用这个方法，优先使用`slice`。

> 1. 如果第二个参数大于第一个参数，`substring`方法会自动更换两个参数的位置。
> 2. 如果参数是负数，`substring`方法会自动将负数转为0。
>

```javascript
'Javascript'.substring(-3) // "JavaScript"
'JavaScript'.substring(4, -3) // "Java"
```

### substr()

与上面两个类似，但是不同的是`substr`第二个参数是要取出的字符串的长度。如果第一个参数是负值，则从末尾开始计算，如果第二个是负值，则转为0

```javascript
'JavaScript'.substr(-6) // "Script"
'JavaScript'.substr(4, -1) // ""
```

### trim()

清除字符串两端空格、制表符（`\t`）、换行符（`\n`）和回车符（`\r`）。

### toLowerCase()，toUpperCase()

`toLowerCase`方法用于将一个字符串全部转为小写，`toUpperCase`则是全部转为大写。

### localeCompare()

`localeCompare`方法用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。

需要注意的是，在比较字符的时候水男孩找码点来计算的大写字符正常情况下是比小写的小的，但是，`localeCompare会考虑自然语言的排序情况，将B排在a前面`。

### match()

`match`方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回`null`。

返回的数组还有*index*和*input*属性，分别表还是字符串开始的位置和原字符串。

### search()

`search`和match用法相同，但是返回值为匹配的第一个位置，如果没有找到法ihui*-1*。

### replace()

用于替换匹配的值字符串，一般只替换第一个，如果带有`g`修饰符则全部匹配。

### split()

`split`方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。另外split还可以传入第二个参数，表示返回的数组的最大成员数。

> 1. 如果传入的参数是控制，则分割所有字符
> 2. 如果有两个紧邻的分隔符，则在相应位置会返回一个空值。
> 3. 如果分割符处于开头或者结尾，则在开头或者结尾会有一个空值。




##END
