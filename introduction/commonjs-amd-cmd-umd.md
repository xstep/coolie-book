# commonjs、amd、cmd、umd
在模块化规范提出的年代，很多规范应运而生，标题显示的就有四种，也是目前主流的。下面逐一介绍。


## commonjs
运行在 node 端。
```
var fs = require('fs');

fs.readFile('file.md');
```
以上是一个典型的遵循了 commonjs 规范的 nodejs 代码。

## amd
与 commonjs 规范类似，运行在浏览器端。
```
define('index.js', [
    './xhr.js'
], function(xhr){
    xhr.ajax(...);
});
```
以上是一个典型的遵循了 AMD 规范的浏览器代码，需要手动指定模块的名字和依赖。

## cmd
cmd 是 amd 和 commonjs 的一个变种，也是运行在浏览器端。
```
define(function(require, exports, module){
    var xhr = require('./xhr.js');
    
    xhr.ajax(...);
});
```
与 amd 规范不同的是，无须手动指定模块的名称，更专注于开发及依赖。

## umd
正因为，出现了 amd、cmd、commonjs、global/window 等多个规范，所以需要对两者做出一些兼容，umd 规范诞生了。
```
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['index.js'], factory);
    } else if (typeof define === 'function') {
        // CMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    methods
    function myFunc(){};

    //    exposed public method
    return myFunc;
}));
```
使用 umd 包装的代码，可以不用改写就可以直接运行在 node 和 浏览器，以及众多模块加载器下，当然代码会相对多很多。