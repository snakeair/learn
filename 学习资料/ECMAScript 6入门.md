# ECMAScript 6入门

首先，`ES6`作为最新的JS标准，大部分的浏览器支持率都不是很高，如果我们要学习的话最好的方式是使用NodeJS来进行学习。Node支持很多的ES6新属性还可以使用其中的插件来处理我们的代码。

我们可以使用`nvm`来部署Node环境，但是*window*不支持nvm，我们需要使用*nvm-window*或者*nvmw*。

```ruby
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/<version number>/install.sh | bash
$ source ~/.nvm/nvm.sh
$ nvm install node
```

上面是*nvm*的安装命令，第一句是安装，第二句是激活。在win下只需要将nvm改为上面的两种就可以了。

在Node中使用一下命令可以查看Node支持的ES6的属性：

```javascript
$ node --v8-options | grep harmony
```

## 转码

首先我们在使用*ES6*的时候最担心的就是兼容问题，在这里又一个`babel`可以将ES6转译为ES5的代码。

例如

```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});
```

要使用*babel*首先我们要

***

### 配置文件.babelr

Babel的配置文件是`.babelrc`，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。

```json
{
  "presets" : [],
  "plugins" : []
}
```

`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```ruby
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

然后，将这些规则加入`.babelrc`。

```json
  {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

注意，以下所有Babel工具和模块的使用，都必须先写好`.babelrc`。

`Babel`提供*babel-cli*工具，用于命令行转码。

```ruby
$ npm install --global babel-cli
```

使用上面代码安装成功之后可以使用下列命令进行转码：

```ruby
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

### babel-register

`babel-register`模块用来改写`require`命令，他会给require加上一个层级，每次我们使用*require*加载*js \ jsx \ es \ es6*文件的时候就会默认的使用*babel*进行转码。

```ruby
$ npm install --save-dev babel-register
```

使用上面代码安装，然后再进行加载：

```ruby
require = ('babel-register');
require = ('./index.js')
```

需要注意的是，`babel-register`只会对`require`命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

### babel-core

如果某些代码需要调用Babel的API进行转码，就要使用`babel-core`模块。

安装命令如下。

```ruby
$ npm install babel-core --save
```

然后，在项目中就可以调用`babel-core`。

```javascript
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```

配置对象`options`，可以参看官方文档[http://babeljs.io/docs/usage/options/](http://babeljs.io/docs/usage/options/)。

下面是一个例子。

```javascript
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

上面代码中，`transform`方法的第一个参数是一个字符串，表示需要被转换的ES6代码，第二个参数是转换的配置对象。

### babel-polyfill

babel默认的只转码新的JS语法，但是不会转码新的API，所以我们需要使用`babel-polyfill`来为当前环境做一个垫片。

```ruby
$ npm install --save babel-polyfill
```

照理，先安装插件，然后再在脚本头部引入：

```javascript
import 'babel-polyfill';
//或者
requrie('babel-polyfill')
```

Babel默认不转码的API非常多，详细清单可以查看`babel-plugin-transform-runtime`模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

## let和const命令

### let命令

#### 基本语法

`let`是一个类似于*var*的命令，它也是用于声明变量的。但是`let`只有在代码块内部的时候才有效。













