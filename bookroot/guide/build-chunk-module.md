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
新建一个`coolie-demo8`的目录，结构如下：
```
coolie-demo8
└── src                // 开发目录
    └── static         // 静态目录
        └── js         // js 目录
            ├── app    // 入口模块目录
            └── libs   // 脚本库模块

5 directories, 0 files
```

## 初始化文件
本 demo 要的是，显示今天的年月日。分别在 libs 目录下新建

- src/static/js/libs/year.js
- src/static/js/libs/month.js
- src/static/js/libs/date.js

三个 js 分别输出当前的年、月、日。

year.js：
```
define(function (require, exports, module){
	module.exports = function (){
		return new Date().getFullYear();
	};
});
```

month.js：
```
define(function (require, exports, module){
	module.exports = function (){
		return new Date().getMonth() + 1;
	};
});
```

date.js：
```
define(function (require, exports, module){
	module.exports = function (){
		return new Date().getDate();
	};
});
```

然后，在 app 目录下，新建两个 js ，分别属性今天的年、月和年、月、日。

- src/static/js/app/year-month.js
- src/static/js/app/year-month-date.js

year-month.js:
```
define(function (require, exports, module){
	var year = require('../libs/year.js');
	var month = require('../libs/month.js');

	alert('today is ' + year() + '-' + month());
});
```

year-month-date.js
```
define(function (require, exports, module){
	var year = require('../libs/year.js');
	var month = require('../libs/month.js');
	var date = require('../libs/date.js');

	alert('today is ' + year() + '-' + month() + '-' + date());
});
```

从上面的代码结构和文件划分，可以明显的看出来，`year.js`、`month.js`、`date.js`是可以作为公共模块来处理的。
按此不表，切换到 js 目录，下载模块加载器：

```
➜  cd static/js
➜  coolie install coolie

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

      install coolie >> http://s-ydr-me.oss-cn-hangzhou.aliyuncs.com/p/j/coolie.zip
        unzip coolie >> /var/folders/_8/nf73nk9d0yx_q_w6536gfr_80000gn/T/2015121610520100.zip
         coolie file >> /Users/cloudcome/development/localhost/coolie-demo8/src/static/js/coolie.js
         coolie file >> /Users/cloudcome/development/localhost/coolie-demo8/src/static/js/coolie.min.js
```

继续在 js 目录下新建模块加载器配置文件：
```
➜  coolie init -j

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /Users/cloudcome/development/localhost/coolie-demo8/src/static/js/coolie-config.js
```

不需要修改配置文件，因为默认的配置文件的`base`就是指向`app`目录。


返回 src 目录，新建两个 html 分别执行两个入口模块：

- src/year-month.html
- src/year-month-date.html

year-month.html：
```
<!doctype html>
<meta charset="utf-8">
<script coolie src="/static/js/coolie.js"
data-config="coolie-config.js"
data-main="year-month.js"></script>
```


year-month-date.html：
```
<!doctype html>
<meta charset="utf-8">
<script coolie src="/static/js/coolie.js"
data-config="coolie-config.js"
data-main="year-month-date.js"></script>
```

此时的目录结构为：
```
coolie-demo8
└── src                                    // 开发目录
    ├── static                             // 静态目录
    │   └── js                             // JS 目录
    │       ├── app                        // 入口模块目录
    │       │   ├── year-month-date.js
    │       │   └── year-month.js
    │       ├── coolie-config.js
    │       ├── coolie.js
    │       ├── coolie.min.js
    │       └── libs                        // 脚本库模块
    │           ├── date.js
    │           ├── month.js
    │           └── year.js
    ├── year-month-date.html
    └── year-month.html

5 directories, 10 files
```


## 前端构建前运行
在`src`目录下，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.255.75:58920
```

然后打开`year-month.html`

![](http://s.ydr.me/@/res/20151216110411312095878217 =509x405)


继续打开`year-month-date.html`

![](http://s.ydr.me/@/res/20151216110522999782889018 =533x433)


显然，执行是正确的。当然，此时是没有任何分块和公共模块的，
需要怎样抽象公共模块，继续往下看。


## 前端构建配置
在写配置之前，考虑下哪些模块可以作为公共模块。


从全局来看，`date.js`只被入口模块使用了一次，没必要作为公共模块，
`year.js`和`month.js`的使用率是 100%，有必要作为公共模块。

那么，就将`year.js`和`month.js`合并一起作为公共模块。

在 src 目录下，初始化配置文件：
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /Users/cloudcome/development/localhost/coolie-demo8/src/coolie.config.js
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
 * @create 2015-12-16 11:09:23
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
                './static/js/app/**'
            ],
            // coolie-config.js 路径
            'coolie-config.js': './static/js/coolie-config.js',
            // js 文件保存目录
            dest: './static/js/',
            // 分块配置
            chunk: [
                //【1】
                [
                    'year.js',
                    'month.j'
                ]
            ]
        },

        // html 构建
        html: {
            // html 文件
            src: [
                //【2】
                '*.html'
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
            //【3】
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

- 【1】：修改了 chunk 配置，配置数组里添加了一项，该项是个数组，包含了`year.js`和`month.js`
- 【2】：修改了 html 配置，修改为`*.html`表示构建所有的 html 后缀文件
- 【3】：去除了复制文件路径


## 前端构建
在 src 目录下，执行：
```

```


## 前端构建后运行
## 分析构建结果


