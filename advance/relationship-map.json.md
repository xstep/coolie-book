# 资源关系地图

资源关系地图指的是在构建过程中解析出来的资源互相引用、调用的关系，是一个 JSON 文件，下面来看看。
```
{
    "html/index.html": {
        "css": {
            "static/css/2ad76922b15e819253082e9dd624b9fb.css": [
                "static/css/path1/path2/3.css",
                "static/css/bootstrap.css"
            ],
            "static/css/0caf51b26ddc9d51ca9d87da0988ec10.css": [
                "static/css/3.css"
            ]
        },
        "main": "static/js/app/index.js",
        "deps": [
            "static/img/100x100.png",
            "static/img/loading.gif",
            "static/js/libs/path1/path2/index.js"
        ]
    }
}
```

如上，页面文件`html/index.html`构建生成了`static/css/2ad76922b15e819253082e9dd624b9fb.css`
和`static/css/0caf51b26ddc9d51ca9d87da0988ec10.css`两个文件。并且前者引用了`static/css/path1/path2/3.css`
和`static/css/bootstrap.css`。而`main`属性则是页面的模块入口，其中依赖了`static/img/100x100.png`、
`static/img/loading.gif`和`static/js/libs/path1/path2/index.js`三个模块（分别是 文本、图片、JS 模块）。

资源关系地图以 html 页面为基准，分别记录了每个 html 资源引用的关系。
