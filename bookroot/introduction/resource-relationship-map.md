# 资源分配特点

coolie 是前端工程的构建方案，以页面（html）为导向，JS 和 CSS 都是 HTML 的描述文件。
```
<!--app.html-->
<!doctype html>

<link href="style.css" rel="stylesheet">

<script src="app.js"></script>
```

如上，`style.css`是`app.html`的样式修饰，`app.js`是`app.html`的行为修饰。


# 资源关系图
因此，coolie 构建的之后的资源关系图就是这样划分的，来看看一个教完整的示例：

```
{
    "/html/app1.html": {
        "main": [
            {
                "src": "/static/js/app/app1.js",
                "dest": "../dest/static/js/app/app1_file_version.js",
                "deps": [
                    "/static/js/libs1/1.js",
                    "/static/js/libs1/2.js"
                ]
            }
        ],
        "async": [
            {
                "src": "/static/js/app/app1.js",
                "dest": "../dest/static/js/app/app1_file_version.js",
                "deps": [
                    "/static/js/libs1/1.js",
                    "/static/js/libs1/2.js"
                ]
            }
        ],
        "js": [
            {
                "dest": "../dest/static/js/jquery_file_version.js",
                "deps": [
                    "/static/js/3rd/jquery.js"
                ]
            }
        ],
        "css": [
            {
                "dest": "../dest/static/css/css1_file_version.css",
                "deps": [
                    {
                        "src": "/static/css/libs/0-normalize.css",
                        "res": []
                    },
                    {
                        "src": "/static/css/libs/1-base.css",
                        "res": []
                    }
                ]
            },
            {
                "dest": "../dest/static/css/css2_file_version.css",
                "deps": [
                    {
                        "src": "/static/css/modules/erp/header.css",
                        "res": [
                            "/static/img/modules/front/public.png"
                        ]
                    },
                    {
                        "src": "/static/css/modules/erp/sidebar.css",
                        "res": [
                            "/static/img/modules/erp/sidebar_icon.png"
                        ]
                    },
                    {
                        "src": "/static/css/modules/erp/footer.css",
                        "res": [
                            "/static/img/modules/front/public.png"
                        ]
                    }
                ]
            }
        ]
    }
}
```

首先，按照页面的路径为键分成不同的对象：
```
{
    "app1.html": {},
    "app2.html": {}
}
```

然后，在每一个 HTML 文件里依赖了各种描述文件。

```
"app1.html": {
    "main": [],
    "async": [],
    "js": {},
    "css": {}
}
```

以上，分别为：

- `main`：同步模块入口文件数组（一个 html 模板文件可以使用模板引擎条件判断输出不同的同步入口模块文件）
- `async`：异步模块入口文件数组（一个同步模块文件可以使用脚本条件判断载入不同的异步入口模块文件）
- `js`：非模块化的脚本分组文件
- `css`：link 分组的样式文件

接续往下看

```
"main": [
    {
        "src": "/static/js/app/app1.js",
        "dest": "../dest/static/js/app/app1_file_version.js",
        "deps": [
            "/static/js/libs1/1.js",
            "/static/js/libs1/2.js"
        ]
    }
]
```

同步入口模块的信息：

- `src`：同步入口模块的原始文件路径
- `dest`：同步入口模块构建之后的文件路径
- `deps`：同步入口模块依赖的模块数组


异步模块里的信息与同步模块一致。

```
"js": [
    {
        "dest": "../dest/static/js/jquery_file_version.js",
        "deps": [
            "/static/js/3rd/jquery.js"
        ]
    }
]
```

JS 里配置的是非模块化脚本的分组合并情况，如上

- `dest`：合并之后的文件路径
- `deps`：待合并的文件数组


CSS 的配置与之一致，只是 css 里多了一个引用资源信息：

```
"css": [
    {
        "dest": "../dest/static/css/css2_file_version.css",
        "deps": [
            {
                "src": "/static/css/modules/erp/header.css",
                "res": [
                    "/static/img/modules/front/public.png"
                ]
            },
            {
                "src": "/static/css/modules/erp/sidebar.css",
                "res": [
                    "/static/img/modules/erp/sidebar_icon.png"
                ]
            },
            {
                "src": "/static/css/modules/erp/footer.css",
                "res": [
                    "/static/img/modules/front/public.png"
                ]
            }
        ]
    }
]
```

- `dest`：合并之后的文件路径
- `deps`：待合并的文件数组
    - `src`：待合并的文件路径
    - `res`：待合并的文件引用的资源数组



