# 下载
使用 coolie demo 命令下载本 demo。
```
➜ coolie demo 10
```



# 公共模块
在介绍分块模块之前，来说些公共模块。
当一个项目逐渐壮大的时候，势必会出现一些公共模块。
如何分配和处理这些公共模块，需要全局考虑，是一个不小的利弊权衡。

如工程里共有 20 个入口模块， 
5 个入口模块引用了同一个模块 a，
10 个入口模块引用了同一个模块 b，
15 个入口模块引用了同一个模块 c，
20 个入口模块引用了同一个模块 d。

如何分配这 4 个公共模块呢？

- 全部打包在一起，即每个入口模块都将 a、b、c、d 四个模块都合并进去。
- a 模块不打包进来，即每个入口模块都将 b、c、d 三个模块都合并进去。
- a、b 模块不打包进来，即每个入口模块都将 c、d 两个模块都合并进去。
- a、b、c 模块不打包进来，即每个入口模块只将 d 模块都合并进去。
- a、b、c、d 四个模块都不打包，即每个入口模块根据自身情况加载属于自己的模块，就丧失了公共模块的特征。


# 分块策略
基于上述的 5 种要求，对应着 5 种分块策略：

## 策略1
```
chunk: [
    'a|b|c|d'   // a、b、c、d 合并作为一个公共模块，此时会被 5 个入口模块引用（以最小引用数量的 a 模块为准）
]
```

## 策略2
```
chunk: [
    'b|c|d'   // b、c、d 合并作为一个公共模块，此时会被 10 个入口模块引用（以最小引用数量的 b 模块为准）
]
```

## 策略3
```
chunk: [
    'c|d'   // c、d 合并作为一个公共模块，此时会被 15 个入口模块引用（以最小引用数量的 c 模块为准）
]
```


## 策略4
```
chunk: [
    'd'   // d 作为一个公共模块，此时会被 20 个入口模块引用
]
```


## 策略5
```
chunk: [
    // 空，没有公共模块
]
```

是不是只有这 5 种分块策略？当然不止：

## 策略6
```
chunk: [
    'a',     // a 作为一个公共模块，此时会被 5 个入口模块引用
    'b|c|d'  // b、c、d 合并作为一个公共模块，此时会被 10 个入口模块引用（以最小引用数量的 b 模块为准）
]
```

## 策略7
```
chunk: [
    'a',     // a 作为一个公共模块，此时会被 5 个入口模块引用
    'b',     // b 作为一个公共模块，此时会被 10 个入口模块引用
    'c|d'    // c、d 合并作为一个公共模块，此时会被 15 个入口模块引用（以最小引用数量的 c 模块为准）
]
```


## 策略8
```
chunk: [
    'a',     // a 作为一个公共模块，此时会被 5 个入口模块引用
    'b',     // b 作为一个公共模块，此时会被 10 个入口模块引用
    'c',     // c 作为一个公共模块，此时会被 15 个入口模块引用
    'c',     // d 作为一个公共模块，此时会被 20 个入口模块引用
]
```


## 策略9
```
chunk: [
    'a|b',   // a、b 合并作为一个公共模块，此时会被 5 个入口模块引用（以最小引用数量的 a 模块为准）
    'c',     // c 作为一个公共模块，此时会被 15 个入口模块引用
    'c',     // d 作为一个公共模块，此时会被 20 个入口模块引用
]
```

这种排列组合的问题，这里就不一一展示了。
关于公共模块，都是需要站在工程角度全盘考虑，需要有全局眼光，轻重之间，取舍有道。



# demo
## 初始化目录结构
新建一个`coolie-demo10`的目录，结构如下：
```
.
└── webroot-dev        // 开发目录
    └── static         // 静态目录
        └── js         // js 目录
            ├── main   // 入口模块目录
            └── libs   // 脚本库模块

5 directories, 0 files
```

## 初始化文件
本 demo 要的是，显示今天的年月日。分别在 libs 目录下新建

- webroot-dev/static/js/libs/year.js
- webroot-dev/static/js/libs/month.js
- webroot-dev/static/js/libs/date.js

三个 js 分别输出当前的年、月、日。

### year.js
```
module.exports = function () {
    return new Date().getFullYear();
};
```

### month.js
```
module.exports = function () {
    return new Date().getMonth() + 1;
};
```

### date.js
```
module.exports = function () {
    return new Date().getDate();
};
```

然后，在 main 目录下，新建两个 js ，分别属性今天的年、月和年、月、日。

- webroot-dev/static/js/main/year-month.js
- webroot-dev/static/js/main/year-month-date.js

### year-month.js
输出当前的年、月
```
var year = require('../libs/year.js');
var month = require('../libs/month.js');

alert('today is ' + year() + '-' + month());
```

