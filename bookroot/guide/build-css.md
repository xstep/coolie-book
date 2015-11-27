# CSS 构建

CSS 构建也特别的简单。

```
<!--page1.html-->

<!--coolie-->
<link href="path/to/module1.css">
<link href="path/to/module2.css">
<link href="path/to/module3.css">
<link href="path/to/module4.css">
<!--/coolie-->
```

构建为

```
<!--page1.html-->

<link href="/css/content_version.css">
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
