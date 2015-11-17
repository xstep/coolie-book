# coolie.config(Object)
配置 coolie 构建参数。
```
coolie.config({
    // 是否在构建之前清空目标目录
    clean: true,

    // js 构建
    js: {
        // 入口模块
        main: [
            './static/js/app/**'
        ],
        // coolie-config.js 路径
        'coolie-config.js': './static/js/coolie-config.js',
        // js 文件保存目录
        dest: './static/js/',
        // 分块配置
        chunk: []
    },

    // html 构建
    html: {
        // html 文件
        src: [
            './views/**'
        ],
        // 是否压缩
        minify: true
    },

    // css 构建
    css: {
        // css 文件保存目录
        dest: './static/css/',
        // css 压缩配置
        minify: {
            compatibility: 'ie7'
        }
    },

    // 资源
    resource: {
        // 资源保存目录
        dest: './static/res/',
        // 是否压缩
        minify: true
    },

    // 原样复制文件
    copy: [],

    // 目标配置
    dest: {
        // 目标目录
        dirname: '../dest/',
        // 目标根域
        host: '',
        // 版本号长度
        versionLength: 32
    }
});
```


# coolie.use(Function)
使用 coolie 中间件。
```
coolie.use(require('coolie-*'));
```


# coolie.utils.getAbsolutePath(path, parentFile)
获取资源的绝对路径。
```
coolie.utils.getAbsolutePath('img.png', '/path/to/file.html');
// =>
// "/path/to/img.png"
```


# coolie.utils.getHTMLTagAttr(htmlTag, attrName)
获取 html 标签属性。
```
coolie.utils.getHTMLTagAttr('<img src="img.png">', 'src');
// =>
// "img.png"
```


# coolie.utils.setHTMLTagAttr(htmlTag, attrName, attrValue)
设置 html 标签属性。
```
coolie.utils.setHTMLTagAttr('<img src="img.png">', 'src', 'abc');
// =>
// <img src="abc">
```

# coolie.utils.copyResourceFile(srcResourcePath)
复制资源文件，返回目标资源 URI。
```
coolie.utils.copyResourceFile('/path/to/img.png');
// =>
// "/res/00000011111.png"
```


# coolie.debug.success(event, message)
输出调试消息，消息类型有 `success`、`error`、`primary`、`warn`等。
```
coolie.debug.success("event", "message")
coolie.debug.error("event", "message")
coolie.debug.primary("event", "message")
coolie.debug.warn("event", "message")
```

