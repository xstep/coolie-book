coolie 配套的有模块加载器（coolie.js）和模块构建工具（coolie.cli）两部分，其中模块加载器是可选的。
当然如果不使用 coolie.js 来作为模块加载器的话，那么就无法构建 JS 模块，只能构建 HTML、CSS、静态资源文件。

# 模块加载器优势

现在，拿主流的模块加载器和 coolie.js 来比较一下：

模块加载器 | 配置文件 | 兼容性 | 其他亮点
---------|---------|-------|--------
[coolie.js](https://github.com/cloudcome/coolie) | 只有一条配置，极其简单 | IE6+ | 配套的构建工具，生成版本配置，详细参考下表中的 coolie
[seajs](https://github.com/seajs/seajs) | 配置繁杂，包括 base、别名、路径、变量等 | IE6+ | 配套构建工具，详细参考下表中的 spm
[requirejs](https://github.com/jrburke/requirejs) | 配置繁杂，包括 base、别名、路径、变量等 | IE6+ | 配套构建工具，详细参考下表中的 r.js




# 前端构建工具优势

目前，公开的前端开发构建工具中，coolie.cli 的功能是首屈一指的。coolie.cli 秉承着简单、快捷、方便的主旨，
为前端开发从开发环境到生产环境的跨越做了最大的努力。

在**前端构建的维度**上，同类、相似、相近的工具的比较：

工具 | JS 模块压缩、合并、版本管理 | CSS 文件的合并、压缩、版本管理 | HTML 文件的替换、压缩 | 静态资源的版本管理 | 包管理
----|-------------------------|---------------------------|--------------------|-----------------|------
[coolie](https://www.npmjs.com/package/coolie) | 全面、完整 | 全面、完整 | 全面、完整 | 全面、完整 | 弱支持
[webpack](https://www.npmjs.com/package/webpack) | 支持度不够，需要手动指定 | 不支持 | 不支持 | 不支持 | 不支持
[fis](https://www.npmjs.com/package/fis) | 需要监听构建，配置繁琐 | 需要监听构建，配置繁琐 | 需要监听构建，配置繁琐 | 需要监听构建，配置繁琐 | 不支持
[spm](https://www.npmjs.com/package/spm) | 需要手动版本管理，配置繁琐 | 不支持 | 不支持 | 不支持 | 支持
[r.js](https://github.com/jrburke/r.js) | 需要手动版本管理，配置繁琐 | 不支持 | 不支持 | 不支持 | 不支持
[grunt](https://www.npmjs.com/package/grunt) | 需要大量代码、配置 | 需要大量代码、配置 | 需要大量代码、配置 | 需要大量代码、配置 | 不支持
[gulp](https://www.npmjs.com/package/gulp) | 需要大量代码、配置 | 需要大量代码、配置 | 需要大量代码、配置 | 需要大量代码、配置 | 不支持




{% include "../_include/cnzz.md" %}