### year-month-date.js
输出当前的年、月、日
```
var year = require('../libs/year.js');
var month = require('../libs/month.js');
var date = require('../libs/date.js');

alert('today is ' + year() + '-' + month() + '-' + date());
```

从上面的代码结构和文件划分，可以明显的看出来，`year.js`、`month.js`、`date.js`是可以作为公共模块来处理的。

### coolie.js

- webroot-dev 目录下新建 `package.json`
- webroot-dev 目录下下载模块加载器 `npm install --save coolie.js`


### coolie-config.js
在 js 目录下新建模块加载器配置文件：
```
➜  coolie init -j

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.5                       │
│ The front-end development builder. │
└────────────────────────────────────┘
        init success >> /coolie-demo10/src/static/js/coolie-config.js
```

不需要修改配置文件。


返回 webroot-dev 目录，新建两个 html 分别执行两个入口模块：

- webroot-dev/year-month.html
- webroot-dev/year-month-date.html

### year-month.html
输出当前的年、月
```
<!doctype html>
<meta charset="utf-8">
<script coolie src="/node_modules/coolie.js/coolie.js"
        data-config="/static/js/coolie-config.js"
        data-main="year-month.js"></script>`
```


### year-month-date.html
输出当前的年、月、日
```
<!doctype html>
<meta charset="utf-8">
<script coolie src="/node_modules/coolie.js/coolie.js"
        data-config="/static/js/coolie-config.js"
        data-main="year-month-date.js"></script>
```


## 前端构建前运行
在`src`目录下，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.255.75:58920
```

然后打开`year-month.html`

