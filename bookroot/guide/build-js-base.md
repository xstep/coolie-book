# 下载
使用 coolie demo 命令下载本 demo。
```
➜ coolie demo 2
```

# JS 压缩

JS 压缩采用的是 [uglify-js](https://www.npmjs.com/package/uglify-js) 模块，默认配置为：

```
{
    // 连续单语句，逗号分开
    // 如： alert(1);alert(2); => alert(1),alert(2)
    sequences: false,
    // 重写属性
    // 如：foo['bar'] => foo.bar
    properties: false,
    // 删除无意义代码
    dead_code: false,
    // 移除`debugger;`
    drop_debugger: true,
    // 使用以下不安全的压缩
    unsafe: false,
    // 不安全压缩
    unsafe_comps: false,
    // 压缩if表达式
    conditionals: true,
    // 压缩条件表达式
    comparisons: true,
    // 压缩常数表达式
    evaluate: true,
    // 压缩布尔值
    booleans: true,
    // 压缩循环
    loops: true,
    // 移除未使用变量
    unused: false,
    // 函数声明提前
    hoist_funs: true,
    // 变量声明提前
    hoist_vars: false,
    // 压缩 if return if continue
    if_return: true,
    // 合并连续变量省略
    join_vars: true,
    // 小范围连续变量压缩
    cascade: true,
    // 显示警告语句
    warnings: false,
    // 全局变量，会在构建之后，删除
    global_defs: {
        DEBUG: false
    }
}
```

# demo
## 初始化目录
新建一个`coolie-demo2`目录：
```
coolie-demo2
└── webroot-dev

1 directories, 0 files
```


## 初始化文件
### index.html
```
<!doctype html>
<meta charset="utf-8">

<script src="coolie-demo2.js"></script>
```

### coolie-demo2.js
```
window.onload = function() {
	alert('coolie demo2');
};
```


此时的目录结构为：
```
.
└── webroot-dev
    ├── coolie-demo2.js
    └── index.html

1 directories, 2 files
```


## 构建前运行
使用 [sts](https://www.npmjs.com/package/sts) 执行：
```
➜  cd webroot-dev
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.157:55119
```

![](https://dn-fed.qbox.me/@/res/20160126100403603386398368 =458x254)


## 前端构建配置
在构建之前，依然需要配置，通过之前的 hello world 一节，想必你对 coolie 的配置也有一定的了解了。
再来复习一次。

使用`coolie init -c`生成`coolie.config.js`（前端构建工具的配置文件）：
```
➜  coolie init -c

┌────────────────────────────────────┐
│ coolie-cli                         │
│ coolie@1.6.4                       │
│ The front-end development builder. │
└────────────────────────────────────┘
        init success >> /coolie-demo2/webroot-dev/coolie.config.js
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
 * @create 2016-01-26 10:06:22
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

此时的目录结构为：

```
.
└── webroot-dev
    ├── coolie-demo2.js
    ├── coolie.config.js
    └── index.html

1 directory, 3 files
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
       coolie config >> /coolie-demo2/webroot-dev/coolie.config.js
         src dirname >> /coolie-demo2/webroot-dev
        dest dirname >> /coolie-demo2/webroot-pro/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
           build app >> no main modules

                 4/6 >> override coolie-config.js
      overide config >> `coolie-config.js` is not defined

                 5/6 >> build html
                   √ >> /coolie-demo2.js
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../webroot-pro/coolie-map.json

       build success >> past 132ms
```

构建之后的目录结构为：
```
.
├── webroot-dev
│   ├── coolie-demo2.js
│   ├── coolie.config.js
│   └── index.html
└── webroot-pro
    ├── coolie-map.json
    ├── index.html
    └── static
        └── js
            └── b421893239552ab5531042432f4f2bcb.js

4 directories, 6 files
```

## 构建后运行
切换到`webroot-pro`目录再次执行：
```
➜  cd ../webroot-pro
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.157:55513
```


![](https://dn-fed.qbox.me/@/res/20160126101037397180095322 =447x225)

成功运行，下面来分析下构建之后的结果吧。


## 分析构建结果
### index.html
先来看看构建之后的 html 文件：
```
<!doctype html><meta charset="utf-8"> <script src="/static/js/b421893239552ab5531042432f4f2bcb.js"></script>
<!--coolie build-->
```

- `script` 路径由原来的 `coolie-demo2.js` 变为 `/static/js/b421893239552ab5531042432f4f2bcb.js`
- html 的内容被压缩了

### js 文件
js 文件的文件名被修改了（[为什么要这么做？](https://www.zhihu.com/question/20790576)）
```
window.onload=function(){alert("coolie demo2")};
```

可见，js 的内容也经过了压缩。


# github
<https://github.com/cooliejs/coolie-demo2/>