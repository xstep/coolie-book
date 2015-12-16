可以使用命令生成配置文件模板：
```
coolie init -c
```




下面逐一介绍下配置文件的各个配置项。

# js
JS 文件构建的相关配置。如：
```
"js": {}
```

## js.main
`array`。coolie.js 的前端模块化入口文件，支持 glob 通配符（下文提到的通配符与此相同），
JS 压缩采用的是 uglify2。

**glob部分语法**
- `*`：匹配任意数量的字符，但不匹配`/`
- `?`：匹配单个字符，但不匹配`/`
- `**`：匹配任意数量的字符，包括`/`，只要它是路径中唯一的一部分
- `{}`：允许使用一个逗号分割的列表或者表达式
- `!`：排除匹配

**进阶阅读**
- [npm: glob](https://www.npmjs.com/package/glob)
- [npm: uglify-js](https://www.npmjs.com/package/uglify-js)

如：
```
"js": {
    "main": [
        "./static/js/app/**/*.js"
    ]
}
```


## js.coolie-config.js
`string`。coolie.js 的配置文件（前端模块化加载器配置文件）的路径，
因为构建操作需要改写配置文件。如：
```
"js": {
    "main": [
        "./static/js/app/**/*.js"
    ],
    "coolie-config.js": "./static/js/coolie-config.js"
}
```

`js.coolie-config.js`可以为空，当项目里没有使用到模块加载器时。


## js.dest
非模块化脚本（指的是页面上使用`script`引用的脚本）的保存路径。
```
<!--coolie-->
<script src="1.js"></script>
<script src="2.js"></script>
<script src="3.js"></script>
<!--/coolie-->
```
如上，3 个 JS 会被合并打包成一个文件（[详细点这里](../advance/build-html.md)）。如：
```
"js": {
    "main": [
        "./static/js/app/**/*.js"
    ],
    "coolie-config.js": "./static/js/coolie-config.js",
    "dest": "./static/js/"
}
```



## js.chunk
`array`。模块化分块地址列表，支持通配符。



**进阶提示**

- 生成的 chunk 模块会默认放在`chunk`（会自动计算，如果`chunk`存在，则会生成`chunk1`目录，如果`chunk1`也存在，则会生成`chunk2`目录，以此类推）目录下。
- 只有被指定的 chunk 模块才会进入 chunk 分析。
- 只有被两个及以上的入口模块引用的 chunk 模块引用才会被抽离出来。
- [模块分块策略](/introduction/module-chunk.md)。
- [模块构建指导](./build-chunk-module.md)。



# css
CSS 文件的构建的相关配置。如：
```
"css": {}
```

## css.dest
`string`。css 文件的保存目录，相对于生产目录。
```
"css": {
    "dest": "./static/css/"
}
```


## css.minify
`object`。css 压缩的一些配置，压缩工具使用的是 clean-css。
保持默认即可。如：
```
"css": {
    "dest": "./static/css/",
    "minify" : {
        "compatibility": "ie7"
    }
}
```

**进阶阅读**

- [npm: clean-css](https://www.npmjs.com/package/clean-css)


# html
HTML 文件的构建的相关配置。
```
"html": {}
```

## html.src
`array`。html 文件的路径，支持通配符。这些 html 文件里的内容会被构建修改。
```
"html": {
    "src": "./views/**/*.html"
}
```


## html.minify
`boolean`。html 文件是否压缩，为了照顾到各种模板引擎，只删除了回车、注释，
如果用了一些**逗比**的缩进模板引擎，那么需要设置为 false。如：
```
"html": {
    "src": "./views/**/*.html",
    "minify": true
}
```



**进阶阅读**

- [html 注释标记处理](../advance/build-html.md)


# resource
## resource.dest
`string`。静态资源（在 HTML 文件里引用到的图片、ico 和在 CSS 文件里引用到的图片、字体等）的保存目录。如：
```
"resource": {
    "dest": "./static/res/"
}
```


## resource.minify
保留属性，即是否压缩静态资源。如：
```
"resource": {
    "dest": "./static/res/",
    "minify": true
}
```


# copy
`array`。需要原样复制的文件列表，支持通配符。如：
```
"copy": [
  "./favicon.ico",
  "./path/to/"
]
```

# dest
构建的目标目录，生产目录相关配置。如：
```
"dest": {}
```

## dest.dirname
`string`。目标目录，生产目录。
```
"dest": {
  "dirname": "../webroot-pro"
}
```

## dest.host
`string`。绑定的网络地址，通常为分布到 CDN 环境的地址，
```
"dest": {
  "dirname": "../webroot-pro",
  "host": "//cdn.domain.com/path/to/"
}
```

## dest.versionLength
`number`。版本号长度，默认为 32 位。
```
"dest": {
  "dirname": "../webroot-pro",
  "host": "//cdn.domain.com/path/to/",
  "versionLength": 8
}
```

# coolie.use
coolie 现已中间件。比如以下场合：

- 将`<img data-original="/path/to/img.png"`的`data-original`属性值进行资源管理，
  则需要中间件来支持，因为 coolie 默认没有对非标准的属性进行处理。
- 将`{{include "path/to/template.html"}}`语句进行解析并替换为对应的模板内容，也需要
  中间件来支持，因为 coolie 没有对非标准的 html 文本做处理。

以上两个场合现已有中间件发布。

- coolie-img-data-original\[未发布]
- coolie-html-include\[未发布]

在使用第三方中间件时，coolie 会对中间件进行预先校验，如果不符合规范，则会抛出警告。


# 路径关系



相对于当前配置文件的路径有：

- `js.main`
- `js[coolie-config.js]`
- `html.src`
- `copy`
- `dest.dirname`

相对于构建之后目录（即`dest.dirname`）的有：

- `js.dest`
- `css.dest`
- `resource.dest`


