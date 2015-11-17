coolie 的内容压缩也是别具一格。

# `<link/>`
```
<!--page1.html-->

<!--coolie-->
<link href="path/to/module1.css">
<link href="path/to/module2.css">
<link href="path/to/module3.css">
<link href="path/to/module4.css">
<!--/coolie-->
```

page1.html 引用了 `module1`、`module2`、`module3`和`module4`四个样式模块，
并且将这 4 个样式模块分为一组，表示将这个 4 个样式模块合并压缩。

coolie cli 构建之后
```
<!--page1.html-->

<link href="/css/content_version.css">
```


**`content_version`表示内容的版本（详见：[版本管理策略](./version-management.md)），下同。**



# `<script/>`
如你所见，`<script/>`的合并与`<link/>`一致。
```
<!--page1.html-->

<!--coolie-->
<script src="path/to/module1.js"></script>
<script src="path/to/module2.js"></script>
<script src="path/to/module3.js"></script>
<script src="path/to/module4.js"></script>
<!--/coolie-->
```

构建为

```
<!--page1.html-->

<link href="/js/content_version.js">
```



# module
相比较而言，模块的内容压缩策略会复杂一些。主要步骤如下：
```
分析模块分块规则 => 分析入口模块 => 分析异步模块 => 模块构建
=> 分析模块依赖 => 分析模块类型 => 模块内容处理（js、css、image、html等处理）
=> 匹配分块模块 => 模块存储
```

模块的合并，按照一个模块一行代码的规则，逐行合并，最后保存。

```
define('0',['1','2'],function(){r('1');r('2')});
define('1',[],function(){});
define('2',[],function(){});
```

如上，3 行代码表示有 3 个模块共同合并在一起，非常的清晰明了。
入口模块的 ID 固定为 0，其他的依赖模块根据三十六进制，进行全局计算，保证唯一。




