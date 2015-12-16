# 公共模块
在介绍分块模块之前，来说些公共模块。
当一个项目逐渐壮大的时候，势必会出现一些公共模块。
如何分配和处理这些公共模块，需要全局考虑，是一个不小的利弊权衡。

如工程里共有 20 个入口模块， 
5 个入口模块引用了同一个模块 a，
10 个入口模块引用了同一个模块 b，
15 个入口模块引用了同一个模块 c，
20 个入口模块引用了同一个模块 d。

如何分配这 4 个公共模块呢？

- 全部打包在一起，即每个入口模块都将 a、b、c、d 四个模块都合并进去。
- a 模块不打包进来，即每个入口模块都将 b、c、d 三个模块都合并进去。
- a、b 模块不打包进来，即每个入口模块都将 c、d 两个模块都合并进去。
- a、b、c 模块不打包进来，即每个入口模块只将 d 模块都合并进去。
- a、b、c、d 四个模块都不打包，即每个入口模块根据自身情况加载属于自己的模块，就丧失了公共模块的特征。


# 分块策略
基于上述的 5 种要求，对应着 5 种分块策略：

## 策略1
```
chunk: [
    'a|b|c|d'   // a、b、c、d 合并作为一个公共模块，此时会被 5 个入口模块引用（以最小引用数量的 a 模块为准）
]
```

## 策略2
```
chunk: [
    'b|c|d'   // b、c、d 合并作为一个公共模块，此时会被 10 个入口模块引用（以最小引用数量的 b 模块为准）
]
```

## 策略3
```
chunk: [
    'c|d'   // c、d 合并作为一个公共模块，此时会被 15 个入口模块引用（以最小引用数量的 c 模块为准）
]
```


## 策略4
```
chunk: [
    'd'   // d 作为一个公共模块，此时会被 20 个入口模块引用
]
```


## 策略5
```
chunk: [
    // 空，没有公共模块
]
```

是不是只有这 5 种分块策略？当然不止：

## 策略6
```
chunk: [
    'a',     // a 作为一个公共模块，此时会被 5 个入口模块引用
    'b|c|d'  // b、c、d 合并作为一个公共模块，此时会被 10 个入口模块引用（以最小引用数量的 b 模块为准）
]
```

## 策略7
```
chunk: [
    'a',     // a 作为一个公共模块，此时会被 5 个入口模块引用
    'b',     // b 作为一个公共模块，此时会被 10 个入口模块引用
    'c|d'    // c、d 合并作为一个公共模块，此时会被 15 个入口模块引用（以最小引用数量的 c 模块为准）
]
```


## 策略8
```
chunk: [
    'a',     // a 作为一个公共模块，此时会被 5 个入口模块引用
    'b',     // b 作为一个公共模块，此时会被 10 个入口模块引用
    'c',     // c 作为一个公共模块，此时会被 15 个入口模块引用
    'c',     // d 作为一个公共模块，此时会被 20 个入口模块引用
]
```


## 策略9
```
chunk: [
    'a|b',   // a、b 合并作为一个公共模块，此时会被 5 个入口模块引用（以最小引用数量的 a 模块为准）
    'c',     // c 作为一个公共模块，此时会被 15 个入口模块引用
    'c',     // d 作为一个公共模块，此时会被 20 个入口模块引用
]
```

这种排列组合的问题，这里就不一一展示了。
关于公共模块，都是需要站在工程角度全盘考虑，需要有全局眼光，轻重之间，取舍有道。



# demo
## 初始化目录结构
新建一个`coolie-demo8`的目录，结构如下：
```
coolie-demo8
└── src                // 开发目录
    └── static         // 静态目录
        └── js         // js 目录
            ├── app    // 入口模块目录
            └── libs   // 脚本库模块

5 directories, 0 files
```

## 初始化文件
本 demo 要的是，显示今天的年月日。分别在 libs 目录下新建

- libs/year.js
- libs/month.js
- libs/date.js

三个 js 分别输出当前的年、月、日。

year.js：
```
define(function (require, exports, module){
	module.exports = function (){
		return new Date().getFullYear();
	};
});
```

month.js：
```
define(function (require, exports, module){
	module.exports = function (){
		return new Date().getMonth() + 1;
	};
});
```

date.js：
```
define(function (require, exports, module){
	module.exports = function (){
		return new Date().getDate();
	};
});
```

然后，在 app 目录下，新建两个 js ，分别属性今天的年、月和年、月、日。

- app/year-month.js
- app/year-month-date.js

year-month.js:
```
define(function (require, exports, module){
	var year = require('../libs/year.js');
	var month = require('../libs/month.js');

	alert('today is ' + year + '-' + month);
});
```

year-month-date.js
```
define(function (require, exports, module){
	var year = require('../libs/year.js');
	var month = require('../libs/month.js');
	var date = require('../libs/date.js');

	alert('today is ' + year + '-' + month + '-' + date);
});
```

从上面的代码结构和文件划分，可以明显的看出来，`year.js`、`month.js`、`date.js`是可以作为公共模块来处理的。
按此不表，先下载模块加载器：

```
➜  src  coolie install coolie

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

      install coolie >> http://s-ydr-me.oss-cn-hangzhou.aliyuncs.com/p/j/coolie.zip
        unzip coolie >> /var/folders/_8/nf73nk9d0yx_q_w6536gfr_80000gn/T/2015121610520100.zip
         coolie file >> /Users/cloudcome/development/localhost/coolie-demo8/src/coolie.js
         coolie file >> /Users/cloudcome/development/localhost/coolie-demo8/src/coolie.min.js
```


新建两个 html 分别执行两个入口模块。


## 前端构建前运行
## 前端构建配置
## 前端构建
## 前端构建后运行
## 分析构建结果


