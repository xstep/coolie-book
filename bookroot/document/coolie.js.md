# require(moduleId[, modulePipeline])
同步加载一个模块，其中模块的管道是可选的。

模块管道（`modulePipeline`）的格式为：
```
inputModuleType | outputModuleType
```

- `inputModuleType`：输入的模块类型
- `outputModuleType`：输出的模块类型

```
// 同步加载一个 js 模块
require('path/to/module1.js');

// 同步加载一个 css 模块，返回 css 文本
require('path/to/module2.css', 'css');

// 同步加载一个 css 模块，返回模块 url
require('path/to/module2.css', 'css|url');
```

[coolie 支持的模块类型](/introduction/module-type.md)。


# require.async(moduleId[, callback(module)])
异步加载一个模块，其中加载回调是可选的。**只能加载 JS 类型的异步模块**。

```
require.async('path/to/async-module1.js');
require.async('path/to/async-module2.js', function(asyncModule2){
    // do ...
});
```



# exports
模块导出为一个对象
```
exports.a = ...
exports.b = ...
```


# module
修改模块导出
```
module.exports = fn
module.exports = 123
```
