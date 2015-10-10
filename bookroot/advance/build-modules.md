在模块构建方面，在 coolie 面前，所有资源都是模块，包括JS、CSS、HTML、JSON、图片等，都可以进行模块构建。

coolie 模块构建包括以下几个方面：

- 智能分析模块依赖。
- 分配模块唯一的三十六进制 ID。
- 智能分析依赖的模块类型（JS、CSS、HTML、JSON、图片），并进行相应的构建。
- 智能分析依赖模块内的依赖，如 HTML 模块里引用的样式、图片，CSS 模块里引用的图片。
- 智能分析分块构建依赖的公共模块，并进行分块构建。
- 智能分析分块构建依赖的异步模块，并进行增量构建。
- 几近完美的模块压缩、合并。

在了解 coolie 模块构建方面，需要注意：



# 配置与引用
需要在`coolie.json`文件的`js.main`里填写入口模块的路径地址，支持通配符。

```
{
    "js": {
        "main": [
            "入口模块路径"
        ]
    }
}
```
这里只能写入口模块的文件路径，不能写其他非模块化的脚本路径或者是依赖模块的路径。
这些路径都是相对于`coolie.json`所在的目录的。

**同时**，需要在 HTML 文件里引用它
```
<script coolie ... data-main="入口模块URI">
```

- 如果入口模块未引用，那么会警告被构建的入口文件未被使用。
- 如果页面上引用的入口模块未被构建，则会警告丢失入口文件。




# 异步模块
每一个异步模块都会分配一个独一无二的 ID。
```
require.async('./pages/page1.js');

=>

r.async("1");
```

每一个异步模块，在调用的时候都会再次执行。即：
```
// pages/page1.js
define(function(){
    alert('1');
});
```

```
// app.js
define(function(require){
    require.async('./pages/page1.js');
    // => alert 1
    require.async('./pages/page1.js');
    // => alert 1
});
```

**须知：`require.async` 调用了两次 `pages/page1.js`，就会执行两次，这与`require`的结果是不一样的。**


# 引用资源路径关系
如这样一个 css 模块：
```
.demo1{
    background: url("./demo1.png");
    /* 相对于当前 css 文件 */
}

.demo2{
    background: url("/demo2.png");
    /* 相对于网站根目录 */
}
```

相对于样式目录（.demo1）的资源都会被编译成 base64 编码，而相对于网站根目录（.demo2）的资源会被修改为绝对路径：
```
.demo1{
    background: url("data:image/png;base64,.....");
    /* 编译成 base64 编码 */
}

.demo2{
    background: url("/static/res/xxxxoooo.png");
    /* 修改为绝对路径 */
}
```

同样，模块化的 css、html 文件引用的静态资源都遵循这个原则。
```
<img src="./demo1.png">
<img src="/demo2.png">
```
构建之后：
```
<img src="data:image/png;base64,.....">
<img src="/static/res/xxxxoooo.png">
```

**注意**
不要将模块化的 css、text、html、image 模块与项目使用的 css、html 文件混淆。



