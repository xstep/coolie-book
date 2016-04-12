# 初始化
在前端根目录，可以使用命令生成配置文件模板：
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.1.1                                       ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /path/to/coolie.config.js
```

生成的内容为：
```
/**
 * ======================================================
 * coolie-cli 配置文件 `coolie.config.js`
 * 使用 `coolie init -c` 生成 `coolie.config.js` 文件模板
 * 当前配置文件所在的目录为构建的根目录
 *
 * @link http://coolie.ydr.me/guide/coolie.config.js/
 * @author ydr.me
 * @version 1.1.1
 * @create 2015-12-31 11:18:08
 * =======================================================
 */

'use strict';

module.exports = function (coolie) {
    // coolie 配置
    coolie.config({
        // 是否在构建之前清空目标目录
        clean: true,

        // 目标配置
        dest: {
            // 目标目录，相对于当前文件
            dirname: '../dest/',
            // 目标根域
            host: '',
            // 版本号长度
            versionLength: 32
        },

        // js 构建
        js: {
            // 入口模块，相对于当前文件
            main: [
                './static/js/app/**/*.js'
            ],
            // coolie-config.js 路径，相对于当前文件
            'coolie-config.js': './static/js/coolie-config.js',
            // js 文件保存目录，相对于 dest.dirname
            dest: './static/js/',
            // 分块配置
            chunk: [],
            // js 压缩配置
            minify: {
                global_defs: {
                    DEBUG: true
                }
            }
        },

        // html 构建
        html: {
            // html 文件，相对于当前文件
            src: [
                './views/**/*.html'
            ],
            // html 压缩配置
            minify: true
        },

        // css 构建
        css: {
            // css 文件保存目录，相对于 dest.dirname
            dest: './static/css/',
            // css 压缩配置
            minify: true
        },

        // 资源
        resource: {
            // 资源保存目录，相对于 dest.dirname
            dest: './static/res/',
            // 是否压缩
            minify: true
        },

        // 原样复制文件，相对于当前文件
        copy: [
            './favicon.ico',
            './robots.txt'
        ]
    });

    // 使用 coolie 中间件
    // coolie.use(require('coolie-*'));

    // 自定义 coolie 中间件
    //coolie.use(function (options) {
    //    // do sth.
    //    return options;
    //});
};
```


下面逐一介绍下配置文件的各个配置项。


# clean `boolean`
布尔值，是否清空目标目录，默认为 true。



# dest `object`
构建的目标目录，生产目录相关配置。如：
```
"dest": {}
```

## dest.dirname `string`
目标目录，生产目录。
```
"dest": {
  "dirname": "../webroot-pro"
}
```

## dest.host `string|function`
绑定的网络地址，通常为分布到 CDN 环境的地址，
```
"dest": {
  "dirname": "../webroot-pro",
  "host": "//cdn.domain.com/path/to/"
}
```

也可以使用函数来动态指定
```
{
    "host": function(type, path) {
        if (/\.(png|jpg|jpeg|gif|webp|bmp)$/i.test(path)) {
            return 'http://img.cdn.com';
        }
                    
        return {
            css: 'http://css.cdn.com/',
            js: 'http://js.cdn.com/',
            res: 'http://res.cdn.com/'
        }[type];
    }
}
```

## dest.versionLength `number`
版本号长度，默认为 32 位。
```
"dest": {
  "dirname": "../webroot-pro",
  "host": "//cdn.domain.com/path/to/",
  "versionLength": 8
}
```

# js `object`
JS 文件构建的相关配置。如：
```
"js": {}
```

## js.main `string|array<string>`
coolie.js 的前端模块化入口文件，支持 glob 通配符（下文提到的通配符与此相同），
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


## js.coolie-config.js `string|null`
coolie.js 的配置文件（前端模块化加载器配置文件）的路径，
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


## js.dest `string`
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



## js.chunk `array`
模块化分块地址列表，支持通配符。



**进阶提示**

- 生成的 chunk 模块会默认放在`chunk`（会自动计算，如果`chunk`存在，则会生成`chunk1`目录，如果`chunk1`也存在，则会生成`chunk2`目录，以此类推）目录下。
- 只有被指定的 chunk 模块才会进入 chunk 分析。
- 只有被两个及以上的入口模块引用的 chunk 模块引用才会被抽离出来。
- [模块分块策略](/introduction/module-chunk.md)。
- [模块构建指导](./build-chunk-module.md)。


## js.minify `object|boolean`
JS 压缩采用的是 [uglify-js](https://www.npmjs.com/package/uglify-js) 模块，默认配置为：
```
{
    global_defs: {
        DEBUG: false
    }
}
```


# css `object`
CSS 文件的构建的相关配置。如：
```
"css": {}
```

## css.dest `string`
css 文件的保存目录，相对于生产目录。
```
"css": {
    "dest": "./static/css/"
}
```


## css.minify `object/boolean`

CSS 压缩采用的 [clean-css](https://www.npmjs.com/package/clean-css) 模块，默认配置为：
```
{
    // 保留断行
    keepBreaks: false,
    // 保留特殊注释
    // *: 全部注释
    // 1: 头部注释
    // 0: 无注释
    keepSpecialComments: '0',
    // 合并 media 查询
    mediaMerging: true
}
```



# html `object`
HTML 文件的构建的相关配置。
```
"html": {}
```

## html.src `string|array`
html 文件的路径，支持通配符。这些 html 文件里的内容会被构建修改。
```
"html": {
    "src": "./views/**/*.html"
}
```


## html.minify `object|boolean`
html 文件是否压缩，为了照顾到各种模板引擎，只删除了回车、注释，
如果用了一些**逗比**的缩进模板引擎，那么需要设置为 false。

默认配置为：
```
{
    // 删除多行注释
    removeHTMLMultipleLinesComments: true,
    // 删除单行注释
    removeHTMLOneLineComments: true,
    // 合并连续空白
    joinHTMLContinuousBlanks: true,
    // 移除换行
    removeHTMLBreakLines: true
}
```



# resource
## resource.dest `string`
静态资源（在 HTML 文件里引用到的图片、ico 和在 CSS 文件里引用到的图片、字体等）的保存目录。如：
```
"resource": {
    "dest": "./static/res/"
}
```


## resource.minify `object|boolean`
保留属性，即是否压缩静态资源。如：
```
"resource": {
    "dest": "./static/res/",
    "minify": true
}
```


# copy `string|array<string>`
需要原样复制的文件列表，支持通配符。如：
```
"copy": [
  "./favicon.ico",
  "./path/to/"
]
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


