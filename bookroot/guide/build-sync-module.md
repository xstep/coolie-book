# 下载
使用 coolie demo 命令下载本 demo。
```
➜ coolie demo 7
```



# 同步模块

这里的同步模块指的是运行时，该模块是同步载入的（类似 NodeJS 里的 `require`）。

```
require('module1');  // 运行到这里，module1 载入

require('module2');  // 运行到这里，module2 载入
```

# demo
## 初始化目录
新建`coolie-demo7`，目录结构为：
```
coolie-demo7
└── webroot-dev

1 directory, 0 files
```

## 初始化文件
### package.json
在 `webroot-dev` 根目录下新建 `package.json`：
```
{
  "name": "coolie-demo7-webroot",
  "version": "2.0.0"
}
```


### coolie.js
先下载模块加载器（coolie.js）：
```
➜  cd webroot-dev
➜  npm install --save coolie.js

coolie.js@2.0.8 node_modules/coolie.js
```

### coolie-config.js
如果你感兴趣，可以简单的看看`coolie.js`的源代码。
接下来，我们来初始化模块加载器的配置文件：
```
➜  coolie init -j

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘

        init success >> /coolie-demo7/src/coolie-config.js
```

修改为：
```
/**
 * ======================================================
 * coolie.js 配置文件 `coolie-config.js`
 * 使用 `coolie init -j` 生成 `coolie-config.js` 文件模板
 * 前端模块加载器配置文件
 *
 * @link http://coolie.ydr.me/guide/coolie-config.js/
 * @author ydr.me
 * @version 2.0.0
 * @create 2016-05-28 20:05:12
 * ======================================================
 */

coolie.config({
    // 模块模式，开发环境为 COMMONJS
    mode: 'CJS',

    // 入口模块基准路径，相对于当前文件
    mainModulesDir: '/',

    // node_modules 目录指向，相对于 mainModulesDir
    nodeModulesDir: '/node_modules/',

    // 手动指定 node 模块的入口文件，此时将不会去加载模块的 package.json
    // 除非你非常肯定，你加载的 node 模块的入口路径都是一致的
    // 否则不要修改配置此项
    // nodeModuleMainPath: 'src/index.js',

    // 是否为调试模式，构建之后会修改为 false
    debug: true,

    // 全局变量，用于模块构建的预定义变量判断压缩
    global: {}
}).use();
```

修改了`nodeModulesDir`属性值为`/`，表示入口模块目录为根目录。


### index.js
然后我们来写入口模块了，新建`index.js`：
```
// index.js
var date = require('./date.js');

alert('today is ' + date.format());
```


### date.js
然后新建`date.js`:
```
// date.js
exports.format = function () {
    var now = new Date();

    return [
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
    ].join('-');
};
```

依赖链条很清晰：
```
index.js ==依赖于==> date.js
```

然后，来新建`index.html`：
```
<!doctype html>
<meta charset="utf-8">

<!--注意：-->
<!--1. 这里的 script 标签多了 coolie 属性-->
<!--2. 引用了 coolie.min.js-->
<!--3. 增加了 data-config 属性-->
<!--4. 增加了 data-main 属性-->
<script coolie src="/node_modules/coolie.js/coolie.js"
        data-config="/coolie-config.js"
        data-main="index.js"></script>
```

1. `coolie`属性：表明该 script 是 coolie-cli（前端开发构建工具） 的管辖范围
2. `coolie.min.js`：前端模块加载器
3. `data-config`属性：前端模块加载器配置文件
4. `data-main`属性：模块入口文件地址，相对于`data-config.js`里的`mainModulesDir`属性（[详细点这里](./coolie-config.js.md)）

此时，目录结构为：
```
coolie-demo7
└── webroot-dev
   ├── coolie-config.js
   ├── coolie.config.js
   ├── coolie.js
   ├── coolie.min.js
   ├── date.js
   ├── index.html
   ├── index.js
   ├── node_modules
   │   └── coolie.js
   └── package.json

2 directories, 8 files
```


## 前端构建前运行
在`webroot-dev`目录下，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.192:62700
```

![](https://dn-fed.qbox.me/@/res/20160126180723653436449822 =576x356)

如上图：

- 在浏览器控制台打印了当前页面载入的模块，以及经过的时间
- 正确的弹出了对话框，执行了模块方法



## 前端构建配置
使用命令生成前端构建工具配置文件：
```
➜  coolie init -c

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘

        init success >> /coolie-demo7/src/coolie.config.js
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
 * @create 2016-01-26 16:44:00
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
                './inedx.js'
            ],
            // coolie-config.js 路径，相对于当前文件
            'coolie-config.js': './coolie-config.js',
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
            //【4】
            // 支持 glob 语法
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


- 【1】：修改入口文件路径为`index.js`，相对于配置文件所在的目录
- 【2】：修改配置文件路径为`coolie.config.js`，相对于配置文件所在的目录
- 【3】：修改 html 文件路径为`index.html`，相对于配置文件所在的目录
- 【4】：移除了需要复制的文件配置



## 前端构建
此时目录结构为：
```
.
└── webroot-dev
    ├── coolie-config.js
    ├── coolie.config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── date.js
    ├── index.html
    └── index.js

1 directory, 7 files
```

