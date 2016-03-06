# 下载
使用 coolie demo 命令下载本 demo。
```
➜ coolie demo 6
```


# 静态资源标签
以下方式引用的静态资源会被构建：

- `img`、`video`、`audio`、`embed` 和 `source` 标签的 `src` 属性
- `link` 标签的 `href` 属性
- `object` 标签的 `data` 属性
- `source` 标签的 `srcset` 属性

不必构建的标签，添加`coolieignore`属性即可，如：

```
<img src="./demo1.png">
<img src="./demo1.png" coolieignore>
```

构建之后

```
<img src="/static/res/xxxxoooo1.png">
<img src="./demo1.png">
```


 
# 外链的脚本、样式
- [JS 基本构建](./build-js-base.md)。
- [JS 合并构建](./build-js-combine.md)。
- [CSS 基本构建](./build-css-base.md)。
- [CSS 合并构建](./build-css-combine.md)。



# 内联的脚本、样式
内联的脚本，指的是使用`script`标签包裹起来的脚本内容，也同样会被压缩处理。
**除非，该`script`指定了`coolieignore`属性，或者`type`属性值不是脚本**。

js type 值有：

- 空值
- javascript
- text/javascript
- text/ecmascript
- text/ecmascript-6
- text/jsx
- application/javascript
- application/ecmascript

```
<script>var abc = '这里的 script 会被构建处理';</script>
<script coolieignore>var abc = '这里的 script 不会被构建处理';</script>
```


内联的样式，指的是使用`style`标签包裹起来的样式内容，也同样会被压缩处理、版本管理。
**除非，该`style`指定了`coolieignore`属性，或者`type`属性值不是样式**。


# 内嵌的样式
内嵌的样式，指的是标签里的`style`属性里的样式内容，也同样会被压缩处理、版本管理。
```
<div style="background: url('./demo.png');"></div>
<div style="background: url('/static/img/demo.png');"></div>
```
构建之后：
```
<div style="background: url('/static/res/xxxxoooo1.png');"></div>
<div style="background: url('/static/res/xxxxoooo2.png');"></div>
```


# 预格式文本
`pre`、`textarea`，以及添加了`coolieignore`或不符合脚本、样式的`script`、`style`标签都会保留原始的文本格式。如：

```
<pre>
预格式文本1
</pre>

<script type="text/plain">
预格式文本2
</script>
```
构建之后，格式不会变化：
```
<pre>
预格式文本1
</pre><script type="text/plain">
预格式文本2
</script>
```

**需要压缩 `template`、`script[type="template"]`内容，
使用 [coolie-html-tag-template](/middleware/coolie-html-tag-template.md)**。


**需要保护 html 中内嵌的 PHP 代码，
使用 [coolie-html-embed-php](/middleware/coolie-html-embed-php.md)**。


# 注释
并不是所有的注释都会被删除的，具体参考以下几条：
## 单行注释会被删除
```
<!--会被删除-->
```

## 非单行注释会被保留
```
<!--
不会被删除
-->
```

## 开头为`-`的多行注释会被删除

```
<!--
- 会被删除
-->
```



# demo
## 初始化目录
新建`coolie-demo6`目录：
```
coolie-demo6
└── webroot-dev

1 directory, 0 files
```

## 初始化文件
新建`index.html`文件：
```
<!doctype html>
<meta charset="utf-8">

<style>
body{
	background: #eee;
}
</style>

<img src="coolie.png">
<h1>Hello coolie-demo6</h1>

<script>
window.onload = function() {
	alert('Hello coolie6');
};
</script>
```

此时的目录结果为：
```
.
└── webroot-dev
    ├── coolie.png
    └── index.html

1 directory, 2 files
```


