在前端模块化规范提出的年代，很多规范应运而生，标题显示的就有四种，也是目前主流的。下面逐一介绍。


# commonJS
运行在 node 端。
```
var fs = require('fs');

fs.readFile('file.md');
```
以上是一个典型的遵循了 commonJS 规范的 nodejs 代码。一个文件就是一个独立的模块，同时也可以加模块发布到 
[npm](https://npmjs.com/) 上，
便于管理、开源和使用，同时 npm 也做好了比较规矩的版本管理，算是一个比较完美的模块化开发方式，因此只需要你用过 nodejs，
那么你对前端模块化的要求将会更加强烈。


# AMD
运行在浏览器端，使用`define`包装，需要手动指定当前模块的ID和依赖的模块数组，比较麻烦。
```
define('index.js', [
    './xhr.js'
], function(xhr){
    xhr.ajax(...);
});
```
以上是一个典型的遵循了 AMD 规范的浏览器代码，需要手动指定模块的名字和依赖。


# CMD
CMD 是 AMD 和 commonJS 的一个变种，也是运行在浏览器端。
```
define(function(require, exports, module){
    var xhr = require('./xhr.js');
    
    xhr.ajax(...);
});
```
相比较 AMD 规范来说，CMD 来的简单轻巧，依赖关系也非常明了，
而加上 define 包装也和 nodejs 端的代码形成了一定的区分。

coolie.js（前端模块加载器） 使用的就是这种规范，它的轻盈使你的编写更加顺畅、自由，无须为模块的定义伤脑筋。


# umd
正因为，出现了 AMD、CMD、commonJS、global/window 等多个规范，所以需要对两者做出一些兼容，umd 规范诞生了。

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
    // methods
    function myFunc(){};

    // exposed public method
    return myFunc;
}));
```
使用 UMD 包装的代码，可以不用改写就可以直接运行在 node 和 浏览器，以及众多模块加载器下，当然代码会相对多很多。
UMD 规范相对前三者来说，更多的是一种妥协，但不失为是一种变通。在 JS 官方组织的模块化规范成熟之前，这也许是一种最保守的写法。