在`webroot-dev`目录下执行前端构建：
```
➜  coolie build

┌──────────────────────────────┐
│ coolie@2.0.0                 │
│ 前端工程化构建工具           │
│ 官网：https://coolie.ydr.me/ │
└──────────────────────────────┘


            step 1/6  >>  parse coolie-cli profile
       coolie config  >>  /Users/cloudcome/development/github-cooliejs/coolie-demo7/webroot-dev/coolie.config.js
         src dirname  >>  /Users/cloudcome/development/github-cooliejs/coolie-demo7/webroot-dev
        dest dirname  >>  /Users/cloudcome/development/github-cooliejs/coolie-demo7/webroot-pro/

            step 2/6  >>  copy files
          copy files  >>  no files are copied

            step 3/6  >>  build main modules
        parse module  >>  2 modules parsed
          build main  >>  will build 1 main modules
                 1/1  >>  /index.js

            step 4/6  >>  generate coolie.js profile
    coolie-config.js  >>  mainModulesDir: "/static/js/main/"
    coolie-config.js  >>  asyncModulesDir: "../async/"
    coolie-config.js  >>  chunkModulesDir: "../chunk/"
    coolie-config.js  >>  callbacks: 0
    coolie-config.js  >>  ../webroot-pro/static/js/334e1ea3301b33071eb3c5c1a510fd2d.js

            step 5/6  >>  build htmls
                 1/1  >>  /index.html

            step 6/6  >>  generate coolie map
          coolie map  >>  ../webroot-pro/coolie-map.json

       build success  >>  elapsed 430ms, at 2016-05-28 20:12:41.624
```


## 前端构建后运行
构建之后的目录结构为：
```
.
├── readme.md
├── webroot-dev
│   ├── coolie-config.js
│   ├── coolie.config.js
│   ├── coolie.js
│   ├── coolie.min.js
│   ├── date.js
│   ├── index.html
│   ├── index.js
│   ├── node_modules
│   │   └── coolie.js
│   │       ├── bs-config.js
│   │       ├── coolie.js
│   │       ├── coolie.min.js
│   │       ├── karma.conf.js
│   │       ├── package.json
│   │       ├── readme.md
│   │       ├── test
│   │       │   ├── modules
│   │       │   └── test.main.js
│   │       ├── todo.md
│   │       └── version.md
│   └── package.json
└── webroot-pro
    ├── coolie-map.json
    ├── index.html
    └── static
        └── js
            ├── 0996319be2c4f9517575b54dcc4af897.js
            ├── 334e1ea3301b33071eb3c5c1a510fd2d.js
            └── main
                └── a122d19654d3cec7f22b605bc4c74308.js

9 directories, 23 files
```

切换到`webroo-pro`（构建之后的目录），使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  cd ../webroot-pro
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.167:52983
```

运行结果

![](https://dn-fed.qbox.me/@/res/20160126180623193976363756 =528x343)

- 控制台打印了刚刚加载的模块信息，以及运行时间（从构建之前的33ms到构建之后的20ms）
- 正确的执行了模块方法


## 分析构建结果
来分别看下构建之后的文件内容吧，先看`coolie-map.json`：
```
{
  "/index.html": {
    "main": [
      {
        "src": "../webroot-dev/index.js",
        "dest": "/static/js/main/a122d19654d3cec7f22b605bc4c74308.js",
        "deps": [
          "../webroot-dev/date.js"
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

从文件内容上很容易的看出来，构建的 html 为 `index.html`，
该 html 文件依赖了一个入口文件`../webroot-dev/index.js`，
构建之后的路径为`/static/js/main/a122d19654d3cec7f22b605bc4c74308.js`，
该入口模块依赖了一个模块`../src/date.js`。

先看入口模块文件（`a122d19654d3cec7f22b605bc4c74308.js`）：
```
/*coolie built*/
define("0",["1"],function(a,t,e){var f=a("1");alert("today is "+f.format())});
define("1",[],function(e,t,n){t.format=function(){var e=new Date;return[e.getFullYear(),e.getMonth()+1,e.getDate()].join("-")}});
```

从文件内容上可以清晰的看到：

- 入口模块的 ID 为 0，依赖了一个ID 为 1 的模块
- ID 为 1 的模块在第 2 行
- 模块的路径都压缩成了单个字符
- 模块的内的`require`、`exports`和`module`都经过了压缩
- 文件开头打上了 coolie 的标记

然后再来看看`index.html`（已格式化）：
```
<!doctype html>
<meta charset="utf-8">
<script src="/static/js/0996319be2c4f9517575b54dcc4af897.js"
        data-config="/static/js/334e1ea3301b33071eb3c5c1a510fd2d.js"
        data-main="a122d19654d3cec7f22b605bc4c74308.js"></script>
<!--coolie built-->
```

可以明显的看出，`<script>`标签上的属性变化很大：
```
<script coolie src="/node_modules/coolie.js/coolie.js"
        data-config="/coolie-config.js"
        data-main="index.js"></script>

=>

<script src="/static/js/0996319be2c4f9517575b54dcc4af897.js"
        data-config="/static/js/334e1ea3301b33071eb3c5c1a510fd2d.js"
        data-main="a122d19654d3cec7f22b605bc4c74308.js"></script>
```

一一对应来看：

- `coolie`：这个属性标记被删除了
- `src`：原始的资源被版本管理了
- `data-config`：配置文件的路径也被修改了
- `data-main`：入口模块的文件名也变化了

接下来，看看配置文件（334e1ea3301b33071eb3c5c1a510fd2d.js，已格式化）吧：
```
/*coolie built*/
coolie.config({
    debug: !1,
    mode: "AMD",
    asyncModulesMap: {},
    chunkModulesMap: {},
    built: "coolie@2.0.0",
    mainModulesDir: "/static/js/main/",
    asyncModulesDir: "../async/",
    chunkModulesDir: "../chunk/",
    global: {}
}).use();
```
配置文件里多了很多配置信息，[详细点这里阅读](/document/coolie-config.js.md)。


# github
<https://github.com/cooliejs/coolie-demo7>

