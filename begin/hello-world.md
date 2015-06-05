帮你领进门，学习完 hello world，就算是入门结束了，下面开始。

# html
先写个页面`hello.html`
```
<!DOCTYPE html>
<html>
<head lang="zh-cn">
    <meta charset="UTF-8">
    <title>hello.html</title>
</head>
<body>

<!--注意：-->
<!--1. 这里的 script 标签多了 coolie 属性-->
<!--2. 引用了 coolie.min.js-->
<!--3. 增加了 data-config 属性-->
<!--4. 增加了 data-main 属性-->
<script coolie src="./coolie.min.js"
        data-config="./coolie-config.js"
        data-main="hello.js"></script>

</body>
</html>
```

1. `coolie`属性：表明该 script 是 coolie.cli（前端开发构建工具） 的管辖范围
2. `coolie.min.js`：前端模块加载器
3. `data-config`属性：前端模块加载器配置文件
4. `data-main`属性：模块入口文件地址，相对于`data-config.js`里的`base`属性，后文说的


# js
接上文，至少需要新建两个文件。

## coolie-config.js
很简单
```
coolie.config({
    base: './'
}).use();
```

- `base`地址相对于模块加载器（即：coolie.js 的文件 URL 地址）
- `use`表示启动入口文件。

## hello.js
```
define(function () {
    alert('hello world');
});
```


{% include "../_include/cnzz.md" %}
