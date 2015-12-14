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

![](http://s.ydr.me/@/res/20151214170821341124760909 =565x379)

如上图：



## 前端构建配置



## 前端构建
## 前端构建后运行
## 分析构建结果