![](https://dn-fed.qbox.me/@/res/20151216110411312095878217 =509x405)


继续打开`year-month-date.html`

![](https://dn-fed.qbox.me/@/res/20151216110522999782889018 =533x433)


显然，执行是正确的。当然，此时是没有任何分块和公共模块的，
需要怎样抽象公共模块，继续往下看。


## 前端构建配置
在写配置之前，考虑下哪些模块可以作为公共模块。

从全局来看，`date.js`只被入口模块使用了一次，没必要作为公共模块，
`year.js`和`month.js`的使用率是 100%，有必要作为公共模块。

那么，就将`year.js`和`month.js`合并一起作为公共模块。

在 webroot-dev 目录下，初始化配置文件：
```
➜  coolie init -c

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.5                       │
│ The front-end development builder. │
└────────────────────────────────────┘

        init success >> /coolie-demo10/src/coolie.config.js
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
 * @version 1.6.5
 * @create 2016-01-26 22:00:17
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
                './static/js/main/**/*.js'
            ],
            // coolie-config.js 路径，相对于当前文件
            'coolie-config.js': './static/js/coolie-config.js',
            // js 文件保存目录，相对于 dest.dirname
            dest: './static/js/',
            // 分块配置
            chunk: [
                //【1】
                "static/js/libs/**.js"
            ]
        },

        // html 构建
        html: {
            // html 文件，相对于当前文件
            src: [
                // 支持 glob 语法
                //【2】
                '*.html'
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
            //【3】
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

- 【1】：修改了 chunk 配置，配置数组里添加了一项，指定了 libs 下的模块可以作为公共模块，并交给构建工具自动管理
- 【2】：修改了 html 配置，修改为`*.html`表示构建所有的 html 后缀文件
- 【3】：去除了复制文件路径


## 前端构建
在 webroot-dev 目录下，执行前端构建：
```
➜  coolie build


┌──────────────────────────────┐
│ coolie@2.0.0                 │
│ 前端工程化构建工具           │
│ 官网：https://coolie.ydr.me/ │
└──────────────────────────────┘


            step 1/6  >>  parse coolie-cli profile
       coolie config  >>  /coolie-demo10/webroot-dev/coolie.config.js
         src dirname  >>  /coolie-demo10/webroot-dev
        dest dirname  >>  /coolie-demo10/webroot-pro/

            step 2/6  >>  copy files
          copy files  >>  no files are copied

            step 3/6  >>  build main modules
        parse module  >>  5 modules parsed
          build main  >>  will build 2 main modules
                 1/2  >>  /static/js/main/year-month-date.js
                 2/2  >>  /static/js/main/year-month.js

            step 4/6  >>  generate coolie.js profile
    coolie-config.js  >>  mainModulesDir: "/static/js/main/"
    coolie-config.js  >>  asyncModulesDir: "../async/"
    coolie-config.js  >>  chunkModulesDir: "../chunk/"
    coolie-config.js  >>  callbacks: 0
    coolie-config.js  >>  ../webroot-pro/static/js/287a2adf0b6a17e0b667d11d009a4364.js

            step 5/6  >>  build htmls
                 1/2  >>  /year-month-date.html
                 2/2  >>  /year-month.html

            step 6/6  >>  generate coolie map
          coolie map  >>  ../webroot-pro/coolie-map.json

       build success  >>  elapsed 461ms, at 2016-05-29 21:36:41.392
```

从构建日志可以看出，确实多了一个 chunk 信息。先来看看构建之后的 webroot-pro 目录结构：
```
webroot-pro
├── coolie-map.json
├── static
│   └── js
│       ├── 0996319be2c4f9517575b54dcc4af897.js
│       ├── 287a2adf0b6a17e0b667d11d009a4364.js
│       ├── chunk
│       │   └── 0.d2f1d7c36aa7dd4588172993b6548c6d.js
│       └── main
│           ├── c3c0e8c986b8dcdcfc3405f65f5b83ec.js
│           └── ff3cb2ca5aafd9ec63e6c2efe56dcf78.js
├── year-month-date.html
└── year-month.html

4 directories, 8 files
```

从目录结构也很容易看到，确实多了一个 chunk 目录，里面有一个 chunk 模块。


## 前端构建后运行
切换到 webroot-pro 目录，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  cd ../webroot-pro
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.185:60728

```

然后打开`year-month.html`：

![](https://dn-fed.qbox.me/@/res/20151216112025472255258586 =610x574)

- 【1】：加载了入口模块
- 【2】：加载了分块模块


继续打开`year-month-date.html`：

![](https://dn-fed.qbox.me/@/res/20151216112245225008227927 =514x551)


- 【1】：加载了入口模块
- 【2】：加载了分块模块


从两张图，可以明显的看出来【2】确实成为了公共模块。



## 分析构建结果

### coolie-map
首先看下`coolie-map.json`（[深度解析点这里](/introduction/resource-relationship-map.md)）：

```
{
  "/year-month-date.html": {
    "main": [
      {
        "src": "../webroot-dev/static/js/main/year-month-date.js",
        "dest": "/static/js/main/c3c0e8c986b8dcdcfc3405f65f5b83ec.js",
        "deps": [
          "../webroot-dev/static/js/libs/year.js",
          "../webroot-dev/static/js/libs/month.js",
          "../webroot-dev/static/js/libs/date.js"
        ]
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
  },
  "/year-month.html": {
    "main": [
      {
        "src": "../webroot-dev/static/js/main/year-month.js",
        "dest": "/static/js/main/ff3cb2ca5aafd9ec63e6c2efe56dcf78.js",
        "deps": [
          "../webroot-dev/static/js/libs/year.js",
          "../webroot-dev/static/js/libs/month.js"
        ]
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


从内容可以看出来各自页面引用的入口模块，以及他们的依赖关系。
来分别看看构建之后的两个入口模块：


### year-month-date.js
c3c0e8c986b8dcdcfc3405f65f5b83ec.js：
```
/*coolie built*/
define("0",["1","2","3"],function(a,e,i){var n=a("1"),t=a("2"),d=a("3");alert("today is "+n()+"-"+t()+"-"+d())});
define("3",[],function(e,n,t){t.exports=function(){return(new Date).getDate()}});
coolie.chunk(["0"]);
```

这里最明显的变化就是在代码的最后一行添加了`coolie.chunk`，参数是一个数组，数组只有一项`"0"`。
从字面可以理解，coolie 加载了 chunk 模块 ID 为 0 的 chunk 模块。

从代码上看，确实没有了`year.js`和`month.js`的痕迹，只有`date.js`的代码。

### year-month.js
ff3cb2ca5aafd9ec63e6c2efe56dcf78.js：
```
/*coolie built*/
define("0",["1","2"],function(a,e,i){var n=a("1"),t=a("2");alert("today is "+n()+"-"+t())});
coolie.chunk(["0"]);
```

这里的代码就更简单了，只有一个入口模块，和一个`coolie.chunk`， `year.js`和`month.js`是公共模块，自然不在代码里。


### chunk0
最后来看看 chunk 模块吧：

0.d2f1d7c36aa7dd4588172993b6548c6d.js：
```
/*coolie built*/
define("1",[],function(e,n,t){t.exports=function(){return(new Date).getFullYear()}});
define("2",[],function(n,e,t){t.exports=function(){return(new Date).getMonth()+1}});
```

chunk 模块是一个模块片段，包含了`year.js`和`month.js`的内容。

至此，完整的加载方式如下：

```
year-month.html => chunk0
                         => year + month  
                => year + month
                   
year-month-date.html => date + chunk0
                                     => year + month
                     => date + year + month
```

将 chunk 机制发挥到极致，就是一个网站全盘考虑的极致。


# github
<https://github.com/cooliejs/coolie-demo10>
