# JS 构建

JS 构建特别的简单。

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


[构建策略说明](/introdution/content-compression.md)。
