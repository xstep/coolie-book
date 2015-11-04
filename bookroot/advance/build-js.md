# DEBUG 全局变量
默认情况下：

- 开发环境：window.DEBUG = true;
- 生产环境：window.DEBUG = false;

是不是有遇到过测试代码发布到生产环境的情况？是不是打一堆`log`，上线之前还要注释掉？
现在有了`DEBUG`全局变量，就可以这样了：
```
if(DEBUG){
    console.log('1');
}

console.log('2');
```
构建之后：
```
console.log('2');
```

`DEBUG`全局变量是 coolie.js 根据 coolie-config.js 加上的（[coolie-config.js 详细配置](../begin/coolie-config-js.md)）。


在 JS 构建上，coolie 不仅对模块化的脚本支持良好，对非模块化的脚本支持也不错，使用也非常方便。

# 引用模块化脚本
```
<script coolie src="coolie.min.js"
data-config="coolie-config.js"
data-main="main.js"></script>
```
以上是一个典型的模块化脚本的入口定义：

- coolie 属性：定义了此标签属于该入口模块基于 coolie.js
- src 属性：定义了前端模块加载器
- data-config 属性：定义了前端模块加载器的配置文件地址，相对于 src 属性
- data-main 属性：定义了入口模块的地址，相对于 coolie-config.js 里的 base 属性

coolie cli 在找到入口后，会根据依赖链一直找到依赖终点，形成了一长串的模块集合，
然后将这些模块合并起来，通过生成的[资源引用关系地图](./relationship-map-json.md)可以知道
当前入口模块到底依赖了哪些模块。


# 引用非模块化脚本
非模块化指的是没有使用模块化包装的代码，通常这些脚本都是直接将属性、方法挂载在 window 对象上，如：
```
(function(){
    this.abc = 'abc';
}).call(this);
```
如上，就在全局作用域下的 window 对象上添加了`abc`属性，属性值为`"abc"`。

此类非模块化脚本也支持 coolie 的构建与合并，用法也很简单。
```
<!--coolie-->
<script src="1.js"></script>
<script src="2.js"></script>
<!--/coolie-->
```
如上，使用`<!--coolie-->`和`<!--/coolie-->`注释（当然，构建之后该[注释是会被删除的](./html-comments.md)）包裹起来，表示该块级区域内的所有脚本进行合并、压缩，并进行版本管理。
相同的合并只会处理一次，版本号也会一致。
```
=>

<script src="xxxxooooo.js"></script>
```

# 引用非脚本模块
coolie 支持以下几种 require 格式：
```
require('some.js');
require('some.txt', 'text');
require('some.css', 'css');
require('some.html', 'html');
require('some.png', 'image');
```
其中，`text`、`css`、`html`和`image`都是非脚本模块，但是可以被 coolie.js 正常引用，也可以被 coolie cli 正常构建。
如：
在当前目录下有一个`some.txt`文本，内容为：
```
hehe
```
那么，
```
var text = require('./some.txt', 'text');

text === 'hehe'// return true
```
构建之后：
```
define(id,[],function(y,d,r){r.exports="hehe"});
```

[关于模块构建，更多点这里](./build-modules.md)。


