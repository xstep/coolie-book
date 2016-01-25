学习新东西，往往都是从 Hello World 开始的，coolie 也是这样，一起来看看吧。


# 准备
先准备以下目录
```
.
├── webroot-dev
└── webroot-pro

2 directories, 0 files
```

- `webroot-dev`：构建之前的项目根目录（开发目录，后面的 demo 与之相同）
- `webroot-pro`：构建之后的项目根目录（生产目录，后面的 demo 与之相同）


接下来，我们就在`webroot-dev`目录下开始写代码了。



# 页面文件
将`index.html`文件内容填写如下：

```
<!DOCTYPE html>
<meta charset="utf-8">
<h1>Hello World</h1>
```


# 前端构建前运行
`coolie-cli` 相比其他的构建工具，侵入性非常的低，未构建之前是可以正常运行的。

当前的目录结构为：
```
.
├── webroot-dev
│   └── index.html
└── webroot-pro

2 directories, 1 file
```

使用 [sts 工具](https://www.npmjs.com/package/sts)（sts 是一款运行静态服务器的 node 工具），在`src`目录下运行：

```
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.255.75:62290
```

会使用默认浏览器打开`index.html`。


![](https://dn-fed.qbox.me/@/res/20151214152903647429769113 =322x137)



# 前端构建配置文件
看到配置文件先不要紧张，coolie-cli 的配置非常的简单：

- 用过的都说好，配置简化到最小，即使不看文档也知道
- 一次性配置终生受用，不像其他构建工具开发一点配置一点
- 可以使用命令生成标准（推荐的）配置文件，只需要稍加修改即可


使用`coolie init -c`命令生成文件模板:
```
➜  cd webroot-dev
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /coolie-demo1/src/coolie.config.js
```

并修改为：

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
 * @create 2015-12-14 15:32:19
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

- 【1】入口模块路径设置为空
- 【2】模块加载器配置文件设置为空
- 【3】需要构建的 HTML 文件，即`index.html`
- 【4】需要复制的文件设置为空




# 前端构建
我们来尝试在`src`目录下执行前端构建，看看会发生什么。

```
➜  coolie build

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝


                 1/6 >> parse coolie config
       coolie config >> /coolie-demo1/src/coolie.config.js
         src dirname >> /coolie-demo1/src
        dest dirname >> /coolie-demo1/dest/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module
           build app >> no main modules

                 4/6 >> override coolie-config.js
      overide config >> `coolie-config.js` is not defined

                 5/6 >> build html
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../dest/coolie-map.json

       build success >> past 53ms
```

啊，喂，看着屏幕上的日志刷刷而过，别眨眼，来看看构建之后的目录结构：

```
coolie-demo1
├── dest
│   ├── coolie-map.json
│   └── index.html
└── src
    ├── coolie.config.js
    └── index.html

2 directories, 4 files
```


# 前端构建后运行
构建给不给力，来看看构建之后的运行结果吧：
```
➜  cd ../dest
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.167:63613

```

![](https://dn-fed.qbox.me/@/res/20151214154946097880495328 =332x140)

如释重负，运行结果一模一样。


# 前端构建后分析
仔细对比下构建前后的目录结果，基本是相同的，不同的是：

- 构建之前有`coolie.config.js`，构建之后没有了
- 构建之后由`coolie-map.json`，构建之前并没有

来看看`coolie-map.json`：
```
{
  "/index.html": {
    "main": [],
    "async": [],
    "js": [],
    "css": [],
    "res": []
  }
}
```

`coolie-map.json`是资源地图信息，标记了每个页面依赖了哪些资源，[详细分析点这里](/introduction/resource-relationship-map.md)。


我们再来看看`index.html`：
```
<!DOCTYPE html><meta charset="utf-8"><h1>Hello World</h1>
<!--coolie@1.0.22-->
```

很明显，`index.html`已经被压缩了，并且打上了 coolie 的标记。
