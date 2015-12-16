使用

```
➜  coolie init -j

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /path/to/src/coolie-config.js
```

生成配置文件模板

```
/**
 * ======================================================
 * coolie.js 配置文件 `coolie-config.js`
 * 使用 `coolie init -j` 生成 `coolie-config.js` 文件模板
 * 前端模块加载器配置文件
 *
 * @link http://coolie.ydr.me/guide/coolie-config.js/
 * @author ydr.me
 * @version 1.0.22
 * @create 2015-12-14 16:43:22
 * ======================================================
 */

coolie.config({
    // 入口模块基准路径，相对于当前文件
    base: './app/'
}).use();
```

生成的配置文件名为 `coolie-config.js`（不推荐修改）。

这里需要注意的点有：

- `base` 目录：相对于当前文件，即`coolie-config.js`。
- `base` 作用：作为入口模块的相对目录。
- 模块加载器的配置文件不能省，因为构建之后该文件会被重写。


- [模块加载文档](/document/coolie.js.md)
- [模块加载配置文档](/document/coolie-config.js.md)
