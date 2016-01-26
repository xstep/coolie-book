# 异步模块

异步模块与同步模块相反，指的是模块是在运行时才去异步加载然后再运行。

```
setTimeout(function(){
    // 异步模块`async.js`在 1000ms 后加载，然后再运行
    require.async('async.js', function(exports){
        // 模块加载完成后，返回模块的导出
        // exports
    })
}, 1000);
```


异步模块常用于单页面应用，如：
```
window.on('hashchange', function(eve){
    if (location.hash === '#a') {
        require.async('pages/a.js');
    } else if (location.hash === '#b') {
        require.async('pages/b.js');
    } else {
        require.async('pages/404.js');
    }
});
```

如上，监听`hashchange`事件，然后根据不同的 hash 载入不同的页面。


# demo
本 demo 就是通过监听 hash 来载入不同的 page，是异步模块的一个典型使用场景。


## 初始化目录结构
新建一个空目录 coolie-demo9：
```
.
└── webroot-dev

1 directory, 0 files
```


## 初始化文件
### index.js
新建一个入口模块`index.js`：
```
define(function (require, exports, module) {
    var onhashchange = function (eve) {
        if (location.hash === '#a') {
            require.async('pages/a.js', function (page) {
                page();
            });
        } else if (location.hash === '#b') {
            require.async('pages/b.js', function (page) {
                page();
            });
        } else {
            require.async('pages/404.js', function (page) {
                page();
            });
        }
    };

    window.onhashchange = onhashchange;
    setTimeout(onhashchange, 0);
});
```

然后新建一个 pages 目录，分别放置这些页面片段。

pages/a.js：
```
define(function (require, exports, module) {
    module.exports = function () {
        document.getElementById('demo').innerHTML = 'page a ' + Date.now();
    };
});
```

pages/b.js：
```
define(function (require, exports, module) {
    module.exports = function () {
        document.getElementById('demo').innerHTML = 'page b ' + Date.now();
    };
});
```

pages/404.js：
```
define(function (require, exports, module) {
    module.exports = function () {
        document.getElementById('demo').innerHTML = 'page 404 ' + Date.now();
    };
});
```

然后，继续在 webroot-dev 目录下，下载模块加载器：
```
➜  coolie install coolie.js

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.5                       │
│ The front-end development builder. │
└────────────────────────────────────┘
   install coolie.js >> http://s-ydr-me.oss-cn-hangzhou.aliyuncs.com/p/j/coolie.zip
     unzip coolie.js >> /var/folders/_8/nf73nk9d0yx_q_w6536gfr_80000gn/T/2016012621373300.zip
      coolie.js file >> /coolie-demo9/webroot-dev/coolie.js
      coolie.js file >> /coolie-demo9/webroot-dev/coolie.min.js
```

然后初始化模块加载器配置文件`coolie-config.js`：
```
➜  coolie init -j

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.5                       │
│ The front-end development builder. │
└────────────────────────────────────┘

        init success >> /coolie-demo9/src/coolie-config.js
```

修改模块加载器配置文件为：
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
 * @create 2015-12-15 20:48:48
 * ======================================================
 */

coolie.config({
    // 入口模块基准路径，相对于当前文件
    base: './'
}).use();
```

只需要了`base`配置，使其指向了当前目录。

最后写`index.html`：
```
<!doctype html>
<meta charset="utf-8">
<style>
#demo{
	border: 1px solid #ccc;
	padding: 10px;
	font-size: 20px;
}
</style>

<div id="demo"></div>

<p><a href="#a">pages/a</a></p>
<p><a href="#b">pages/b</a></p>
<p><a href="#c">pages/c</a></p>
<p><a href="#d">pages/d</a></p>

