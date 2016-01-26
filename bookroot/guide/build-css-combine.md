# CSS 合并

详细参考 [内容压缩策略](/introduction/content-compression.md)。




# demo
## 初始化目录
新建`coolie-demo5`目录：
```
.
└── webroot-dev

1 directories, 0 files
```

## 初始化文件
### index.html
```
<!doctype html>
<meta charset="utf8">

<!--coolie-->
<link rel="stylesheet" href="coolie-demo5-1.css">
<link rel="stylesheet" href="coolie-demo5-2.css">
<!--/coolie-->

<h1>coolie-demo5</h1>
```

### coolie-demo5-1.css
```
body{
	background: #000;
}
```

### coolie-demo5-2.css
```
h1{
	color: #fff;
}
```

此时目录结构为：
```
.
└── webroot-dev
    ├── coolie-demo5-1.css
    ├── coolie-demo5-2.css
    └── index.html

1 directory, 3 files
```


## 构建前运行
使用 [sts](https://www.npmjs.com/package/sts) 执行：
```
➜  cd src
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.252.118:54141
```


![](https://dn-fed.qbox.me/@/res/20160126150550964747712130 =333x135)


## 前端构建配置
使用`coolie init -c`生成`coolie.config.js`（前端构建工具的配置文件）：
```
➜  coolie init -c

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘
        init success >> /coolie-demo3/webroot-dev/coolie.config.js
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
 * @version 1.6.4
 * @create 2016-01-26 10:28:28
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
                // './static/js/app/**/*.js'
                //【1】
            ],
            // coolie-config.js 路径，相对于当前文件
            //【2】
            'coolie-config.js': null,
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
            // './favicon.ico',
            // './robots.txt'
            //【4】
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

- 【1】：去除了入口模块的配置
- 【2】：取消了模块加载器配置文件的路径
- 【3】：修改了需要构建的 html 文件路径
- 【4】：去除了原样复制文件配置

此时的目录结构为：
```
.
└── webroot-dev
    ├── coolie-demo5-1.css
    ├── coolie-demo5-2.css
    ├── coolie.config.js
    └── index.html

1 directory, 4 files
```

## 前端构建
在 webroot-dev 目录执行前端构建：
```
➜  coolie build


┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘

                 1/6 >> parse coolie config
       coolie config >> /coolie-demo5/webroot-dev/coolie.config.js
         src dirname >> /coolie-demo5/webroot-dev
        dest dirname >> /coolie-demo5/webroot-pro/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
           build app >> no main modules

                 4/6 >> override coolie-config.js
      overide config >> `coolie-config.js` is not defined

                 5/6 >> build html
                   √ >> /static/css/9bfb05540ee797bff406a83a4f55aad0.css
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../webroot-pro/coolie-map.json

       build success >> past 119ms
```

构建之后的目录结构为：
```
.
├── webroot-dev
│   ├── coolie-demo5-1.css
│   ├── coolie-demo5-2.css
│   ├── coolie.config.js
│   └── index.html
└── webroot-pro
    ├── coolie-map.json
    ├── index.html
    └── static
        └── css
            └── 9bfb05540ee797bff406a83a4f55aad0.css

4 directories, 7 files
```


## 构建后运行

使用 [sts](https://www.npmjs.com/package/sts) 执行：
```
➜  cd ../webroot-pro
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.252.118:54563
```


![](https://dn-fed.qbox.me/@/res/20160126151455911694104710 =339x137)


## 构建结果分析
### index.html
```
<!doctype html><meta charset="utf8"> <link rel="stylesheet" href="/static/css/9bfb05540ee797bff406a83a4f55aad0.css"> <h1>coolie-demo5</h1>
<!--coolie build-->
```

### css 文件
```
body{background:#000}
h1{color:#fff}
```

- 构建之后的 html 被压缩了
- 构建之后的 `link` 的 `href` 由 `coolie-demo3.css` 变为 `/static/css/9bfb05540ee797bff406a83a4f55aad0.css`
- css 文件也被合并、压缩了，并且是分行表示的，一行代表一个文件
