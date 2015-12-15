# 资源模块

资源模块指的是图片、样式、html片段等非脚本模块（在 coolie 的世界里，一切皆是模块）。

使用方法：

```
require('style.css', 'css');
```

[详细阅读点这里](/introduction/module-type.md)。


# demo
## 初始化目录结构
新建`coolie-demo6`目录：
```
.
└── src

1 directory, 0 files
```

## 初始化文件
准备一张图片`coolie.png`，放在 src 目录下。

然后在 src 目录下新建`style.css`：
```
body{
	background: url(/coolie.png);
	color: #AF00FF;
	font-size: 60px;
}
```

然后继续在 src 目录下新建`template.html`：
```
<h1>Hello coolie</h1>
```

然后在 src 目录下新建入口模块`index.js`：
```
define(function (require, exports, module){
	// 引入样式文件模块
	var style = require('./style.css', 'css');

	// 创建样式节点
	var node = document.createElement('style');

	// 写入样式内容
	node.innerHTML = style;

	// 将样式节点插入到 DOM 中
	document.head.appendChild(node);

	// 引入 html 文件模块
	var template = require('template.html', 'html');

	// 在文档里插入该 html 片段
	document.write(template);
});
```

再写模块加载器配置文件，使用命令生成配置文件（`coolie-config.js`）：
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

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
coolie-demo6
└── src
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
                open >> http://192.168.0.167:52983
```

![](http://s.ydr.me/@/res/20151215181242840623858845 =695x419)

如上图：

- 从页面上直观的看出，正确的执行了`style.css`和`template.html`内容
- 从控制台上可以看出，正确的加载了`style.css`和`template.html`模块


## 前端构建配置
使用命令生成前端构建配置文件：
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /coolie-demo6/src/coolie.config.js
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
 * @version 1.0.22
 * @create 2015-12-15 18:14:36
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
                'index.js'
            ],
            // coolie-config.js 路径
            //【2】
            'coolie-config.js': 'coolie-config.js',
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

- 【1】：修改了入口模块路径为`index.js`
- 【2】：修改了模块加载器配置文件路径为`coolie-config.js`
- 【3】：修改了 html 路径为`index.html`
- 【4】：取消了复制文件路径


## 前端构建
在 src 目录下执行：
```
➜  src  coolie build

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝


                 1/6 >> parse coolie config
       coolie config >> /coolie-demo6/src/coolie.config.js
         src dirname >> /coolie-demo6/src
        dest dirname >> /coolie-demo6/dest/

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
                   √ >> ../dest/static/js/79f9ed3283181085347bfea15ac65773.js

                 5/6 >> build html
                   √ >> /coolie.js
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../dest/coolie-map.json

       build success >> past 463ms
```

从构建日志上也可以看出，构建了哪些模块。

此时的目录结构为：
```
coolie-demo6
├── dest
│   ├── coolie-map.json
│   ├── index.html
│   └── static
│       ├── js
│       │   ├── 770e249d8e38d50e8237f52ea5a5d216.js
│       │   ├── 79f9ed3283181085347bfea15ac65773.js
│       │   └── ccebc30a2e2df1176071a73b0041818b.js
│       └── res
│           └── b4b6ccfbd5e0990f7b0a40f536fbc98b.png
└── src
    ├── coolie-config.js
    ├── coolie.config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── coolie.png
    ├── index.html
    ├── index.js
    ├── style.css
    └── template.html

5 directories, 15 files
```


## 前端构建后运行
切换到 dest 目录，执行 [sts](https://www.npmjs.com/package/sts)执行：
```
➜  cd ../dest
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.176:60786

```

![](http://s.ydr.me/@/res/20151215181955596379169875 =702x351)

- 主要区别是在控制台，加载时间从原来的 51ms 缩减到 14ms
- 界面上显示正常


## 分析构建结果
首先看看构建之后的 coolie-map.json（[资源关系解读](/introduction/resource-relationship-map.md)）:
```
{
  "/index.html": {
    "main": [
      {
        "src": "../src/index.js",
        "dest": "/static/js/ccebc30a2e2df1176071a73b0041818b.js",
        "deps": [
          "../src/style.css",
          "../src/template.html"
        ]
      }
    ],
    "async": [],
    "js": [],
    "css": [],
    "res": []
  }
}
```

构建了`index.html`，该页面引用了`index.js`模块，
并且该模块构建之后的文件名为`ccebc30a2e2df1176071a73b0041818b.js`，
该入口模块引用了`style.css`和`template.html`两个模块。

我们来看下入口模块`ccebc30a2e2df1176071a73b0041818b.js`的内容：
```
/*coolie@1.0.22*/
define("0",["1","2"],function(e,t,n){var d=e("1"),m=document.createElement("style");m.innerHTML=d;document.head.appendChild(m);var l=e("2");document.getElementById("demo").innerHTML=l});
define("1",[],function(y,d,r){r.exports="body{background:url(/static/res/b4b6ccfbd5e0990f7b0a40f536fbc98b.png);color:#AF00FF;font-size:60px}"});
define("2",[],function(y,d,r){r.exports="<h1>Hello coolie</h1>"});
```

从上可知模块 ID 的对应关系：

```
index.js => 0
style.css => 1
template.html => 2
```

注意看下两个资源模块：

- 样式模块构建之后导出的是一个样式文本，
样式里的`background:url`里的图片文件也已经经过了版本管理（`b4b6ccfbd5e0990f7b0a40f536fbc98b.png`）。
- html 模块构建之后导出的依然是一个文本，内容就是 html 代码。

其他的文件，这里就赘述了。

