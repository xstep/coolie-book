`coolie-config.js` 是前端模块加载器的配置文件。

使用
```
coolie init -j
```
生成：
```

                               oooo   o8o
                               `888   `"'
  .ooooo.   .ooooo.   .ooooo.   888  oooo   .ooooo.
 d88' `"Y8 d88' `88b d88' `88b  888  `888  d88' `88b
 888       888   888 888   888  888   888  888ooo888
 888   .o8 888   888 888   888  888   888  888    .o
 `Y8bod8P' `Y8bod8P' `Y8bod8P' o888o o888o `Y8bod8P'

╔═══════════════════════════════════════════════════╗
║   coolie@1.0.0                                    ║
║   The front-end development builder.              ║
╚═══════════════════════════════════════════════════╝

        init success >> /path/to/coolie-config.js
```

生成文件内容：
```
/**
 * 前端模块加载器配置文件
 * @author ydr.me
 */

coolie.config({
    // 入口模块基准路径，相对于当前文件
    base: './app/'
}).use();
```


完整的配置接口如下：

# base
入口模块的基准路径。重温一下上文说的路径关系。

**这是唯一一个需要手动填写的配置。**

- **base**相对于模块配置文件 **coolie-config.js**。
- **coolie-config.js** 相对于 **coolie.min.js**。
- **coolie.min.js** 相对于被引用的页面，推荐使用绝对路径。


# chunk
分块模块的基准路径。默认为`./`，相对于`base`。

**该参数会在构建之后自动重写，不必在开发环境指定。**


# async
异步模块的基准路径。默认为`./`，相对于`base`。

**该参数会在构建之后自动重写，不必在开发环境指定。**


# cache
是否保留模块的缓存。

- 开发环境：可以在开发环境设置为 false。
- 生产环境：构建工具会重写为 true。


# debug
表示是否要输出调试信息（不推荐重写），默认：

- 开发环境：默认为 true，即会在控制台输出模块信息，同时也会注入一个全局变量`DEBUG`（[有什么用？](../advance/build-js.md)）。
- 生成环境：前端构建工具修改 coolie-config.js 文件里的 debug 为 false。

**该参数会在构建之后自动重写，不必在开发环境指定。**


# version
```
version: {
    "../async/0.js": "123456",
    "../chunk/0.js": "987654"
}
```
如上，也可以使用一个对象 MAP 来标记每个模块的版本号。模块加载器在加载模块的时候，都会参考上述配置，
精确控制每个异步模块和分块模块的版本。这对生产环境下的代码是否最新来说很重要。

**该参数会在构建之后自动重写，不必在开发环境指定。**


# callback
callback 所有引用模块准备完毕后执行的回调。该函数出口的就是入口模块的出口，这对测试来说，很重要。不推荐重写。
可以一次性注册多个 callback。
```
coolie.callback(function(){
    alert(1);
})callback(function(){
    alert(2);
});
```


# use([main])
启用模块化入口。

指定模块化（`main`）入口用于单元测试阶段，正常情况下不必指定。



