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

        init success >> /coolie-demo7/webroot-dev/coolie-config.js
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
    nodeModulesDir: '/node_modules/',【1】

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

- 【1】：修改了`nodeModulesDir`属性值为`/`，表示入口模块目录为根目录。


### 下载使用 node 模块
```
➜  npm install --save blear.utils.typeis

blear.utils.typeis@1.0.2 node_modules/blear.utils.typeis
```


### index.js
然后我们来写入口模块了，新建`index.js`：
```
// index.js
var date = require('./date.js');
var typeis = require('blear.utils.typeis');

alert('date typeis ' + typeis(date));
```


### date.js
然后新建`date.js`:
```
// date.js
module.exports = new Date();
```

依赖链条很清晰：
```
index.js ==依赖于==> date.js + blear.utils.typeis
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



## 前端构建前运行
在`webroot-dev`目录下，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.192:51741
```

![](https://dn-fed.qbox.me/@/res/20160528203902309811564321 =420x153)

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
在`webroot-dev`目录下执行前端构建：
```
➜  coolie build

┌──────────────────────────────┐
│ coolie@2.0.0                 │
│ 前端工程化构建工具           │
│ 官网：https://coolie.ydr.me/ │
└──────────────────────────────┘


            step 1/6  >>  parse coolie-cli profile
       coolie config  >>  /coolie-demo7/webroot-dev/coolie.config.js
         src dirname  >>  /coolie-demo7/webroot-dev
        dest dirname  >>  /coolie-demo7/webroot-pro/

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
切换到`webroo-pro`（构建之后的目录），使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  cd ../webroot-pro
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.192:51741
```

![](https://dn-fed.qbox.me/@/res/20160528203902309811564321 =420x153)



## 分析构建结果
来分别看下构建之后的文件内容吧，先看`coolie-map.json`：
```
{
  "/index.html": {
    "main": [
      {
        "src": "../webroot-dev/index.js",
        "dest": "/static/js/main/5f74f36f0751b44b4f8f3b9d9788b234.js",
        "deps": [
          "../webroot-dev/date.js",
          "../webroot-dev/node_modules/blear.utils.typeis/src/index.js"
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
构建之后的路径为`/static/js/main/5f74f36f0751b44b4f8f3b9d9788b234.js`，
该入口模块依赖了一个模块`../src/date.js`。

先看入口模块文件（`5f74f36f0751b44b4f8f3b9d9788b234.js`）：
```
/*coolie built*/
define("0",["1","2"],function(e,t,a){var i=e("1"),n=e("2");alert("date typeis "+n(i))});
define("1",[],function(e,n,t){t.exports=new Date});
define("2",[],function(e,n,t){"use strict";var r="undefined",o=function(e){return void 0!==e},u=t.exports=function(e){if(typeof e===r)return r;if(e&&e===e.window)return"window";if(typeof document!==r&&e===document)return"document";if(null===e)return"null";if(e!==e)return"nan";var n=Object.prototype.toString.call(e).slice(8,-1).toLowerCase();if(1===e.nodeType&&e.nodeName)return"element";try{if("object"===n&&"callee"in e&&o(e))return"arguments"}catch(t){}return n},i=function(e){return function(n){return u(n)===e}};u.String=i("string");u.Number=i("number");u.Array=i("array");u.Object=i("object");u.Function=i("function");u.Null=i("null");u.Undefined=i("undefined");u.Regexp=u.RegExp=i("regexp");u.Boolean=i("boolean");u.Window=i("window");u.Document=i("document");u.Element=i("element");u.Nan=u.NaN=i("nan");u.Arguments=i("arguments");u.Date=i("date");u.Error=i("error")});
```

从文件内容上可以清晰的看到：

- 入口模块的 ID 为 0，依赖了一个ID 为 1 和 2 两个模块
- ID 为 1 的模块在第 2 行
- ID 为 2 的模块在第 3 行
- 模块的路径都压缩成了单个字符
- 模块的内的`require`、`exports`和`module`都经过了压缩
- 文件开头打上了 coolie 的标记

然后再来看看`index.html`（已格式化）：
```
<!doctype html>
<meta charset="utf-8">
<script src="/static/js/0996319be2c4f9517575b54dcc4af897.js"
        data-config="/static/js/334e1ea3301b33071eb3c5c1a510fd2d.js"
        data-main="5f74f36f0751b44b4f8f3b9d9788b234.js"></script>
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
        data-main="5f74f36f0751b44b4f8f3b9d9788b234.js"></script>
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

