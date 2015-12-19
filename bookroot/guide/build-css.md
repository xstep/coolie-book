# CSS 合并

详细参考 [内容压缩策略](/introduction/content-compression.md)。


# CSS 压缩
CSS 压缩采用的 [clean-css](https://www.npmjs.com/package/clean-css) 模块，默认配置为：

```
{
    // 高级优化
    advanced: false,
    // 属性合并
    aggressiveMerging: false,
    // 兼容性，“ie7”、“ie8”、“*”（ie9+）
    compatibility: 'ie7',
    // 调试信息
    debug: false,
    // 断行
    keepBreaks: false,
    // 注释
    keepSpecialComments: 0,
    // 媒体查询合并
    mediaMerging: true,
    // url 检查
    rebase: false,
    // 资源地图
    sourceMap: false
}
```


# CSS 模块化
这种分组构建的方式，非常有利于 CSS 的模块化。一个典型的 CSS 模块化直观展示：
```
<!--通用模块-->
<!--coolie-->
<link rel="stylesheet" href="/static/css/common/0-normalize.css">
<link rel="stylesheet" href="/static/css/common/1-base.css">
<link rel="stylesheet" href="/static/css/common/2-layout.css">
<link rel="stylesheet" href="/static/css/common/2-input.css">
<link rel="stylesheet" href="/static/css/common/2-button.css">
<link rel="stylesheet" href="/static/css/common/2-list.css">
<link rel="stylesheet" href="/static/css/common/2-text.css">
<link rel="stylesheet" href="/static/css/common/2-kvlist.css">
<link rel="stylesheet" href="/static/css/common/2-table.css">
<!--/coolie-->

<!--业务模块-->
<!--coolie-->
<link rel="stylesheet" href="/static/css/modules/layout.css">
<link rel="stylesheet" href="/static/css/modules/header.css">
<link rel="stylesheet" href="/static/css/modules/nav.css">
<link rel="stylesheet" href="/static/css/modules/footer.css">
<link rel="stylesheet" href="/static/css/modules/copyright.css">
<!--/coolie-->

<!--业务样式-->
<!--coolie-->
<link rel="stylesheet" href="/static/css/app.css">
<!--/coolie-->
```

这种开发模式下，css 的目录结构可以这么分：

```
css
├── app
│   ├── page1.css
│   ├── page2.css
│   └── readme.md
├── common
│   ├── 0-normalize.css
│   ├── 1-base.css
│   └── 2-alert.css
├── modules
│   ├── module1.css
│   ├── module2.css
│   └── readme.md
└── readme.md
```



# demo
## 初始化目录
新建`coolie-demo3`目录：
```
coolie-demo3
└── src

2 directories, 0 files
```

## 初始化文件
在 src 目录下，新建`1.css`和`2.css`：
```
/*1.css*/
body{
    background: #000;
}
```

```
/*2.css*/
body{
    color: #fff;
}
```

然后是`index.html`：
```
<!doctype html>
<meta charset="utf8">

<!--coolie-->
<link rel="stylesheet" href="1.css">
<link rel="stylesheet" href="2.css">
<!--/coolie-->

<h1>coolie-demo3</h1>
```

此时目录结构为：
```
coolie-demo3
└── src
    ├── 1.css
    ├── 2.css
    └── index.html

1 directories, 3 files
```


## 构建前运行
使用 [sts](https://www.npmjs.com/package/sts) 执行：
```
➜  cd src
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.162:49183
```


![](https://dn-s7.qbox.me/@/res/20151210165107055838840951 =298x138)


## 前端构建配置
使用`coolie init -cj`生成`coolie.config.js`（前端构建工具的配置文件）：
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /coolie-demo3/src/coolie.config.js
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
 * @create 2015-12-14 16:26:00
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

- 【1】：去除了入口文件路径
- 【2】：取消了模块加载器配置文件的路径
- 【3】：修改了 html 文件路径
- 【4】：去除了原样复制文件配置

此时的目录结构为：
```
coolie-demo3
└── src
    ├── 1.css
    ├── 2.css
    ├── coolie.config.js
    └── index.html

1 directory, 4 files
```

## 前端构建
在 src 目录执行前端构建：
```
➜  coolie build

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝


                 1/6 >> parse coolie config
       coolie config >> /coolie-demo3/src/coolie.config.js
         src dirname >> /coolie-demo3/src
        dest dirname >> /coolie-demo3/dest/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
           build app >> no main modules

                 4/6 >> override coolie-config.js
      overide config >> `coolie-config.js` is not defined

                 5/6 >> build html
                   √ >> /static/css/55c90fffc925a0abebdc406feaf0e53c.css
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../dest/coolie-map.json

       build success >> past 99ms
```

构建之后的目录结构为：
```
coolie-demo3
├── dest
│   ├── coolie-map.json
│   ├── index.html
│   └── static
│       └── css
│           └── 55c90fffc925a0abebdc406feaf0e53c.css
└── src
    ├── 1.css
    ├── 2.css
    ├── coolie.config.js
    └── index.html

4 directories, 7 files
```


## 构建后运行

使用 [sts](https://www.npmjs.com/package/sts) 执行：
```
➜  cd ../dest
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.162:49724
```


![](https://dn-s7.qbox.me/@/res/20151210165107055838840951 =298x138)


## 构建结果分析
先来看下`coolie-map.json`（[详细介绍点这里](/introduction/resource-relationship-map.md)）:
```
{
  "/index.html": {
    "main": [],
    "async": [],
    "js": [],
    "css": [
      {
        "dest": "/static/css/55c90fffc925a0abebdc406feaf0e53c.css",
        "deps": [
          {
            "src": "../src/1.css",
            "res": []
          },
          {
            "src": "../src/2.css",
            "res": []
          }
        ]
      }
    ]
  }
}
```

标记了`index.html`引入了`static/css/55c90fffc925a0abebdc406feaf0e53c.css`文件，
并且该文件是由`1.css`和`2.css`文件合并而来，并且`1.css`和`2.css`依赖的资源文件都为空。

