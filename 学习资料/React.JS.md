# React.JS

React 是 Facebook 推出的一个用来构建用户界面的 JavaScript 库。具备以下特性：

> - 不是一个 MVC 框架
> - 不使用模板
> - 响应式更新非常简单
> - HTML5 仅仅是个开始

大多数时候我们使用`ReactJS`都是作为MVC中的V层，来处理的，但是它可以由服务器端的NodeJS来进行渲染，然后输出。这样可以减少浏览器的压力。

然后说一个*reactJS*只能够在线上环境进行测试。

我们在编写reactJS的时候可能需要使用*babel*，所以需要一点ES6的知识。

```html
<script src="../build/react.js"></script>
<script src="../build/react-dom.js"></script>
<script src="../build/browser.min.js"></script>

<script type="text/babel" src="./js.js"></script>
```

以上的js引入代码中：react.js` 是 React 的核心库，`react-dom.js` 是提供与 DOM 相关的功能，`Browser.js` 的作用是将 JSX 语法转为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。而最后一个引入的则是我们编写的js文件。

如果要编写*babel*需要在引入的时候添加`type="text/babel"`表示出来。

## 编写方式

### JSX

JSX是一种新的js语法，它可以直接在js文件中编写html代码。但是*jsx*不能出现两个顶级标签。

```javascript
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
```

以上代码中出现了两个顶级标签，因为他们一都好割开了。

### 组件

ReactJS允许将代码进行封装，这就是组件*component*，然后就可以在html中直接插入。另外需要注意的是，组件需要使用*var*声明，同时首字母必须是大写，否则会报错。

我们创建一个组件需要使用方法：`React.createClass`。

```javascript
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
ReactDOM.render(
	<HelloMessage />
  	document.getElementById('example');
)
```

需要注意的是，在编写组件的时候*class*要写成*className*，*for*要写成*htmlFor*。因为*class  &  for*都是JS的保留字。

在使用的时候一般不会只有一个组件，多个组件组合的我们一般叫做`复合组件`。

```javascript
var WebSite = React.createClass({
  render: function() {
    return (
      <div>
        <Name name={this.props.name} />
        <Link site={this.props.site} />
      </div>
    );
  }
});

var Name = React.createClass({
  render: function() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
});

var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
});

React.render(
  <WebSite name="菜鸟教程" site=" http://www.runoob.com" />,
  document.getElementById('example')
);

```

### 组件API

> 1. 设置状态：setState
> 2. 替换状态：replaceState
> 3. 设置属性setProps
> 4. 替换属性replaceProps
> 5. 强制更新：forceUpdate
> 6. 获取DOM节点：findDOMNode
> 7. 判断组件挂载状态：isMounted

#### setState

```javascript
setState(object nextState[, callback]);
```

* **nextState**，将要设置的新状态，该状态会和当前的**state**合并。
* **callback**，可选参算在设置*nextState*成功后的回调函数。

```javascript
var Counter = React.createClass({
  getInitialState: function () {
    return { clickCount: 0 };
  },
  handleClick: function () {
    this.setState(function(state) {
      return {clickCount: state.clickCount + 1};
    });
  },
  render: function () {
    return (<h2 onClick={this.handleClick}>点我！点击次数为: {this.state.clickCount}</h2>);
  }
});
ReactDOM.render(
  <Counter />,
  document.getElementById('message')
);
```

以上代码中，初始化了一个字符串*clickCount*，然后设此了一个点击事件每次点击+1。点击事件通过**setState**绑定。但是，没有回调函数。

#### 替换状态：replaceState

```
replaceState(object nextState[, function callback])
```

- **nextState**，将要设置的新状态，该状态会替换当前的**state**。
- **callback**，可选参数，回调函数。该函数会在**replaceState**设置成功，且组件重新渲染后调用。

**replaceState()**方法与**setState()**类似，但是方法只会保留**nextState**中状态，原**state**不在**nextState**中的状态都会被删除。

#### 设置属性：setProps

```
setProps(object nextProps[, function callback])
```

- **nextProps**，将要设置的新属性，该状态会和当前的**props**合并
- **callback**，可选参数，回调函数。该函数会在**setProps**设置成功，且组件重新渲染后调用。

设置组件属性，并重新渲染组件。

**props**相当于组件的数据流，它总是会从父组件向下传递至所有的子组件中。当和一个外部的JavaScript应用集成时，我们可能会需要向组件传递数据或通知**React.render()**组件需要重新渲染，可以使用**setProps()**。

更新组件，我可以在节点上再次调用**React.render()**，也可以通过**setProps()**方法改变组件属性，触发组件重新渲染。

#### 替换属性：replaceProps

```
replaceProps(object nextProps[, function callback])
```

- **nextProps**，将要设置的新属性，该属性会替换当前的**props**。
- **callback**，可选参数，回调函数。该函数会在**replaceProps**设置成功，且组件重新渲染后调用。

**replaceProps()**方法与**setProps**类似，但它会删除原有

```
props
```

#### 强制更新：forceUpdate

```
forceUpdate([function callback])
```

### 参数说明

- **callback**，可选参数，回调函数。该函数会在组件**render()**方法调用后调用。

forceUpdate()方法会使组件调用自身的render()方法重新渲染组件，组件的子组件也会调用自己的render()。但是，组件重新渲染时，依然会读取this.props和this.state，如果状态没有改变，那么React只会更新DOM。

forceUpdate()方法适用于this.props和this.state之外的组件重绘（如：修改了this.state后），通过该方法通知React需要调用render()

一般来说，应该尽量避免使用forceUpdate()，而仅从this.props和this.state中读取状态并由React触发render()调用。

#### 获取DOM节点：findDOMNode

```
DOMElement findDOMNode()
```

- 返回值：DOM元素DOMElement

如果组件已经挂载到DOM中，该方法返回对应的本地浏览器 DOM 元素。当**render**返回**null** 或 **false**时，**this.findDOMNode()**也会返回**null**。从DOM 中读取值的时候，该方法很有用，如：获取表单字段的值和做一些 DOM 操作。

#### 判断组件挂载状态：isMounted

```
bool isMounted()
```

- 返回值：**true**或**false**，表示组件是否已挂载到DOM中

**isMounted()**方法用于判断组件是否已挂载到DOM中。可以使用该方法保证了**setState()**和**forceUpdate()**在异步场景下的调用不会出错。

### 组件的生命周期

ReactJS的组件生命周期分为三个周期

> 1. Mounting：已插入真实 DOM
> 2. Updating：正在被重新渲染
> 3. Unmounting：已移出真实 DOM

生命周期的方法有：

> - **componentWillMount** 在渲染前调用,在客户端也在服务端。
> - **componentDidMount** : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。
> - **componentWillReceiveProps** 在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。
> - **shouldComponentUpdate** 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
>   可以在你确认不需要更新组件时使用。
> - **componentWillUpdate**在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
> - **componentDidUpdate** 在组件完成更新后立即调用。在初始化时不会被调用。
> - **componentWillUnmount**在组件从 DOM 中移除的时候立刻被调用。

以下实例在 Hello 组件加载以后，通过 componentDidMount 方法设置一个定时器，每隔100毫秒重新设置组件的透明度，并重新渲染：

```javascript
var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name="world"/>,
  document.body
);
```

## this.props

`props`是用来进行数据传递的，如果我们需要在渲染的时候改变数据内容可以使用*props*关键字。

```javascript
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

