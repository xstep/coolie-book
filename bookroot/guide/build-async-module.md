# 异步模块

异步模块与同步模块相反，指的是模块是在运行时才去异步加载然后再运行。

```
setTimeout(function(){
    // 异步模块`async.js`在 1000ms 后加载，然后再运行
    require.async('async.js', function(exports){
        // 模块加载完成后，返回模块的导出
        // exports
    })
}, 1000);
```


异步模块常用于单页面应用，如：
```
window.on('hashchange', function(eve){
    if (location.hash === '#a') {
        require.async('pages/a.js');
    } else if (location.hash === '#b') {
        require.async('pages/b.js');
    } else {
        require.async('pages/404.js');
    }
});
```

如上，监听`hashchange`事件，然后根据不同的 hash 载入不同的页面。


# demo
本 demo 就是通过监听 hash 来载入不同的 page，是异步模块的一个典型使用场景。


## 初始化目录结构
新建一个空目录：
```
coolie-demo7
└── src

1 directory, 0 files
```


## 初始化文件
新建一个入口模块`index.js`：
```
define(function (require, exports, module){
	var onhashchange = function(eve){
		if (location.hash === '#a') {
			require.async('pages/a.js', function(page){
			    page();
			});
		} else if (location.hash === '#b') {
			require.async('pages/b.js', function(page){
			    page();
			});
		} else {
			require.async('pages/404.js', function(page){
			    page();
			});
		}
	};
	
	window.onhashchange = onhashchange;
	setTimeout(onhashchange);
});
```

然后新建一个 pages 目录，分别放置这些页面片段。

pages/a.js：
```
define(function (require, exports, module){
	module.exports = function(){
		document.getElementById('demo').innerHTML = 'page a ' + Date.now();
	};
});
```

pages/b.js：
```
define(function (require, exports, module){
	module.exports = function(){
		document.getElementById('demo').innerHTML = 'page b ' + Date.now();
	};
});
```

pages/404.js：
```
define(function (require, exports, module){
	module.exports = function(){
		document.getElementById('demo').innerHTML = 'page 404 ' + Date.now();
	};
});
```

然后，继续在 src 目录下，下载模块加载器：
```
➜  coolie install coolie

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

      install coolie >> http://s-ydr-me.oss-cn-hangzhou.aliyuncs.com/p/j/coolie.zip
        unzip coolie >> /var/folders/_8/nf73nk9d0yx_q_w6536gfr_80000gn/T/2015121520475600.zip
         coolie file >> /Users/cloudcome/development/localhost/coolie-demo7/src/coolie.js
         coolie file >> /Users/cloudcome/development/localhost/coolie-demo7/src/coolie.min.js
```

然后初始化模块加载器配置文件`coolie-config.js`：
```
➜  coolie init -j

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /Users/cloudcome/development/localhost/coolie-demo7/src/coolie-config.js
```

修改模块加载器配置文件为：
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
 * @create 2015-12-15 20:48:48
 * ======================================================
 */

coolie.config({
    // 入口模块基准路径，相对于当前文件
    base: './'
}).use();
```

只需要了`base`配置，使其指向了当前目录。

最后写`index.html`：
```
<!doctype html>
<meta charset="utf-8">
<style>
#demo{
	border: 1px solid #ccc;
	padding: 10px;
	font-size: 20px;
}
</style>

<div id="demo"></div>

<p><a href="#a">pages/a</a></p>
<p><a href="#b">pages/b</a></p>
<p><a href="#c">pages/c</a></p>
<p><a href="#d">pages/d</a></p>

<script coolie src="coolie.js" data-config="coolie-config.js" data-main="index.js"></script>
```

html 里分别加上了 4 个链接，来分别监听 hash 变化来异步载入不同的模块。


此时的目录结构为：
```
coolie-demo7
└── src
    ├── coolie-config.js
    ├── coolie.js
    ├── coolie.min.js
    ├── index.html
    ├── index.js
    └── pages
        ├── 404.js
        ├── a.js
        └── b.js

2 directories, 8 files
```


## 前端构建前运行
在`src`目录下，使用[sts](https://www.npmjs.com/package/sts)执行：
```
➜  sts
                 sts >> A static server is running.
                open >> http://172.22.255.75:58920
```

![](http://s.ydr.me/@/res/20151215210528244027950280 =693x377)

从上面的 gif 动画中可以清楚的看到：

- 页面载入的时候，匹配的 hash 是 404 页面，此时载入了主模块和异步的 404 模块
- 当点击`pages/a`的时候，匹配的 hash 是 a 页面，此时载入了异步的 a 模块
- 当点击`pages/b`的时候，匹配的 hash 是 a 页面，此时载入了异步的 b 模块
- 当点击`pages/c`的时候，匹配的 hash 是 404 页面，此时并未重复载入 404 模块，而是直接执行了已经加载完成的 404 模块
- 当点击`pages/d`的时候，与上条相同


## 前端构建配置
前端构建也不复杂，使用命令初始化前端构建配置文件（`coolie.config.js`）:
```
➜  coolie init -c

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /Users/cloudcome/development/localhost/coolie-demo7/src/coolie.config.js
```


## 前端构建
## 前端构建后运行
## 分析构建结果


