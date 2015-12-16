模块加载器指的是`coolie.js`，在浏览器中使用。

# coolie.config(<configs>)
配置模块加载器的各项参数，[详细文档点这里](./coolie-config.js.md)。

## coolie.config>base
配置入口模块的基准路径：
```
coolie.config({
    base: "./path/to/app"
});
```

# coolie.use([moduleId])
执行模块加载器。其中入口模块 id 可以省略，由 html 里的`data-main`属性指定，指定入口模块常用于单元测试。

```
coolie.use('path/to/app.js');
```

通常，一个模块加载的配置文件如下：
```
coolie.config({
    base: './app/'
}).use();
```

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

# require.async(moduleId[, callback(module)])
异步加载一个模块，其中加载回调是可选的。

```
require.async('path/to/async-module1.js');
require.async('path/to/async-module2.js', function(asyncModule2){
    // do ...
});
```

只能加载 JS 类型的异步模块。


# html 配置
[详细点这里](/guide/coolie-config.jsw.md)

