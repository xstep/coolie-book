模块是存在远程服务器上的，因此需要一个特殊的加载器来加载这些已经定义好的模块。
目前，根据模块化规范，对应的模块加载器有：

# commonJS
- 编译后执行：[webpack](https://webpack.github.io/)。
- 包装eval执行：[seajs-wrap](https://github.com/seajs/seajs-wrap)。


# AMD
- 直接执行：[RequireJS](http://requirejs.org/)。

链接：
- [Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)


# CMD
- 直接执行：[coolie.js](http://coolie.ydr.me/)
- 直接执行：[Sea.js](http://seajs.org/)

链接：
- [如何实现一个 CMD 模块加载器](http://annn.me/how-to-realize-cmd-loader/)
- [sea.js 与 RequireJS 的异同](https://github.com/seajs/seajs/issues/277)


