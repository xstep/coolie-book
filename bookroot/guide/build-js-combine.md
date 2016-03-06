# 下载
使用 coolie demo 命令下载本 demo。
```
➜ coolie demo 3
```


# JS 合并

详细参考 [内容压缩策略](/introduction/content-compression.md)。



# demo
## 初始化目录
新建一个`coolie-demo3`目录：
```
coolie-demo3
└── webroot-dev

1 directories, 0 files
```


## 初始化文件
### index.html
```
<!doctype html>
<meta charset="utf-8">

<!--coolie-->
<script src="coolie-demo3-1.js"></script>
<script src="coolie-demo3-2.js"></script>
<!--/coolie-->
```

### coolie-demo3-1.js
```
window.hello = 'coolie-demo3';
```

### coolie-demo3-2.js
```
window.onload = function (){
    alert(window.hello);
};
```


此时的目录结构为：
```
.
└── webroot-dev
    ├── coolie-demo3-1.js
    ├── coolie-demo3-2.js
    └── index.html

1 directories, 3 files
```


## 构建前运行
使用 [sts](https://www.npmjs.com/package/sts) 执行：
```
➜  cd webroot-dev
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.252.118:50918
```

![](https://dn-fed.qbox.me/@/res/20160126140023075858849755 =476x240)


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
 * @create 2016-01-26 14:01:05
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

修改点：

- 【1】：去掉了入口模块，此处没有用到模块化
- 【2】：模块配置文件也没有，设置为 `null`
- 【3】：修改需要构建的 html 文件路径
- 【4】：去除了原样复制文件配置

细心的同学可能发现了，配置文件基本没什么变化。

此时的目录结构为：

```
.
└── webroot-dev
    ├── coolie-demo3-1.js
    ├── coolie-demo3-2.js
    ├── coolie.config.js
    └── index.html

1 directory, 4 files
```


## 前端构建
执行构建：
```
➜  cd webroot-dev
➜  coolie build


┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘

                 1/6 >> parse coolie config
       coolie config >> /coolie-demo3/webroot-dev/coolie.config.js
         src dirname >> /coolie-demo3/webroot-dev
        dest dirname >> /coolie-demo3/webroot-pro/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
           build app >> no main modules

                 4/6 >> override coolie-config.js
      overide config >> `coolie-config.js` is not defined

                 5/6 >> build html
                   √ >> /static/js/c6ee41f19d1aa974a3a6a0606de94a1b.js
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../webroot-pro/coolie-map.json

       build success >> past 133ms
```

构建之后的目录结构为：
```
.
├── webroot-dev
│   ├── coolie-demo3-1.js
│   ├── coolie-demo3-2.js
│   ├── coolie.config.js
│   └── index.html
└── webroot-pro
    ├── coolie-map.json
    ├── index.html
    └── static
        └── js
            └── c6ee41f19d1aa974a3a6a0606de94a1b.js

4 directories, 7 files
```

## 构建后运行
切换到`webroot-pro`目录再次执行：
```
➜  cd ../webroot-pro
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.252.118:53266
```


![](https://dn-fed.qbox.me/@/res/20160126144823804587442691 =472x232)

成功运行，下面来分析下构建之后的结果吧。


## 分析构建结果
### index.html
先来看看构建之后的 html 文件：
```
<!doctype html><meta charset="utf-8"> <script src="/static/js/c6ee41f19d1aa974a3a6a0606de94a1b.js"></script>
<!--coolie build-->
```

- `script` 标签的数量，由原来的 2 个，变成了 1 个
- `script` 路径也变为 `/static/js/c6ee41f19d1aa974a3a6a0606de94a1b.js`
- html 的内容被压缩了


### js 文件
js 文件的文件名被修改了
```
window.hello="coolie-demo3";
window.onload=function(){alert(window.hello)};
```

可见，js 的内容也经过了合并、压缩，并且是分行表示的，一行代表一个文件


# github
<https://github.com/cooliejs/coolie-demo3/>
