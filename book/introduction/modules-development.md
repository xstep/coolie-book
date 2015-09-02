# 模块化开发
模块化开发，老生常谈的话题了，这里也不免啰嗦一下。

## 什么是模块化
模块化是个相对概念，相对于整块、整体而言，模块通常是组成一个整体的最小单位。
比如，你眼前的电脑，它在计算机网络世界里，它是个模块个体。
而相对于一台电脑而言，电脑内部的 CPU、内存才是最小的模块。

## 为什么要前端模块化
如果你没有用过模块化，那你是否遇到过以下问题：

- 各个 jquery 插件的顺序一定不能变，否则报错。
- 遇到过undefined is not a function，原来是某个脚本没有加载。
- 每次上线手动修改script里的脚本版本号、样式里的background图片版本。
- 上线之前，替换app.js为app.min.js。
- jquery 太大了，怎么把它拆分掉。

写过这样的代码：

```
<script src="abc.js?v=1.22"></script>
<script src="def.js?v=1.33"></script>

.demo1{
    background: url("./abc.png?v=1.1");
}

.demo2{
    background: url("./def.png?v=1.2");
}
```

这些问题和烦恼，都可以通过前端模块化来解决。

前端模块化来的比较晚，如果你用过 nodejs，那么它的模块化是走的比前端要远、要完善一些的，以 express 为例：

![](https://dn-fed.qbox.me/@/i/20150512165315223705106911)

如上图，使用require语法，就引入了一个模块，非常的方便。

同样的，其他语言都已早早的实现了模块化编程，如import、include等等。

因此，es2015 的模块化标准（[更多](http://www.infoq.com/cn/news/2013/08/es6-modules)）就要来了，
javascript 也正为此做准备着，因此现在学习模块化正是最佳时机。

{% include "../_include/cnzz.md" %}