但是有一点需要注意，*this.props.children*则是以子元素的形式获取信息。另外需要注意的是，*this.props.children*的值有三种可能：如果没有子节点，则是*undefined*，如果只有一个节点，数据类型则是*Object*，如果有多个节点则是*array*，所以，处理的时候要非常小心。

````javascript
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
````

另外一个例子：

```javascript
var data = {
  id: 1, title: "Pete Hunt", text: "This is one comment"
};


var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
ReactDOM.render(
    <MyTitle title={data.title} />,
    document.getElementById('example')
);
```

上面是一个动态绑定数据的例子：我们可以将数据绑定在*data*上面，然后加载。当然，在使用中可能更多的时候我们会去使用*foreach*或者类似的方法循环出来。

### state

虽然讲*state*放在`props`中，但是它并不能算是一个`props`的一部分。

*state*是一个状态机，通过与用户交互实现不同的状态展示。

```javascript
var WebSite = React.createClass({
  getInitialState: function() {
    return {
      name: "菜鸟教程",
      site: "http://www.runoob.com"
    };
  },
 
  render: function() {
    return (
      <div>
        <Name name={this.state.name} />
        <Link site={this.state.site} />
      </div>
    );
  }
});

var Name = React.createClass({
  render: function() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
});

var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
});

React.render(
  <WebSite />,
  document.getElementById('example')
);
```

以上代码展示了如何在应用中组合使用 state 和 props 。我们可以在父组件中设置 state， 并通过在子组件上使用 props 将其传递到子组件上。在 render 函数中, 我们设置 name 和 site 来获取父组件传递过来的数据。

### props验证

props中使用*proTypes*做验证当传入的是无效数据的时候JS会抛出一个错误。

```javascript
var title = "菜鸟教程";
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,  //表示必须有值且必须是字符传。
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
ReactDOM.render(
    <MyTitle title={title} />,
    document.getElementById('example')
);
```

以下是各种验证类型：

```javascript
React.createClass({
  propTypes: {
    // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // 可以被渲染的对象 numbers, strings, elements 或 array
    optionalNode: React.PropTypes.node,

    //  React 元素
    optionalElement: React.PropTypes.element,

    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),

    // 用 enum 来限制 prop 只接受指定的值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // 可以是多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // 特定 shape 参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // 任意类型加上 `isRequired` 来使 prop 不可空。
    requiredFunc: React.PropTypes.func.isRequired,

    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,

    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});
```

# 表单与事件

首先，我们来个例子：

```javascript
var HelloMessage = React.createClass({
  getInitialState: function() {
    return {value: 'Hello Runoob!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return <div>
            <input type="text" value={value} onChange={this.handleChange} /> 
            <h4>{value}</h4>
           </div>;
  }
});
ReactDOM.render(
  <HelloMessage />,
  document.getElementById('example')
);
```

上面的代码中对*input*的*value*做了监视，如果*value*变化则会及时的显示在*h4*中。而*input*中的`onChange`则是一个监视的方法，他的属性*this.handleChange*则是其调用的函数。































