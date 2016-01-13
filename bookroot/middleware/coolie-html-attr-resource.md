# 介绍
构建替换非标准的资源属性。如：
```
<img data-original="path/to/image.png">

=>

<img data-original="xxxxxxxxx.png">
```


# 配置
## `attributeName`

指定非标准属性，默认为 `data-original`。

## `tagName`

指定标签名，默认为 `img`。

## `progress`

替换进度，默认为 `pre-html`（详细参考[前端构建工具中间件文档](../document/coolie-middleware.md)）。



# 使用
```
// 在 coolie.config.js 中添加
coolie.use(require('coolie-html-attr-resource')({
    attributeName: 'data-original',
    tagName: 'img',
    progress: 'pre-html'
}));
```



# github

<https://github.com/cooliejs/coolie-html-attr-resource>


