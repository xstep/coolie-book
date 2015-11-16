coolie 遵循的是 [CMD 规范][cmd link]。


# CMD 规范
CMD 最先是由 seajs 提出的，是 commonJS 规范的前端实现。
与 commonJS 的表现是一致的，即：依赖就近，顺序执行。

```
define(function(require, exports, module){
    var xhr = require('./xhr.js');
    
    xhr.ajax(...);
});
```

- AMD 是无法保证执行顺序的，它是并行加载，加载完成即执行。
没法保证顺序，如果要保证顺序，则需要添加配置。
- commonJS 则需要通过编译或者 eval 包装执行。



链接：
- [commonJS 1.0][commonjs link]
- [AMD (中文版)][amd link]
- [CMD 规范][cmd link]


[commonjs link]: http://wiki.commonjs.org/wiki/Modules/1.0
[amd link]: https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)
[cmd link]: https://github.com/cmdjs/specification/blob/master/draft/module.md