## 构建前运行
使用 [sts](https://www.npmjs.com/package/sts) 执行：
```
➜  cd src
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.252.118:57564
```


![](https://dn-fed.qbox.me/@/res/20160126154440246030643976 =650x304)


## 前端构建配置
使用`coolie init -c`生成`coolie.config.js`（前端构建工具的配置文件）：
```
➜  coolie init -c

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘
        init success >> /coolie-demo3/webroot-dev/coolie.config.js
```

修改`coolie.config.js`为：
```
/**
 * ======================================================
 * coolie-cli 配置文件 `coolie.config.js`
 * 使用 `coolie init -c` 生成 `coolie.config.js` 文件模板
 * 当前配置文件所在的目录为构建的根目录
 *
 * @link http://coolie.ydr.me/guide/coolie.config.js/
 * @author ydr.me
 * @version 1.6.4
 * @create 2016-01-26 14:01:05
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
            dirname: '../webroot-pro/',
            // 目标根域
            host: '',
            // 版本号长度
            versionLength: 32
        },

        // js 构建
        js: {
            // 入口模块，相对于当前文件
            main: [
                // 支持 glob 语法
                // './static/js/app/**/*.js'
                //【1】
            ],
            // coolie-config.js 路径，相对于当前文件
            //【2】
            'coolie-config.js': null,
            // js 文件保存目录，相对于 dest.dirname
            dest: './static/js/',
            // 分块配置
            chunk: []
        },

        // html 构建
        html: {
            // html 文件，相对于当前文件
            src: [
                // 支持 glob 语法
                //【3】
                'index.html'
            ],
            // 是否压缩
            minify: true
        },

        // css 构建
        css: {
            // css 文件保存目录，相对于 dest.dirname
            dest: './static/css/',
            // css 压缩配置
            minify: {
                compatibility: 'ie7'
            }
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
            // 支持 glob 语法
            // './favicon.ico',
            // './robots.txt'
            //【4】
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

修改点：

- 【1】：去掉了入口模块，此处没有用到模块化
- 【2】：模块配置文件也没有，设置为 `null`
- 【3】：修改需要构建的 html 文件路径
- 【4】：去除了原样复制文件配置

细心的同学可能发现了，配置文件基本没什么变化。

此时的目录结构为：

```
.
└── webroot-dev
    ├── coolie.config.js
    ├── coolie.png
    └── index.html

1 directory, 3 files
```



## 前端构建
```
➜  coolie build

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘

                 1/6 >> parse coolie config
       coolie config >> /coolie-demo6/webroot-dev/coolie.config.js
         src dirname >> /coolie-demo6/webroot-dev
        dest dirname >> /coolie-demo6/webroot-pro/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
           build app >> no main modules

                 4/6 >> override coolie-config.js
      overide config >> `coolie-config.js` is not defined

                 5/6 >> build html
                   √ >> /coolie.png
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../webroot-pro/coolie-map.json

       build success >> past 147ms
```

构建之后的目录结构为：
```
.
├── webroot-dev
│   ├── coolie.config.js
│   ├── coolie.png
│   └── index.html
└── webroot-pro
    ├── coolie-map.json
    ├── index.html
    └── static
        └── res
            └── 7d9bbb425d679ca6c75f1cbbc66785fa.png

4 directories, 6 files
```

## 构建后运行
```
➜  cd ../webroot-pro
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.252.118:57838
```

![](https://dn-fed.qbox.me/@/res/20160126155005969753130525 =685x321)


## 构建结果分析
### index.html

表示`index.html`引用了一个资源文件`coolie.png`。

来看看`index.html`：

```
<!doctype html><meta charset="utf-8"> <style>body{background:#eee}</style> <img src="/static/res/7d9bbb425d679ca6c75f1cbbc66785fa.png"><h1>Hello coolie-demo6</h1> <script>window.onload=function(){alert("Hello coolie6")};</script>
<!--coolie build-->
```

明显可见，`<style>`、`<script>`标签里的内容都经过了压缩，并且也替换了`<img>`的`src`属性。

### img
图片被重名后放在`static/res`下。



# github
<https://github.com/cooliejs/coolie-demo6/>
