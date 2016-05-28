# 下载
使用 coolie demo 命令下载本 demo。
```
➜ coolie demo 9
```


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
```

然后新建一个 pages 目录，分别放置这些页面片段。

pages/a.js：
```
module.exports = function () {
    document.getElementById('demo').innerHTML = 'page a ' + Date.now();
};
```

pages/b.js：
```
module.exports = function () {
    document.getElementById('demo').innerHTML = 'page b ' + Date.now();
};
```

pages/404.js：
```
module.exports = function () {
    document.getElementById('demo').innerHTML = 'page 404 ' + Date.now();
};
```


- 在 `webroot-dev` 目录下，新建`package.json`。
- 在 `webroot-dev` 目录下，下载模块加载器`npm install --save coolie.js`。
- 初始化模块加载器配置文件`coolie init -j`。
- 修改`coolie-config.js` 的 `mainModulesDir: "/"` 配置，使其指向了根目录。

**省略了以上步骤的详细操作方式，详细参考 [demo1](./hello-world.md)。**


最后写`index.html`：
```
<!doctype html>
<meta charset="utf-8">
<style>
    #demo {
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

<script coolie
        src="/node_modules/coolie.js/coolie.js"
        data-config="/coolie-config.js"
        data-main="index.js"></script>
```

html 里分别加上了 4 个链接，来分别监听 hash 变化来异步载入不同的模块。




## 前端构建前运行
在`webroot-dev`目录下，使用[sts](https://www.npmjs.com/package/sts)启动。

![](https://dn-fed.qbox.me/@/res/20151215210528244027950280 =693x377)

从上面的 gif 动画中可以清楚的看到：

- 页面载入的时候，匹配的 hash 是 404 页面，此时载入了主模块和异步的 404 模块
- 当点击`pages/a`的时候，匹配的 hash 是 a 页面，此时载入了异步的 a 模块
- 当点击`pages/b`的时候，匹配的 hash 是 a 页面，此时载入了异步的 b 模块
- 当点击`pages/c`的时候，匹配的 hash 是 404 页面，此时并未重复载入 404 模块，而是直接执行了已经加载完成的 404 模块
- 当点击`pages/d`的时候，与上条相同


## 前端构建配置
前端构建也不复杂，使用命令初始化前端构建配置文件（`coolie.config.js`）

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
 * @version 1.6.5
 * @create 2016-01-26 21:42:33
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
- 【4】：去除了需要复制的文件路径


## 前端构建
在 webroot-dev 目录下，执行：
```
➜  coolie build

┌──────────────────────────────┐
│ coolie@2.0.0                 │
│ 前端工程化构建工具           │
│ 官网：https://coolie.ydr.me/ │
└──────────────────────────────┘


            step 1/6  >>  parse coolie-cli profile
       coolie config  >> /coolie-demo9/webroot-dev/coolie.config.js
         src dirname  >> /coolie-demo9/webroot-dev
        dest dirname  >> /coolie-demo9/webroot-pro/

            step 2/6  >>  copy files
          copy files  >>  no files are copied

            step 3/6  >>  build main modules
        parse module  >>  4 modules parsed
          build main  >>  will build 4 main modules
                 1/4  >>  /index.js
                 2/4  >>  /pages/a.js
                 3/4  >>  /pages/b.js
                 4/4  >>  /pages/404.js

            step 4/6  >>  generate coolie.js profile
    coolie-config.js  >>  mainModulesDir: "/static/js/main/"
    coolie-config.js  >>  asyncModulesDir: "../async/"
    coolie-config.js  >>  chunkModulesDir: "../chunk/"
    coolie-config.js  >>  callbacks: 0
    coolie-config.js  >>  ../webroot-pro/static/js/6d22eee322fab66f0f6a574a74d2dba6.js

            step 5/6  >>  build htmls
                 1/1  >>  /index.html

            step 6/6  >>  generate coolie map
          coolie map  >>  ../webroot-pro/coolie-map.json

       build success  >>  elapsed 543ms, at 2016-05-28 22:26:52.578
