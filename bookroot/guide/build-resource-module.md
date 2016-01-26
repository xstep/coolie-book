# 资源模块

资源模块指的是图片、样式、html片段等非脚本模块（在 coolie 的世界里，一切皆是模块）。

使用方法：

```
require('style.css', 'css');
```

[详细阅读点这里](/introduction/module-type.md)。


# demo
## 初始化目录结构
新建`coolie-demo8`目录：
```
.
└── webroot-dev

1 directory, 0 files
```

## 初始化文件
准备一张图片`coolie.png`，放在 src 目录下。

### style.css
然后在 webroot-dev 目录下新建`style.css`：
```
body{
	background: url(coolie.png);
	color: #AF00FF;
	font-size: 60px;
}
```

### template.html
然后继续在 webroot-dev 目录下新建`template.html`：
```
<h1>Hello coolie</h1>
```


### index.js
然后在 webroot-dev 目录下新建入口模块`index.js`：
```
define(function (require, exports, module) {
    // 引入样式文件模块
    var style = require('./style.css', 'style');

    // 在文档里插入该 html 片段
    document.getElementById('demo').innerHTML = require('template.html', 'html');
});
```


### coolie.js
使用命令下载模块加载器：
```
➜  coolie install coolie.js

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘
   install coolie.js >> http://s-ydr-me.oss-cn-hangzhou.aliyuncs.com/p/j/coolie.zip
     unzip coolie.js >> /var/folders/_8/nf73nk9d0yx_q_w6536gfr_80000gn/T/2016012621071600.zip
      coolie.js file >> /Users/cloudcome/development/github/coolie-demo8/webroot-dev/coolie.js
      coolie.js file >> /Users/cloudcome/development/github/coolie-demo8/webroot-dev/coolie.min.js
```

### coolie-config.js
再写模块加载器配置文件，使用命令生成配置文件（`coolie-config.js`）：
```
➜  coolie init -c

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘

        init success >> /coolie-demo6/src/coolie.config.js
```
修改其内容为：
```
/**
 * ======================================================
 * coolie.js 配置文件 `coolie-config.js`
 * 使用 `coolie init -j` 生成 `coolie-config.js` 文件模板
 * 前端模块加载器配置文件
 *
 * @link http://coolie.ydr.me/guide/coolie-config.js/
 * @author ydr.me
 * @version 1.0.22
 * @create 2015-12-15 17:39:19
 * ======================================================
 */

coolie.config({
    // 入口模块基准路径，相对于当前文件
    base: './'
}).use();
```

主要修改了`base`值，使入口模块基准路径指向当前文件所在的目录。


### index.html
最后写`index.html`：
```
<!doctype html>
<meta charset="utf-8">

<div id="demo"></div>

<script coolie src="coolie.js"
data-config="coolie-config.js"
data-main="index.js"></script>
```

此时的目录结构为：
```
.
└── webroot-dev
    ├── coolie-config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── coolie.png
    ├── index.html
    ├── index.js
    ├── style.css
    └── template.html

1 directory, 8 files
```

## 前端构建前运行
在`src`目录下，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.156:60880
```

![](http://s.ydr.me/@/res/20160126210848618401171152 =720x346)

如上图：

- 从页面上直观的看出，正确的执行了`style.css`和`template.html`内容
- 从控制台上可以看出，正确的加载了`style.css`和`template.html`模块


## 前端构建配置
使用命令生成前端构建配置文件：
```
➜  coolie init -c

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘

        init success >> /coolie-demo8/src/coolie.config.js
