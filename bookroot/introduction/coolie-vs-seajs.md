**这，不是与 seajs 的比较的文章，而是说明 coolie 相对于 seajs 在模块加载器上做了哪些封装和简化。**


# 封装
## 配置
coolie 隐匿了 seajs 的全局属性，并且只出口了
```
coolie.config
coolie.config.base
coolie.config.version
coolie.config.cache
coolie.config.debug
coolie.use
coolie.version
coolie.url
coolie.dirname
coolie.modules
```
其中配置，更是缩减到只有 4 个（[关于coolie的配置参考这里](../begin/coolie-config-js.md)）。

## 支持
同时，经过对 seajs 的二次封装，已经实现了完善的版本管理、分块加载、文本/JSON加载、图标加载等。

- 版本管理`coolie.config.version`配置分块模块和异步模块的版本信息（构建工具自动生成）。
- 分块加载，构建工具分块构建之后，模块加载进行分块加载，达到公共模块最高利用率。
- 文本/JSON加载`require('some.txt', 'text')`和`require('some.json', 'json')`。
- 图片加载`require('some.jpg', 'image')`。

其中，文本加载的原理是通过`XMLHttpRequest`来进行加载远程文本，图片加载是直接返回图片的链接，
构建之后直接返回 base64。



# 简化
## 配置
上面已提到，coolie 简化了 seajs 的配置，除去了`map、path、alias、vars`等配置。

# 功能
并且删除了对 WebWorker 的适配。