```

从实时打印的构建日志来看：

- 构建的入口模块不止`index.js`，还有`pages/a.js`、`pages/b.js`和`pages/404.js`
- 构建之后的版本信息，多了`async/1.js`、`async/2.js`和`async/3.js`

从目录结构也可以看出，原来的`pages`目录已经不存在了，并且多了一个`async`目录。


## 前端构建后运行
切换到 webroot-pro 目录，使用[sts](https://www.npmjs.com/package/sts)执行：

![](https://dn-fed.qbox.me/@/res/20151215211809774557246544 =693x377)

表现的情况与构建之前是一致的，唯一不同的时候控制台打印的日志要少很多。


## 分析构建结果
### coolie-map
首先分析下`coolie-map.json`（[深度解析点这里](/introduction/resource-relationship-map.md)）：
```
{
  "/index.html": {
    "main": [
      {
        "src": "../webroot-dev/index.js",
        "dest": "/static/js/main/71b6a58839bc79bd924418ad47923722.js",
        "deps": []
      }
    ],
    "js": [
      {
        "dest": "/static/js/0996319be2c4f9517575b54dcc4af897.js",
        "deps": [
          "../webroot-dev/node_modules/coolie.js/coolie.js"
        ]
      }
    ],
    "css": [],
    "res": []
  }
}
```

可见的是，内容比之前的 demo 要多，最主要的是 async 里有一个数组，数组里展示是异步模块的信息。


### 入口模块
接下来，看看入口模块（`71b6a58839bc79bd924418ad47923722.js`，已格式化）:
```
/*coolie built*/
define("0", [], function (n, o, a) {
    var c = function (o) {
        "#a" === location.hash ? n.async("4", function (n) {
            n()
        }) : "#b" === location.hash ? n.async("5", function (n) {
            n()
        }) : n.async("6", function (n) {
            n()
        })
    };
    window.onhashchange = c;
    setTimeout(c, 0)
});
```


### 异步模块
简单的看了下，入口模块竟然只有一个模块，三个异步没有被打包进来（这也是异步模块的特点）。

```
function(require, exports, module)
function(n,       o,       a)
```

上下一一对比，异步模块载入的方法应该是`n.async()`，通过搜索可以找到：

```
n.async("1",function(
n.async("2",function(
n.async("3",function(
```

构建前后的一一对比，路径与 ID 的对应关系为：
```
pages/a.js => 4
pages/b.js => 5
pages/404.js => 6
```

不止是同步模块的路径会被压缩，连异步模块的路径也会被压缩。


### index.html
接下来去看看`index.html`（已格式化）：
```
<!doctype html>
<meta charset="utf-8">
<style>#demo {
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 20px
}</style>
<div id="demo"></div> <p><a href="#a">pages/a</a></p><p><a href="#b">pages/b</a></p><p><a href="#c">pages/c</a></p><p><a
        href="#d">pages/d</a></p>
<script src="/static/js/0996319be2c4f9517575b54dcc4af897.js"
        data-config="/static/js/6d22eee322fab66f0f6a574a74d2dba6.js"
        data-main="71b6a58839bc79bd924418ad47923722.js"></script>
<!--coolie built-->
```


### coolie-config.js
从`data-config`属性可知，构建之后的配置文件为`6d22eee322fab66f0f6a574a74d2dba6.js`（已格式化）:
```
/*coolie built*/
coolie.config({
    debug: !1,
    mode: "AMD",
    asyncModulesMap: {
        4: "6039b8b176c5b79d8689eadc6cfa0840",
        5: "546a0fa8aecd9ddee215f899080ce728",
        6: "4e06aa7b5770cf4cc779c5976a269e91"
    },
    chunkModulesMap: {},
    built: "coolie@2.0.0",
    mainModulesDir: "/static/js/main/",
    asyncModulesDir: "../async/",
    chunkModulesDir: "../chunk/",
    global: {}
}).use();
```

从文件内容可见，`asyncModulesMap`属性下多了 3 个属性值：
```
asyncModulesMap: {
    4: "6039b8b176c5b79d8689eadc6cfa0840",
    5: "546a0fa8aecd9ddee215f899080ce728",
    6: "4e06aa7b5770cf4cc779c5976a269e91"
}
```


当异步加载`n.async("1",function(`的时候，coolie 会先查找异步目录，`async:"async/"`下的`1.js`，
然后去`asyncModulesMap`里查找是否有对应的版本号，最终找到的文件就是`async/4.6039b8b176c5b79d8689eadc6cfa0840.js`。


# github
<https://github.com/cooliejs/coolie-demo9/>