```

修改配置文件（`coolie.config.js`）为：
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
 * @create 2016-01-26 20:59:40
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
                //【1】
                'index.js'
            ],
            // coolie-config.js 路径，相对于当前文件
            //【2】
            'coolie-config.js': 'coolie-config.js',
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
            //【4】
            //'./favicon.ico',
            //'./robots.txt'
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

- 【1】：修改了入口模块路径为`index.js`
- 【2】：修改了模块加载器配置文件路径为`coolie-config.js`
- 【3】：修改了 html 路径为`index.html`
- 【4】：取消了复制文件路径


## 前端构建
执行前端构建：
```
➜  coolie build

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘

                 1/6 >> parse coolie config
       coolie config >> /Users/cloudcome/development/github/coolie-demo8/webroot-dev/coolie.config.js
         src dirname >> /Users/cloudcome/development/github/coolie-demo8/webroot-dev
        dest dirname >> /Users/cloudcome/development/github/coolie-demo8/webroot-pro/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
                   √ >> /coolie.png
                   √ >> /index.js

                 4/6 >> override coolie-config.js
                   √ >> base: "./"
                   √ >> async: "async/"
                   √ >> chunk: "chunk/"
                   √ >> version: "{}"
                   √ >> callbacks: 0
                   √ >> ../webroot-pro/static/js/b6122a2a4a1fbcd62c3c994106ca2a5d.js

                 5/6 >> build html
                   √ >> /coolie.js
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../webroot-pro/coolie-map.json

       build success >> past 441ms
```

从构建日志上也可以看出，构建了哪些模块。

此时的目录结构为：
```
.
├── webroot-dev
│   ├── coolie-config.js
│   ├── coolie.config.js
│   ├── coolie.js
│   ├── coolie.min.js
│   ├── coolie.png
│   ├── index.html
│   ├── index.js
│   ├── style.css
│   └── template.html
└── webroot-pro
    ├── coolie-map.json
    ├── index.html
    └── static
        ├── js
        │   ├── 4199dbc923054982882ff5afba82bdd4.js
        │   ├── 9a15f3baac85a8227af5a0e3a2a1a230.js
        │   └── b6122a2a4a1fbcd62c3c994106ca2a5d.js
        └── res
            └── 7d9bbb425d679ca6c75f1cbbc66785fa.png

5 directories, 15 files
```


## 前端构建后运行
切换到 webroot-pro 目录，执行 [sts](https://www.npmjs.com/package/sts)执行：
```
➜  cd ../webroot-pro
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.176:60786

```

![](http://s.ydr.me/@/res/20160126211803457240331463 =681x329)

- 主要区别是在控制台，加载时间从原来的 93ms 缩减到 16ms
- 界面上显示正常


## 分析构建结果

### coolie-map.json
首先看看构建之后的 coolie-map.json（[资源关系解读](/introduction/resource-relationship-map.md)）:
```
{
  "/index.html": {
    "main": [
      {
        "src": "../webroot-dev/index.js",
        "dest": "/static/js/9a15f3baac85a8227af5a0e3a2a1a230.js",
        "deps": [
          "../webroot-dev/style.css",
          "../webroot-dev/template.html",
          "../webroot-dev/coolie.png"
        ]
      }
    ],
    "async": [],
    "js": [
      {
        "dest": "/static/js/4199dbc923054982882ff5afba82bdd4.js",
        "deps": [
          "../webroot-dev/coolie.js"
        ]
      }
    ],
    "css": [],
    "res": []
  }
}
```

构建了`index.html`，该页面引用了`index.js`模块，
并且该模块构建之后的文件名为`9a15f3baac85a8227af5a0e3a2a1a230.js`，
该入口模块引用了`style.css`、`template.html`和`coolie.png`（图片是在 style.css 里引用的）三个模块。

我们来看下入口模块`9a15f3baac85a8227af5a0e3a2a1a230.js`的内容：
```
/*coolie build*/
define("0",["1","2"],function(e,t,n){var l=e("1");document.getElementById("demo").innerHTML=e("2")});
define("1",[],function(y,d,r){coolie.importStyle("body{background:url(/static/res/7d9bbb425d679ca6c75f1cbbc66785fa.png);color:#AF00FF;font-size:60px}")});
define("2",[],function(y,d,r){r.exports="<h1>Hello coolie</h1>"});
```

从上可知模块 ID 的对应关系：

```
index.js => 0
style.css => 1
template.html => 2
coolie.png => /static/res/7d9bbb425d679ca6c75f1cbbc66785fa.png
```

其中样式模块里使用了`coolie.importStyle`方法来自动加载样式。