<script coolie src="coolie.js" data-config="coolie-config.js" data-main="index.js"></script>
```

html 里分别加上了 4 个链接，来分别监听 hash 变化来异步载入不同的模块。


此时的目录结构为：
```
coolie-demo7
└── src
    ├── coolie-config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── index.html
    ├── index.js
    └── pages
        ├── 404.js
        ├── a.js
        └── b.js

2 directories, 8 files
```


## 前端构建前运行
在`src`目录下，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.255.75:58920
```

![](https://dn-fed.qbox.me/@/res/20151215210528244027950280 =693x377)

从上面的 gif 动画中可以清楚的看到：

- 页面载入的时候，匹配的 hash 是 404 页面，此时载入了主模块和异步的 404 模块
- 当点击`pages/a`的时候，匹配的 hash 是 a 页面，此时载入了异步的 a 模块
- 当点击`pages/b`的时候，匹配的 hash 是 a 页面，此时载入了异步的 b 模块
- 当点击`pages/c`的时候，匹配的 hash 是 404 页面，此时并未重复载入 404 模块，而是直接执行了已经加载完成的 404 模块
- 当点击`pages/d`的时候，与上条相同


## 前端构建配置
前端构建也不复杂，使用命令初始化前端构建配置文件（`coolie.config.js`）:
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /coolie-demo7/src/coolie.config.js
```

修改配置文件为：
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
 * @create 2015-12-15 21:11:07
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
- 【4】：去除了需要复制的文件路径


## 前端构建
在 src 目录下，执行：
```
➜  src  coolie build

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝


                 1/6 >> parse coolie config
       coolie config >> /coolie-demo7/src/coolie.config.js
         src dirname >> /coolie-demo7/src
        dest dirname >> /coolie-demo7/dest/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
                   √ >> /index.js
                   √ >> /pages/a.js
                   √ >> /pages/b.js
                   √ >> /pages/404.js

                 4/6 >> override coolie-config.js
                   √ >> base: "./"
                   √ >> async: "async/"
                   √ >> chunk: "chunk/"
                   √ >> version: "{
                          "async/1.js": "afe948d32200ecb81c4afe43d7afed45",
                          "async/2.js": "141ae7e19078fca1a1e954507d545dcd",
                          "async/3.js": "d6bd0d7db45a9639d6c4e60697312b7f"
                        }"
                   √ >> callbacks: 0
                   √ >> ../dest/static/js/f7701ee7c175f381696a96d48f86d84d.js

                 5/6 >> build html
                   √ >> /coolie.js
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../dest/coolie-map.json

       build success >> past 467ms
```

从实时打印的构建日志来看：

- 构建的入口模块不止`index.js`，还有`pages/a.js`、`pages/b.js`和`pages/404.js`
- 构建之后的版本信息，多了`async/1.js`、`async/2.js`和`async/3.js`

此时的目录结构为：
```
coolie-demo7
├── dest
│   ├── coolie-map.json
│   ├── index.html
│   └── static
│       └── js
│           ├── 6189c51ccb17bcd5eda1bd5710b1854b.js
│           ├── 770e249d8e38d50e8237f52ea5a5d216.js
│           ├── async
│           │   ├── 1.afe948d32200ecb81c4afe43d7afed45.js
│           │   ├── 2.141ae7e19078fca1a1e954507d545dcd.js
│           │   └── 3.d6bd0d7db45a9639d6c4e60697312b7f.js
│           └── f7701ee7c175f381696a96d48f86d84d.js
└── src
    ├── coolie-config.js
    ├── coolie.config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── index.html
    ├── index.js
    └── pages
        ├── 404.js
        ├── a.js
        └── b.js

6 directories, 17 files
```

从目录结构也可以看出，原来的`pages`目录已经不存在了，替换为了`static/js/async`目录。


## 前端构建后运行
切换到 dest 目录，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  cd ../dest
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.182:60305
```

