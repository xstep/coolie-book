# coolie.js

coolie.js 是前端开发中使用的模块加载器，也是 coolie.cli 默认支持的模块加载器。
运行时需要 [coolie-config.js](./coolie-config-js.md) （加载器配置文件可以使用命令自动生成，后文详说）。

coolie.js 支持的是[**CMD**规范](./commonjs-amd-cmd-umd.md)。



# 简单
与主流模块加载器的接口的手动配置数量比较。

前端模块加载器 | 配置数量
-------------|-------
coolie.min.js | 1 + 4 个（手动配置 base，自动配置 debug/cache/version/callback）
sea.js | 9 个（alias/paths/vars/map/preload/debug/base/charset/callback）
require.min.js |  16 个（baseUrl/paths/bundles/shim/map/packages/nodeIdCompat/<br>waitSeconds/context/deps/callback/enforceDefine/<br>xhtml/urlArgs/scriptType/skipDataMain）



# 能强
coolie 使用的模块方案是：

## 开发环境
开发环境下，使用的是 CMD 方案：
```
define(function(require, exports, module){
    var mod = require('./mod.js');
    
    module.exports = 'mod';
});
```
因为，目前没有比这个更简单、更直观的书写方式。

## 生产环境
生产环境下，coolie 会构建成 AMD 的形式。
```
define('1'/*注意点1*/, ['0']/*注意点2*/, function(r/*注意点3*/, e, m){
    var mod = r/*注意点4*/('0'/*注意点5*/);
    
    m.exports = 'mod';
});
```

注意点：

1. 模块 ID 从物理路径转换成了单个字符，这是一般的模块构建无法实现的哦，
是 coolie 初期作为模块构建工具方面的最大亮点。
webpack 的做法是将模块放到一个数组里`[function(){}, function(){}]`，
这样模块的 ID 就是数组的索引值，挺巧妙的。
2. 依赖的模块 ID 也从物理路径转换成了单个字符。
3. `function` 里的参数也可以压缩的哦，因为构建之后模块的 ID 和依赖都是显性的，
`require`参数是可以压缩的哦，也不是通过`function.toString`来分析依赖的哦。
4. `require`变量被压缩成了`r`。
5. 这里的依赖模块 ID 也变成了`0`了哦。





