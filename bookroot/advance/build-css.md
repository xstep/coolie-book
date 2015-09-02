# link 样式文件合并、压缩、版本管理

一句话就基本概括了 css 构建的主要过程。

不需要在样式文件里`import`了，放心大胆的将样式链接直接写在页面上：
```
<!--coolie-->
<link rel="stylesheet" href="/static/css/libs/0-normalize.css"/>
<link rel="stylesheet" href="/static/css/libs/1-base.css"/>
<link rel="stylesheet" href="/static/css/libs/2-unit-grid.css"/>
<link rel="stylesheet" href="/static/css/libs/2-unit-badge.css"/>
<link rel="stylesheet" href="/static/css/libs/2-unit-ipt.css"/>
<link rel="stylesheet" href="/static/css/libs/2-unit-btn.css"/>
<link rel="stylesheet" href="/static/css/libs/2-unit-form.css"/>
<link rel="stylesheet" href="/static/css/libs/2-unit-text.css"/>
<link rel="stylesheet" href="/static/css/libs/2-unit-table.css"/>
<link rel="stylesheet" href="/static/css/libs/3-font-icon.css"/>
<!--/coolie-->

<!--coolie-->
<link rel="stylesheet" href="/static/css/app/home.css"/>
<!--/coolie-->
```

看着这么一大串的 link 文件，是不是有点小吃惊，怎么能这么写呢？不要怀疑，就是这么写：

- 更清晰的知道当前页面引用了哪些 css 文件。
- css 文件更具有模块化，便于开发。
- 块级结构清晰明了，第一块为 libs，第二块为 app。

在构建之后：
```
<link rel="stylesheet" href="/static/css/xxxxooooo1.css"/>
<link rel="stylesheet" href="/static/css/xxxxooooo2.css"/>
```
分不清谁是谁了，通过[资源引用关系地图](./relationship-map.json.md)看的一清二楚？


# 引用的资源路径
```
.
|- index.html
`-- css
    |-- index.css
    `-- index.png
```
如上的层级结构，在`index.html`引用了`./css/index.css`样式；
而在`index.css`里引用了`./index.png`图片。

css 文件里的资源引用路径，与引用样式文件的 html 文件路径无关。

因此，样式里的资源引用，都会构建成相对路径
```
.demo1{
    background: url("./demo1.png");
    /* 相对于当前 css 文件 */
}

.demo2{
    background: url("/demo2.png");
    /* 相对于网站根目录 */
}
```
构建之后：
```
.demo1{
    background: url("../res/demo1.png");
}

.demo2{
    background: url("../res/demo2.png");
}
```

**注意**：`res`是静态资源的保存目录，这个[后文说到](./build-resource.md)。



