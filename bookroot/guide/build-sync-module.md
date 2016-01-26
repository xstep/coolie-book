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
### coolie.js
先下载模块加载器（coolie.js）：
```
➜  cd webroot-dev
➜  coolie install coolie.js
┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘
   install coolie.js >> http://s-ydr-me.oss-cn-hangzhou.aliyuncs.com/p/j/coolie.zip
     unzip coolie.js >> /var/folders/_8/nf73nk9d0yx_q_w6536gfr_80000gn/T/2016012616381600.zip
      coolie.js file >> /Users/cloudcome/development/github/coolie-demo7/coolie.js
      coolie.js file >> /Users/cloudcome/development/github/coolie-demo7/coolie.min.js
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
 * @version 1.0.22
 * @create 2015-12-14 16:43:22
 * ======================================================
 */

coolie.config({
    // 入口模块基准路径，相对于当前文件
    base: './'
}).use();
```

修改了`base`属性值为`./`，表示入口模块相对于`coolie-config.js`所在的`src`目录。


### index.js
然后我们来写入口模块了，新建`index.js`：
```
// index.js
define(function (require, exports, module){
	var date = require('date.js');

	alert('today is ' + date.format());
});
```

然后新建`date.js`:
```
// date.js
define(function (require, exports, module){
	exports.format = function(){
		var now = new Date();

		return [
			now.getFullYear(), 
			now.getMonth() + 1,
			now.getDate()
		].join('-');
	};
});
```

依赖链条很清晰：
```
index.js => date.js
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
<script coolie src="./coolie.min.js"
        data-config="./coolie-config.js"
        data-main="index.js"></script>
```

1. `coolie`属性：表明该 script 是 coolie-cli（前端开发构建工具） 的管辖范围
2. `coolie.min.js`：前端模块加载器
3. `data-config`属性：前端模块加载器配置文件
4. `data-main`属性：模块入口文件地址，相对于`data-config.js`里的`base`属性（[详细点这里](./coolie-config.js.md)）

此时，目录结构为：
```
coolie-demo5
└── src
    ├── coolie-config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── date.js
    ├── index.html
    └── index.js

1 directory, 6 files
```


## 前端构建前运行
在`src`目录下，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.167:52983
```

![](https://dn-fed.qbox.me/@/res/20151214170821341124760909 =565x379)

如上图：

- 在浏览器控制台打印了当前页面载入的模块，以及经过的时间
- 正确的弹出了对话框，执行了模块方法



## 前端构建配置
使用命令生成前端构建工具配置文件：
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /coolie-demo5/src/coolie.config.js
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
 * @create 2015-12-14 21:34:36
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


- 【1】：修改入口文件路径为`index.js`，相对于配置文件所在的目录
- 【2】：修改配置文件路径为`coolie.config.js`，相对于配置文件所在的目录
- 【3】：修改 html 文件路径为`index.html`，相对于配置文件所在的目录
- 【4】：移除了需要复制的文件配置



## 前端构建
此时目录结构为：
```
coolie-demo5
└── src
    ├── coolie-config.js
    ├── coolie.config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── date.js
    ├── index.html
    └── index.js

1 directory, 7 files
```

在`src`目录下执行前端构建：
```
➜  coolie build

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝


                 1/6 >> parse coolie config
       coolie config >> /coolie-demo5/src/coolie.config.js
         src dirname >> /coolie-demo5/src
        dest dirname >> /coolie-demo5/dest/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
                   √ >> /index.js

                 4/6 >> override coolie-config.js
                   √ >> base: "./"
                   √ >> async: "async/"
                   √ >> chunk: "chunk/"
                   √ >> version: "{}"
                   √ >> callbacks: 0
                   √ >> ../dest/static/js/79f9ed3283181085347bfea15ac65773.js

                 5/6 >> build html
                   √ >> /coolie.min.js
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../dest/coolie-map.json

       build success >> past 554ms
```


## 前端构建后运行
构建之后的目录结构为：
```
coolie-demo5
├── dest
│   ├── coolie-map.json
│   ├── index.html
│   └── static
│       └── js
│           ├── 66b18cb08533719f6b5e559b4d974141.js
│           ├── 6e007a1301769a5e880e049cfa668749.js
│           └── 79f9ed3283181085347bfea15ac65773.js
└── src
    ├── coolie-config.js
    ├── coolie.config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── date.js
    ├── index.html
    └── index.js

4 directories, 12 files
```

切换到`dest`（构建之后的目录），使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  cd ../dest
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.167:52983
```

运行结果

![](https://dn-fed.qbox.me/@/res/20151215100303946729780439 =476x321)

- 控制台打印了刚刚加载的模块信息，以及运行时间（从构建之前的35ms到构建之后的20ms）
- 正确的执行了模块方法


## 分析构建结果
来分别看下构建之后的文件内容吧，先看`coolie-map.json`：
```
{
  "/index.html": {
    "main": [
      {
        "src": "../src/index.js",
        "dest": "/static/js/6e007a1301769a5e880e049cfa668749.js",
        "deps": [
          "../src/date.js"
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

从文件内容上很容易的看出来，构建的 html 为 `index.html`，
该 html 文件依赖了一个入口文件`../src/index.js`，
构建之后的路径为`/static/js/6e007a1301769a5e880e049cfa668749.js`，
该入口模块依赖了一个模块`../src/date.js`。

先看入口模块文件（`6e007a1301769a5e880e049cfa668749.js`）：
```
/*coolie@1.0.22*/
define("0",["1"],function(a,t,e){var d=a("1");alert("today is "+d.format())});
define("1",[],function(e,t,n){t.format=function(){var e=new Date;return[e.getFullYear(),e.getMonth()+1,e.getDate()].join("-")}});
```

从文件内容上可以清晰的看到：

- 入口模块的 ID 为 0，依赖了一个ID 为 1 的模块
- ID 为 1 的模块在第 2 行
- 模块的路径都压缩成了单个字符
- 模块的内的`require`、`exports`和`module`都经过了压缩
- 文件开头打上了 coolie 的标记

然后再来看看`index.html`：
```
<!doctype html><meta charset="utf-8"> <script src="/static/js/66b18cb08533719f6b5e559b4d974141.js"  data-config="~/static/js/79f9ed3283181085347bfea15ac65773.js" data-main="6e007a1301769a5e880e049cfa668749.js" ></script>
<!--coolie@1.0.22-->
```

可以明显的看出，`<script>`标签上的属性变化很大：
```
<script coolie src="./coolie.min.js"
        data-config="./coolie-config.js"
        data-main="index.js"></script>

=>

<script src="/static/js/66b18cb08533719f6b5e559b4d974141.js"  
        data-config="~/static/js/79f9ed3283181085347bfea15ac65773.js" 
        data-main="6e007a1301769a5e880e049cfa668749.js" ></script>
```

一一对应来看：

- `coolie`：这个属性标记被删除了
- `src`：原始的资源被版本管理了
- `data-config`：配置文件的路径也被修改了
- `data-main`：入口模块的文件名也变化了

接下来，看看配置文件（79f9ed3283181085347bfea15ac65773.js）吧：
```
/*coolie@1.0.22*/
coolie.config({base:"./",async:"async/",chunk:"chunk/",debug:!1,cache:!0,version:{}}).use();
```
配置文件里多了很多配置信息，[详细点这里阅读](/document/coolie-config.js.md)。

