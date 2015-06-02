`coolie-config.js` 是前端模块加载器的配置文件。完整的配置接口如下：

# base
入口模块的基准路径。重温一下上文说的路径关系。

- base 相对于模块配置文件 **coolie-config.js**。
- **coolie-config.js** 相对于 **coolie.min.js**。
- **coolie.min.js** 相对于被引用的页面，推荐使用绝对路径。


# debug
表示是否要输出调试信息，默认：
- 开发环境：默认为 true，即会在控制台输出模块信息，同时也会注入一个全局变量`DEBUG`（[有什么用？](../)）。
- 生成环境：前端构建工具修改 coolie-config.js 文件里的 debug 为 false。


# version


# callback


{% include "../_include/cnzz.md" %}
