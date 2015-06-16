
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

coolie.cli 在找到入口后，会根据依赖链一直找到依赖终点，形成了一长串的模块集合，
然后将这些模块合并起来。


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
如上，使用`<!--coolie-->`和`<!--/coolie-->`属性包裹起来，表示该块级区域内的所有脚本进行合并、压缩，并进行版本管理。
相同的合并只会处理一次，版本号也会一致。
```
=>

<script src="xxxxooooo.js"></script>
```
