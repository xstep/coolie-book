目前 coolie.js#1.x 是基于 [seajs#3.0.1](http://seajs.org/) 的二次封装，主要有以下变化：


# API、配置更简练
- [seajs 的文档](https://github.com/seajs/seajs/issues/266)
- [coolie.js 的文档](/document/coolie.js.md)

从文档上看

模块加载器 | 接口数量 | 配置数量
---------|---------|--------
seajs     |  7     | 8
coolie.js |  7     | 2


# 一切皆是模块
seajs 默认是不支持加载非 JS 模块的，需要使用扩展（如：[加载 style](https://github.com/seajs/seajs-style)）。
而在 coolie.js 的世界里，默认就支持加载任何资源，即一切皆是模块（[模块类型定义看这里](./module-type.md)）。



# 支持模块转换
coolie.js 支持模块转换，但 seajs 不支持，比如加载 file 模块，将它转换为一个 base64。
```
require('image.png', 'file|base64');
// 返回 base64 字符串
```


# 更完善的构建工具
seajs 和 coolie.js 都有标配的构建工具，
seajs 的构建工具为 [spm](http://spmjs.io/)，
coolie.js 的构建工具为 [coolie-cli](https://github.com/cooliejs/coolie-cli/)，
但使用难易程度和构建能力有很大的不同。

比较项目  | spm | coolie-cli
--------|------|-----------
上手难易程度 | 难 | 易
构建模块类型 | js、css、html | 任何类型
模块 ID 压缩 | 不支持 | 支持
构建配置 | 复杂 | 简练
构建独立 html 页面 | 不支持 | 支持
构建独立 css 文件  | 不支持 | 支持
构建独立 js 文件 | 不支持 | 支持
工程化思维 | 无 | 有
自动化版本管理 | 无 | 有

[coolie 的更多优势看这里](./advantage.md)。
