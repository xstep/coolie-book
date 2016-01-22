# 介绍
支持构建 html 内嵌 PHP 的代码。如：
```
<?php

PHP code

?>

=>

<?php

PHP code

?>
```


# 配置
## `regexps`
指定匹配条件，默认有：
```
[
    /<\?php[\s\S]*?\?>/gi,
    /<\?=[\s\S]*?\?>/g
]
```



# 使用
```
// 在 coolie.config.js 中添加
coolie.use(require('coolie-html-embed-php')());
```



# github

<https://github.com/cooliejs/coolie-html-embed-php>


