# 模块标记

coolie cli 的模块构建方式应该是比较特殊的一类，与 webpack 一样，都是另辟蹊径。

- webpack：依赖模块放到数组里，数组索引值就是模块 ID。
- coolie cli：依赖模块全局标记 ID（三十六进制）。

coolie cli 可以将长长的物理路径压缩成最短的字符，达到压缩率最大化，而不是将模块直接合并。

```
// module1.js
define(function(require, exports, module){
    module.exports = 'module1';
});

// module2.js
define(function(require, exports, module){
    module.exports = 'module2';
});

// main.js
define(function(require, exports, module){
    var module1 = require('./long/long/long/path/to/module1.js');
    var module2 = require('./long/long/long/path/to/module2.js');
    
    alert(module1 + module2);
});
```

## 普通的合并构建
```
// main.js
define('./main.js',[
    './long/long/long/path/to/module1.js',
    './long/long/long/path/to/module2.js'
],function(r,e,m){
    var m = r('./long/long/long/path/to/module1.js');
    var n = r('./long/long/long/path/to/module2.js');
    alert(m+n);
})
define('./long/long/long/path/to/module1.js',[],function(r,e,m){r.exports='module1'})
define('./long/long/long/path/to/module2.js',[],function(r,e,m){r.exports='module2'})
```

## coolie cli 构建
```
// main.js
define('0',[
    '1',
    '2'
],function(r,e,m){
    var m = r('1');
    var n = r('2');
    alert(m+n);
})
define('1',[],function(r,e,m){r.exports='module1'})
define('2',[],function(r,e,m){r.exports='module2'})
```
相比普通的合并构建，约节省了 50% 的代码。当项目依赖的模块数量增加后，节省的字节数是多么恐怖！

正因为，coolie cli 独特的压缩方式，才导致 coolie 模块加载器的配置异常简单。


# 构建方式
默认情况下，coolie cli 会将入口模块和依赖模块全部合并到一个文件内，这个过程和其他构建工具无异。
即如上代码所示，`main.js`（入口模块）依赖了`module1.js`和`module2.js`两个模块，
所以他们被合并在一起了。

聪明的 coolie cli，同时还支持[模块分块](./module-chunk.md)和[异步模块](./async-module.md)。







