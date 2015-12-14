# 同步模块

这里的同步模块指的是运行时，该模块是同步载入的（类似 NodeJS 里的 `require`）。

```
require('module1');  // 运行到这里，module1 载入

require('module2');  // 运行到这里，module2 载入
```

# demo
## 初始化目录
新建`coolie-demo5`，目录结构为：
```
coolie-demo5
└── src

1 directory, 0 files
```

## 初始化文件
先下载模块加载器：
```
➜  cd src
➜  coolie install coolie
╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

      install coolie >> http://s-ydr-me.oss-cn-hangzhou.aliyuncs.com/p/j/coolie.zip
        unzip coolie >> /var/folders/_8/nf73nk9d0yx_q_w6536gfr_80000gn/T/2015121416503100.zip
         coolie file >> /coolie-demo5/src/coolie.js
         coolie file >> /coolie-demo5/src/coolie.min.js
```
如果你感兴趣，可以简单的看看`coolie.js`的源代码。接下来，我们来初始化模块加载器的配置文件：
```
➜  coolie init -j

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

        init success >> /coolie-demo5/src/coolie-config.js
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



## 前端构建前运行
## 前端构建配置
## 前端构建
## 前端构建后运行
## 分析构建结果


