帮你领进门，学习完 hello world，就算是入门结束了，下面开始。

# 准备
先准备以下目录
```
. demo
|-- dev 开发环境
|   |-- coolie.json
|   |-- coolie.min.js
|   |-- coolie-config.js
|   |-- hello.html
|   `-- hello.js
`-- pro 生成环境
    `-- 空
```

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

# coolie.json
```
{
  "js": {
    "src": [
      "./hello.js"
    ],
    "coolie-config.js": "./coolie-config.js"
  },
  "css": {
    "dest": "./static/css/",
    "minify": {
      "compatibility": "ie7"
    }
  },
  "html": {
    "src": [
      "./hello.html"
    ],
    "minify": true
  },
  "resource": {
    "dest": "./static/res/"
  },
  "copy": [],
  "dest": {
    "dirname": "../pro/",
    "host": ""
  }
}
```

- `js.src`：入口文件，即 hello.js
- `html.src`：需要构建的 HTML，即 hello.html
- `dest.dirname`：构建的目标目录，即上层的 pro 目录

# 构建
目前，源代码什么都是没有被构建的，我们来尝试构建一下看看。
```
➜ coolie build

            ╔═══════════════════════════════════════════════════════╗
            ║          coolie.cli@0.17.0                            ║
            ║          The front-end development builder.           ║
            ╚═══════════════════════════════════════════════════════╝


                 1/5 => copy files

                 2/5 => build main
                  √  => /path/to/demo/dev/hello.js

                 3/5 => overwrite config
                  √  => base: "./"
                  √  => version: "{
                          "hello.js": "4f60ff2579e7b55f2e1ca87ba2221fde"
                        }"
                  √  => callbacks: 0
                  √  => /path/to/demo/pro/coolie-config.2a8dac0468211aefcaf584c3035207ab.js

                 4/5 => build html css
                  √  => /path/to/demo/pro/coolie.min.js
                  √  => /path/to/demo/dev/hello.html

                 5/5 => generator relationship map
                  √  => /path/to/demo/pro/relationship-map.json

       build success => copy 1 file(s),
                        build 1 js file(s),
                        build 1 html file(s),
                        build 0 css file(s),
                        build 0 resource file(s),
                        past 119 ms
```

我们来看看构建之后的目录结构：
```
. demo
|-- dev 开发环境
|   |-- coolie.json
|   |-- coolie.min.js
|   |-- coolie-config.js
|   |-- hello.html
|   `-- hello.js
`-- pro 生成环境
    |-- coolie.min.js
    |-- coolie-config.2a8dac0468211aefcaf584c3035207ab.js
    |-- hello.4f60ff2579e7b55f2e1ca87ba2221fde.js
    |-- hello.html
    `-- relationship-map.json
```

# html
*为了阅读，已经折行处理了。*
```
<!DOCTYPE html><html><head lang="zh-cn"> <meta charset="UTF-8"> <title>hello.html</title></head>
<body><script src="./coolie.min.js" data-config="./coolie-config.2a8dac0468211aefcaf584c3035207ab.js" 
data-main="hello.js"></script></body></html>
<!--coolie@0.17.0 1433515570936-->
```

- 在文件末尾打上构建工具的版本和的构建时间。
- `script`上的`coolie`属性也被去掉了。
- `data-config`属性也被重写了。

# js
## coolie-config.js
构建之后的前端模块加载器配置文件为`coolie-config.2a8dac0468211aefcaf584c3035207ab.js`。

*为了阅读，已经折行处理了。*
```
/*coolie@0.17.0 1433515570885*/
coolie.config({
    base:"./",
    debug:!1,
    version:{
        "hello.js":"4f60ff2579e7b55f2e1ca87ba2221fde"
    }
}).use();
```

- 在文件开头，打上构建工具的版本和的构建时间。
- 增加了`debug`参数，值为 false（[详细参考点这里](./coolie-config.js.md)）。
- 增加了`version`属性，值为`hello.js`的版本（[详细参考点这里](./coolie-config.js.md)）。

## hello.js
新的`hello.js`重命名为`hello.4f60ff2579e7b55f2e1ca87ba2221fde.js`。

*为了阅读，已经折行处理了。*
```
/*coolie@0.17.0 1433515570881*/
define("0",[],function(){alert("hello world")});
```

- 在文件开头，打上构建工具的版本和的构建时间。
- 代码进行了压缩，并且加上了模块的 ID 为 “0”。


# relationship-map.json
`relationship-map.json`是新生成的文件。
```
{
    "hello.html": {
        "css": [],
        "main": "hello.js",
        "deps": []
    }
}
```
这个文件，按照构建的 HTML 文件分开，分别标识了每个 HTML 文件里引用的入口 JS 文件，依赖的 JS 模块和引用的 CSS 文件。


# demo
查看 demo 的时候，注意看看页面的源代码、Network 信息。

- [点击这里查看开发环境的效果](../demo/dev/hello.html)
- [点击这里查看生产环境的效果](../demo/pro/hello.html)



{% include "../_include/cnzz.md" %}
