# CSS 合并

详细参考 [内容压缩策略](/introduction/content-compression.md)。


# CSS 压缩
CSS 压缩采用的 [clean-css](https://www.npmjs.com/package/clean-css) 模块，默认配置为：

```
{
    // 高级优化
    advanced: false,
    // 属性合并
    aggressiveMerging: false,
    // 兼容性，“ie7”、“ie8”、“*”（ie9+）
    compatibility: 'ie7',
    // 调试信息
    debug: false,
    // 断行
    keepBreaks: false,
    // 注释
    keepSpecialComments: 0,
    // 媒体查询合并
    mediaMerging: true,
    // url 检查
    rebase: false,
    // 资源地图
    sourceMap: false
}
```


# CSS 模块化
这种分组构建的方式，非常有利于 CSS 的模块化。一个典型的 CSS 模块化直观展示：
```
<!--通用模块-->
<!--coolie-->
<link rel="stylesheet" href="/static/css/common/0-normalize.css">
<link rel="stylesheet" href="/static/css/common/1-base.css">
<link rel="stylesheet" href="/static/css/common/2-layout.css">
<link rel="stylesheet" href="/static/css/common/2-input.css">
<link rel="stylesheet" href="/static/css/common/2-button.css">
<link rel="stylesheet" href="/static/css/common/2-list.css">
<link rel="stylesheet" href="/static/css/common/2-text.css">
<link rel="stylesheet" href="/static/css/common/2-kvlist.css">
<link rel="stylesheet" href="/static/css/common/2-table.css">
<!--/coolie-->

<!--业务模块-->
<!--coolie-->
<link rel="stylesheet" href="/static/css/modules/layout.css">
<link rel="stylesheet" href="/static/css/modules/header.css">
<link rel="stylesheet" href="/static/css/modules/nav.css">
<link rel="stylesheet" href="/static/css/modules/footer.css">
<link rel="stylesheet" href="/static/css/modules/copyright.css">
<!--/coolie-->

<!--业务样式-->
<!--coolie-->
<link rel="stylesheet" href="/static/css/app.css">
<!--/coolie-->
```

这种开发模式下，css 的目录结构可以这么分：

```
css
├── app
│   ├── page1.css
│   ├── page2.css
│   └── readme.md
├── common
│   ├── 0-normalize.css
│   ├── 1-base.css
│   └── 2-alert.css
├── modules
│   ├── module1.css
│   ├── module2.css
│   └── readme.md
└── readme.md
```


[构建策略说明](/introdution/content-compression.md)。


# demo
## 初始化目录
新建`coolie-demo3`目录：
```
coolie-demo3
└── src

2 directories, 0 files
```

## 初始化文件
## 构建前运行
## 前端构建配置
## 前端构建
## 构建后运行
## 构建结果分析
如法炮制的新建p
