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
- [JS 基本构建](./build-js.md)。
- [JS 合并构建](./build-js2.md)。
- [CSS 基本构建](./build-css.md)。
- [CSS 合并构建](./build-css2.md)。



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
新建`coolie-demo4`目录：
```
coolie-demo4
└── src

1 directory, 0 files
```

## 初始化文件
新建`index.html`文件：
```
<!doctype html>
<meta charset="utf8">

<style>
	body {
		margin: 20px;
	}

	img {
		border: 1px solid #ccc;
		padding: 10px;
	}
</style>

<img src="coolie.png">

<script>
	window.onload = function(){
		alert('coolie-demo4');
	};
</script>
```

此时的目录结果为：
```
coolie-demo4
└── src
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
                open >> http://192.168.0.162:53167
```


![](https://dn-fed.qbox.me/@/res/20151210174557156939302485 =507x270)


## 前端构建配置

使用`coolie init -c`生成`coolie.config.js`（前端构建工具的配置文件）：
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /coolie-demo4/src/coolie.config.js
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
 * @version 1.0.22
 * @create 2015-12-14 16:34:31
 * =======================================================
 */

'use strict';

module.exports = function (coolie) {
    // coolie 配置
    coolie.config({
        // 是否在构建之前清空目标目录
        clean: true,

        // js 构建
        js: {
            // 入口模块
            main: [
                //【1】
            ],
            // coolie-config.js 路径
            //【2】
            'coolie-config.js': null,
            // js 文件保存目录
            dest: './static/js/',
            // 分块配置
            chunk: []
        },

        // html 构建
        html: {
            // html 文件
            src: [
                //【3】
                'index.html'
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
        copy: [
            //【4】
        ],

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

- 【1】：去除了入口文件路径
- 【2】：取消了模块加载器配置文件的路径
- 【3】：修改了 html 文件路径
- 【4】：去除了原样复制文件配置

此时的目录结构为：

```
coolie-demo4
└── src
    ├── coolie.config.js
    ├── coolie.png
    └── index.html

1 directories, 3 files
```



## 前端构建
```
➜  coolie build

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝


                 1/6 >> parse coolie config
       coolie config >> /coolie-demo4/src/coolie.config.js
         src dirname >> /coolie-demo4/src
        dest dirname >> /coolie-demo4/dest/

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
                   √ >> ../dest/coolie-map.json

       build success >> past 123ms
```

构建之后的目录结构为：
```
coolie-demo4
├── dest
│   ├── coolie-map.json
│   ├── index.html
│   └── static
│       └── res
│           └── b4b6ccfbd5e0990f7b0a40f536fbc98b.png
└── src
    ├── coolie.config.js
    ├── coolie.png
    └── index.html

4 directories, 6 files
```

## 构建后运行
```
➜  cd ../dest
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.162:53983
```

![](https://dn-fed.qbox.me/@/res/20151210175655908691616579 =496x264)


## 构建结果分析
先来看看资源关系图吧：
```
{
  "/index.html": {
    "main": [],
    "async": [],
    "js": [],
    "css": [],
    "res": [
      "../src/coolie.png"
    ]
  }
}
```
 
表示`index.html`引用了一个资源文件`coolie.png`。

来看看`index.html`：
```
<!doctype html><meta charset="utf-8"> <style>body{margin:20px}img{border:1px solid #ccc;padding:10px}</style> <img src="/static/res/b4b6ccfbd5e0990f7b0a40f536fbc98b.png" > <script>window.onload=function(){alert("coolie-demo4")};</script>
<!--coolie@1.0.22-->
```

明显可见，`<style>`、`<script>`标签里的内容都经过了压缩，并且也替换了`<img>`的`src`属性。

