# JS 合并

详细参考 [内容压缩策略](/introduction/content-compression.md)。


# JS 压缩

JS 压缩采用的是 [uglify-js](https://www.npmjs.com/package/uglify-js) 模块，默认配置为：

```
{
    // 连续单语句，逗号分开
    // 如： alert(1);alert(2); => alert(1),alert(2)
    sequences: false,
    // 重写属性
    // 如：foo['bar'] => foo.bar
    properties: false,
    // 删除无意义代码
    dead_code: false,
    // 移除`debugger;`
    drop_debugger: true,
    // 使用以下不安全的压缩
    unsafe: false,
    // 不安全压缩
    unsafe_comps: false,
    // 压缩if表达式
    conditionals: true,
    // 压缩条件表达式
    comparisons: true,
    // 压缩常数表达式
    evaluate: true,
    // 压缩布尔值
    booleans: true,
    // 压缩循环
    loops: true,
    // 移除未使用变量
    unused: false,
    // 函数声明提前
    hoist_funs: true,
    // 变量声明提前
    hoist_vars: false,
    // 压缩 if return if continue
    if_return: true,
    // 合并连续变量省略
    join_vars: true,
    // 小范围连续变量压缩
    cascade: true,
    // 显示警告语句
    warnings: false,
    // 全局变量，会在构建之后，删除
    global_defs: {
        DEBUG: false
    }
}
```

# demo

新建一个`coolie-demo2`目录：
```
coolie-demo2
└── src
```

写 2 个 JS 文件，分别为 `1.js` 和 `2.js`：
```
// 1.js
window.onload = function(){
    alert('hello');
};
```

```
// 2.js
window.onload = function(){
    alert(window.onload.toString());
};
```

在来个`index.html`:
```
<!doctype html>
<meta charset="utf8">

<!--coolie-->
<script src="1.js"></script>
<script src="2.js"></script>
<!--/coolie-->
```

新建一个`coolie-config.js`，用来标识模块加载器的配置，虽然这里没有用到，但还是需要的。
```
coolie.config({
	base: './'
}).use();
```

此时的目录结构为：
```
coolie-demo2
├── dest
└── src
    ├── 1.js
    ├── 2.js
    ├── coolie-config.js  # 模块加载器的配置文件
    ├── coolie.config.js  # 前端构建工具配置文件
    └── index.html
```

使用 [sts](https://www.npmjs.com/package/sts) 执行：
```
➜  cd src
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.162:62019
```

![](http://s.ydr.me/@/res/20151210160446617400855164 =420x156)


执行构建：
```
➜  coolie build

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.17                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝


                 1/6 >> parse coolie config
       coolie config >> /path/to/coolie-demo2/src/coolie.config.js
         src dirname >> /path/to/coolie-demo2/src
        dest dirname >> /path/to/coolie-demo2/dest/

                 2/6 >> copy files
          copy files >> no files are copied

                 3/6 >> build main module

                 4/6 >> override coolie-config.js
                   √ >> base: "./"
                   √ >> async: "async/"
                   √ >> chunk: "chunk/"
                   √ >> version: "{}"
                   √ >> callbacks: 0
                   √ >> ../dest/static/js/79f9ed3283181085347bfea15ac65773.js

                 5/6 >> build html
                   √ >> /static/js/06f5f56a93baa9089b10b901861c36dd.js
                   √ >> /index.html

                 6/6 >> generate a resource relationship map
                   √ >> ../dest/coolie-map.json

       build success >> past 156ms
```

构建之后的目录结构为：
```
coolie-demo2
├── dest
│   ├── coolie-map.json
│   ├── index.html
│   └── static
│       └── js
│           ├── 06f5f56a93baa9089b10b901861c36dd.js
│           └── 79f9ed3283181085347bfea15ac65773.js
└── src
    ├── 1.js
    ├── 2.js
    ├── coolie-config.js
    ├── coolie.config.js
    └── index.html
```

切换到`dest`目录再次执行：
```
➜  cd ../dest
➜  sts
                 sts >> A static server is running.
                open >> http://192.168.0.162:62282
```


![](http://s.ydr.me/@/res/20151210160722747529803842 =420x153)



通过两次弹窗内容，就可以知道构建之后的内容是经过压缩了。来看看构建之后的资源地图`coolie-map.json`：
```
{
  "/index.html": {
    "main": [],
    "async": [],
    "js": [
      {
        "dest": "../dest/static/js/06f5f56a93baa9089b10b901861c36dd.js",
        "deps": [
          "/1.js",
          "/2.js"
        ]
      }
    ],
    "css": []
  }
}
```

看看`index.html`：
```
<!doctype html><meta charset="utf8"> <script src="/static/js/06f5f56a93baa9089b10b901861c36dd.js"></script>
<!--coolie@1.0.17-->
```

代码经过压缩，并且合并了之前标记的`1.js`和`2.js`为`06f5f56a93baa9089b10b901861c36dd.js`。

看看`06f5f56a93baa9089b10b901861c36dd.js`：
```
/*coolie@1.0.17*/
window.onload=function(){alert("hello")};
window.onload=function(){alert(window.onload.toString())};
```


