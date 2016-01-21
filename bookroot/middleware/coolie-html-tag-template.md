# 介绍
压缩`<template/>`或`<script type="template">`。如：
```
<template>

压缩

</template>

=>

<template>压缩</template>
```


# 配置
## `conditions`
指定匹配条件，默认有：
```
[{
    tagName: 'template'
}, {
    tagName: 'script',
    type: /template/
}]
```

## `progress`

替换进度，默认为 `post-html`（详细参考[前端构建工具中间件文档](../document/coolie-middleware.md)）。


## `replacements`
替换规则，默认有：
```
[{
    reg: /\s{2,}/g,
    replace: ' '
}, {
    reg: /[\n\r\t]/g,
    replace: ''
}]
```



# 使用
```
// 在 coolie.config.js 中添加
coolie.use(require('coolie-html-tag-template')());
```



# github

<https://github.com/cooliejs/coolie-html-tag-template>


