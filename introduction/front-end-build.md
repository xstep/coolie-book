coolie 作为可能最好的前端开发构建工具，它做了哪些事情？

# JS 文件的分析、合并、压缩、版本管理
```
<!-- coolie -->
<script src="./src/single1.js"></script>
<script src="./src/single2.js"></script>
<!-- /coolie -->

=>

<script src="/src/6c762d4e4b7d1e9504281bc12abd65b9.js"></script>
```

示意图：

[![](http://s1.momo.moda/2015/06/28/b337e84de8752b27eda3a12363109e80.jpg)](http://s1.momo.moda/2015/06/28/b337e84de8752b27eda3a12363109e80.jpg)


# CSS 文件的分析、合并、压缩、版本管理
```
<!-- coolie -->
<link rel="stylesheet" type="text/css" href="./src/single1.css">
<link rel="stylesheet" type="text/css" href="./src/single2.css">
<!-- /coolie -->

=>

<link rel="stylesheet" href="/src/bdd8e022ce7470f06d7183daabac0b79.css">
```

示意图：

[![](http://s1.momo.moda/2015/06/28/11b9842e0a271ff252c1903e7132cd68.jpg)](http://s1.momo.moda/2015/06/28/11b9842e0a271ff252c1903e7132cd68.jpg)


# HTML 文件分析、压缩、版本管理
```
<!DOCTYPE html>

<link rel="stylesheet" href="/src/bdd8e022ce7470f06d7183daabac0b79.css">

<script src="/src/6c762d4e4b7d1e9504281bc12abd65b9.js"></script>

<img src="/src/57b007ddecc025d9fcfbe207d5febff8.png" >

<script src="/src/coolie.min.js" 
data-config="./coolie-config.3ec9b6f8a4c6913cd58f2e844a809418.js" 
data-main="entry1.js"></script>
<!--coolie@0.21.6-->
```

- link 文件的版本管理以及资源定位
- script 文件的版本管理以及资源定位
- img 图片资源的版本管理及资源定位
- coolie 模块的版本管理

见图：

[![](http://s1.momo.moda/2015/06/28/f770b62bc8f42a0b66751fe636fc6eb0.jpg)](http://s1.momo.moda/2015/06/28/f770b62bc8f42a0b66751fe636fc6eb0.jpg)

# 入口模块的分析、分块、合并、压缩、版本管理
## 未分块构建
```

   ╔═════════════════════════════════════════╗
   ║   coolie@0.21.6                         ║
   ║   The front-end development builder.    ║
   ╚═════════════════════════════════════════╝


                 1/5 => copy files

                 2/5 => build main
                  √  => /Users/zhangyunlai/development/test/webpack-demo2/dev/src/entry1.js
                  √  => /Users/zhangyunlai/development/test/webpack-demo2/dev/src/entry2.js
                  ×  => unchunk modules  # 未分块提示

                 3/5 => overwrite config
                  √  => base: "./"
                  √  => version: "{
                          "entry1.js": "0ba981967e8b2712d6da6114ae90675c",
                          "entry2.js": "1c9621d551021410aa19acb2ecac94dc"
                        }"
                  √  => callbacks: 0
                  √  =>/path/to/src/coolie-config.c58dd5aa2dacebd9a86c92b49b66a6ba.js

                 4/5 => build html css
                  √  =>/path/to/src/bdd8e022ce7470f06d7183daabac0b79.css
                  √  =>/path/to/src/6c762d4e4b7d1e9504281bc12abd65b9.js
                  √  =>/path/to/src/coolie.min.js
                  √  => /Users/zhangyunlai/development/test/webpack-demo2/dev/*.html

                 5/5 => generator relationship map
                  ×  => unuse main file: src/entry2.js   # 未被使用的入口模块
                  √  =>/path/to/relationship-map.json

       build success => copy 1 file(s),
                        build 2 main file(s),
                        build 2 js file(s),
                        build 1 html file(s),
                        build 2 css file(s),
                        build 1 resource file(s),
                        past 273 ms

```

结果演示图：
[![](http://s1.momo.moda/2015/06/27/258be18e31c8188555c2ff05b4d542c3.jpg)](http://s1.momo.moda/2015/06/27/258be18e31c8188555c2ff05b4d542c3.jpg)


## 分块构建
增加 chunk 配置：
```
"chunk": [
  "./src/*.css"
]
```
构建：
```

   ╔═════════════════════════════════════════╗
   ║   coolie@0.21.6                         ║
   ║   The front-end development builder.    ║
   ╚═════════════════════════════════════════╝


                 1/5 => copy files

                 2/5 => build main
                  √  => /Users/zhangyunlai/development/test/webpack-demo2/dev/src/entry1.js
                  √  => /Users/zhangyunlai/development/test/webpack-demo2/dev/src/entry2.js
                  √  =>/path/to/src/0.f742806efb38e71549892166a48a8aef.js
                  # ^ chunk 模块

                 3/5 => overwrite config
                  √  => base: "./"
                  √  => version: "{
                          "entry1.js": "91cb74122882309fbbcfd7a708b4e928",
                          "entry2.js": "39649d990b579fa4916673f550853c0c",
                          "0.js": "f742806efb38e71549892166a48a8aef"  # chunk 模块
                        }"
                  √  => callbacks: 0
                  √  =>/path/to/src/coolie-config.3ec9b6f8a4c6913cd58f2e844a809418.js

                 4/5 => build html css
                  √  =>/path/to/src/bdd8e022ce7470f06d7183daabac0b79.css
                  √  =>/path/to/src/6c762d4e4b7d1e9504281bc12abd65b9.js
                  √  =>/path/to/src/coolie.min.js
                  √  => /Users/zhangyunlai/development/test/webpack-demo2/dev/*.html

                 5/5 => generator relationship map
                  ×  => unuse main file: src/entry2.js
                  √  =>/path/to/relationship-map.json

       build success => copy 1 file(s),
                        build 2 main file(s),
                        build 2 js file(s),
                        build 1 html file(s),
                        build 2 css file(s),
                        build 1 resource file(s),
                        past 229 ms

```
来看看 chunk 模块：
```
/*coolie@0.21.6*/
define("2",[],function(y,d,r){r.exports="html{margin:0;padding:0}"});
```
构建结果：

[![](http://s1.momo.moda/2015/06/27/6faa8040da20ef399b63a72d0e4ab575.jpg)](http://s1.momo.moda/2015/06/27/6faa8040da20ef399b63a72d0e4ab575.jpg)

# 静态资源的分析、压缩、版本管理
CSS 文件里引用了图片，**bdd8e022ce7470f06d7183daabac0b79.css**：
```
/*coolie@0.21.6*/
html{margin:0;padding:0}
body{background:url(57b007ddecc025d9fcfbe207d5febff8.png)}
```

模块里引用的 CSS 文件里引用的图片，**entry1.0ba981967e8b2712d6da6114ae90675c.js**：
```
/*coolie@0.21.6*/
define("0",["1","2","3"],function(n){n("1");n("2");n("3")});
define("1",[],function(){console.log("module")});
define("2",[],function(y,d,r){r.exports="html{margin:0;padding:0}"});
define("3",[],function(y,d,r){r.exports="body{background:url(data:image/png;base64,...)}"});
```


{% include "../_include/cnzz.md" %}