![](https://dn-fed.qbox.me/@/res/20151215211809774557246544 =693x377)

表现的情况与构建之前是一致的，唯一不同的时候控制台打印的日志要少很多。


## 分析构建结果
首先分析下`coolie-map.json`（[深度解析点这里](/introduction/resource-relationship-map.md)）：
```
{
  "/index.html": {
    "main": [
      {
        "src": "../src/index.js",
        "dest": "/static/js/6189c51ccb17bcd5eda1bd5710b1854b.js",
        "deps": []
      }
    ],
    "async": [
      {
        "src": "../src/pages/a.js",
        "dest": "/static/js/async/1.afe948d32200ecb81c4afe43d7afed45.js",
        "deps": []
      },
      {
        "src": "../src/pages/b.js",
        "dest": "/static/js/async/2.141ae7e19078fca1a1e954507d545dcd.js",
        "deps": []
      },
      {
        "src": "../src/pages/404.js",
        "dest": "/static/js/async/3.d6bd0d7db45a9639d6c4e60697312b7f.js",
        "deps": []
      }
    ],
    "js": [],
    "css": [],
    "res": []
  }
}
```

可见的是，内容比之前的 demo 要多，最主要的是 async 里有一个数组，数组里展示是异步模块的信息。

接下来，看看入口模块（`6189c51ccb17bcd5eda1bd5710b1854b.js`）:
```
/*coolie@1.0.22*/
define("0",[],function(n,a,s){var o=function(a){"#a"===location.hash?n.async("1",function(n){n()}):"#b"===location.hash?n.async("2",function(n){n()}):n.async("3",function(n){n()})};window.onhashchange=o;setTimeout(o)});
```

简单的看了下，入口模块竟然只有一个模块，三个异步没有被打包进来（这也是异步模块的特点）。

```
function(require, exports, module)
function(n,       a,       s)
```

上下一一对比，异步模块载入的方法应该是`n.async()`，通过搜索可以找到：

```
n.async("1",function(
n.async("2",function(
n.async("3",function(
```

构建前后的一一对比，路径与 ID 的对应关系为：
```
pages/a.js => 1
pages/b.js => 2
pages/404.js => 3
```

不止是同步模块的路径会被压缩，连异步模块的路径也会被压缩。

接下来去看看`index.html`：
```
<!doctype html><meta charset="utf-8"><style>#demo{border:1px solid #ccc;padding:10px;font-size:20px}</style> <div id="demo"></div> <p><a href="#a">pages/a</a></p><p><a href="#b">pages/b</a></p><p><a href="#c">pages/c</a></p><p><a href="#d">pages/d</a></p> <script src="/static/js/770e249d8e38d50e8237f52ea5a5d216.js"  data-config="~/static/js/f7701ee7c175f381696a96d48f86d84d.js" data-main="6189c51ccb17bcd5eda1bd5710b1854b.js" ></script>
<!--coolie@1.0.22-->
```

从`data-config`属性可知，构建之后的配置文件为`f7701ee7c175f381696a96d48f86d84d.js`:
```
/*coolie@1.0.22*/
coolie.config({base:"./",async:"async/",chunk:"chunk/",debug:!1,cache:!0,version:{"async/1.js":"afe948d32200ecb81c4afe43d7afed45","async/2.js":"141ae7e19078fca1a1e954507d545dcd","async/3.js":"d6bd0d7db45a9639d6c4e60697312b7f"}}).use();
```

从文件内容可见，`version`属性下多了 3 个属性值：
```
version: {
    "async/1.js":"afe948d32200ecb81c4afe43d7afed45",
    "async/2.js":"141ae7e19078fca1a1e954507d545dcd",
    "async/3.js":"d6bd0d7db45a9639d6c4e60697312b7f"
}
```


当异步加载`n.async("1",function(`的时候，coolie 会先查找异步目录，`async:"async/"`下的`1.js`，
然后去`version`里查找是否有对应的版本号，最终找到的文件就是`async/1.afe948d32200ecb81c4afe43d7afed45.js`。


