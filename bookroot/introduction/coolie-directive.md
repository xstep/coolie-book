# 什么是 coolie 指令

coolie 指令指的是可以在源代码里书写的一些不影响代码运行并且可以被 coolie-cli 识别的标记。


# `coolie`
标记当前 script 是模块加载器所在的标签。

```
<script coolie src="/path/to/coolie.js"
data-main="main.js"
data-config="coolie-config.js"></script>

=>

<script src="/static/js/xxx.js" data-main="yyy.js" data-config="~/static/js/zzz.js"></script>
```

在构建过程中，coolie-cli 会识别出标记 coolie 的标签，
并且会查找该 script 标签上的`data-main`和`data-config`属性来确认
入口模块和模块加载器配置文件。


# `coolieignore`
标签当前标签可以被 coolie-cli 忽略构建。
```
<img src="{{templateVarible}}" coolieignore />

=>

<img src="{{templateVarible}}">
```


# `cooliebase64`
标签当前资源需要构建成 base64 形式，在资源的 URL 末尾（必须）添加`#cooliebase64`即可。
```
<style>
body {
    background: url(/path/to/body.png#cooliebase64);
}
</style>
<img src="/path/to/image.png#cooliebase64" />

=>

<style>body{background:url(data:image/png;base64....)}</style>
<img src="data:image/png;base64...">
```

