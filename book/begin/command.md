如果你忘了 coolie 的命令是什么了，那么可以直接输入`coolie`即可：
```
➜ coolie

╔═════════════════════════════════════════╗
║   coolie@0.22.4                         ║
║   The front-end development builder.    ║
╚═════════════════════════════════════════╝

coolie version       => 输出版本号
coolie build [path]  => 在指定目录根据`coolie.json`执行前端构建
coolie json [path]   => 在指定目录生成`coolie.json`
coolie pull [path]   => 下载 coolie.min.js 到指定目录
coolie config [path] => 在指定目录生成`coolie-config.js`
coolie book          => 打开 coolie book
```

当然，输入未注册的命令，都会输出这个帮助列表。

**注意：**

- 在 cli 命令中，`[optional]`表示可选参数，`<required>`表示必选参数。
- 大多数命令，都会以`key => val`的形式出现，其中`key`表示当前输出的标题、名称，`val`表示当前输出的实际内容。


# coolie book
命令将会使用默认浏览器打开 coolie book 官网。
```
➜  coolie book

╔═════════════════════════════════════════╗
║   coolie@0.22.4                         ║
║   The front-end development builder.    ║
╚═════════════════════════════════════════╝

         coolie book => http://coolie.ydr.me/
```


# coolie version
显示输出当前本地 coolie 的版本号，以及在线的 coolie.js（前端模块加载器） 和 coolie.cli（前端构建工具） 的最新版本。
```
➜  coolie version

╔═════════════════════════════════════════╗
║   coolie@0.22.4                         ║
║   The front-end development builder.    ║
╚═════════════════════════════════════════╝

       local version => 0.22.4
        check update => wait a moment...
           coolie.js => 1.1.1
          coolie.cli => 0.20.4
```



# coolie pull [path]
下载最新的 coolie.js（前端模块加载器） 到本地，默认为当前工作目录。
```
➜  coolie pull

╔═════════════════════════════════════════╗
║   coolie@0.22.4                         ║
║   The front-end development builder.    ║
╚═════════════════════════════════════════╝

 pull coolie.min.js => https://raw.githubusercontent.com/cloudcome/coolie/master/coolie.min.js
   coolie.js version => 1.1.1
  pull coolie.min.js => /Users/zhangyunlai/Downloads/coolietest/coolie.min-1.1.1.js
```



# coolie config [path]
在指定目录生成`coolie-config.js`（前端模块加载器的配置文件），默认为当前工作目录。
```
➜  coolie config

╔═════════════════════════════════════════╗
║   coolie@0.22.4                         ║
║   The front-end development builder.    ║
╚═════════════════════════════════════════╝

                tips => 以下操作留空回车表示同意默认配置。

           file path => /path/to/coolie-config.js
             warning => 如果上述目录不正确，请按`ctrl+C`退出后重新指定。
                 1/2 => 请输入`base`值，默认为“./app/”：
                        `base`路径是相对于`coolie-config.js`所在的目录，即当前目录：
                        /Users/zhangyunlai/Downloads/test
                        `base`即为入口模块的基准路径。

                 2/2 => 文件内容为：
    coolie-config.js => coolie.config({
                            "base": "./app/"
                        }).use();
             confirm => 确认文件内容正确并生成文件？（[y]/n）

                  √  => /path/to/coolie-config.js
```
如上，`1/2`表示对话询问进度，`1`表示第一步，`2`表示一共有两步。

如上生成的文件内容为：
```
coolie.config({
    "base": "./app/"
}).use();
```
关于各个参数的解释，[后文会详细说到](./coolie-config.js.md)。


# coolie json [path]
在指定目录生成`coolie.json`（前端构建工具的配置文件），默认为当前工作目录。
```
➜  coolie json

╔═════════════════════════════════════════╗
║   coolie@0.22.4                         ║
║   The front-end development builder.    ║
╚═════════════════════════════════════════╝

                tips => 以下操作留空回车表示同意默认配置。

           file path => /path/to/coolie.json
             warning => 如果上述目录不正确，请按`ctrl+C`退出后重新指定。
                 1/7 => 请输入 JS 入口模块的路径。
                        支持通配符，多个路径使用空格分开，默认为“./static/js/app/**/*.js”。

                 2/7 => 请输入 coolie.js 配置文件所在的路径，默认为“./static/js/coolie-config.js”。

                 3/7 => 请输入合并压缩后的非模块化 JS 文件的保存目录。默认为“./static/js/”。
                        不建议与 JS 入口模块的目录一样

                 4/7 => 请输入合并压缩后的 CSS 文件的保存目录。默认为“./static/css/”。

                 5/7 => 请输入 HTML 文件所在的路径。
                        支持通配符，多个路径使用空格分开。默认为“./views/**/*.html”。

                 6/7 => 请输入构建之后的静态资源（如：图片、字体）的目录，默认为“./static/res/”。

                 7/7 => 请输入构建的目标目录，默认为“../dest/”。

             confirm => 文件内容为：
         coolie.json => {
                          "js": {
                            "main": [
                              "./static/js/app/**/*.js"
                            ],
                            "coolie-config.js": "./static/js/coolie-config.js",
                            "dest": "./static/js/",
                            "chunk": []
                          },
                          "css": {
                            "dest": "./static/css/",
                            "minify": {
                              "compatibility": "ie7"
                            }
                          },
                          "html": {
                            "src": [
                              "./views/**/*.html"
                            ],
                            "minify": true
                          },
                          "resource": {
                            "dest": "./static/res/",
                            "minify": true
                          },
                          "copy": [],
                          "dest": {
                            "dirname": "../dest/",
                            "host": "",
                            "versionLength": 32
                          }
                        }
             confirm => 确认文件内容正确并生成文件？（[y]/n）

                  √  => /path/to/coolie.json
```
如上生成的内容为：
```
{
  "js": {
    "main": [
      "./static/js/app/**/*.js"
    ],
    "coolie-config.js": "./static/js/coolie-config.js",
    "dest": "./static/js/",
    "chunk": []
  },
  "css": {
    "dest": "./static/css/",
    "minify": {
      "compatibility": "ie7"
    }
  },
  "html": {
    "src": [
      "./views/**/*.html"
    ],
    "minify": true
  },
  "resource": {
    "dest": "./static/res/",
    "minify": true
  },
  "copy": [],
  "dest": {
    "dirname": "../dest/",
    "host": "",
    "versionLength": 32
  }
}
```
关于各个参数的解释，[后文会详细说到](./coolie.json.md)。


# coolie build [path]
coolie.cli 最核心的命令，在指定目录执行前端构建操作，默认为当前目录。

当前项目的目录结构为：
```
- webroot-dev 前端开发环境目录
- webroot-pto 前端生产环境目录
```
执行命令：
```
➜  coolie build

╔═════════════════════════════════════════╗
║   coolie@0.22.4                         ║
║   The front-end development builder.    ║
╚═════════════════════════════════════════╝

                 1/5 => copy files

                 2/5 => build main
                  √  => /static/js/app/area.js
                  √  => /static/js/app/length.js
                  ×  => unchunk modules

                 3/5 => overwrite config
                  √  => base: "./app/"
                  √  => version: "{
                          "area.js": "e633541fdaad38d5a0a86b24c3ad419c",
                          "length.js": "cac2241d618488f567abef6c7c99dd0d"
                        }"
                  √  => callbacks: 0
                  √  => /../webroot-pro/static/js/coolie-config.a08fb1c42a015ae88579ff31af1593bd.js

                 4/5 => build html css
                  √  => /static/fonts/glyphicons-halflings-regular.eot
                  √  => /static/fonts/glyphicons-halflings-regular.woff2
                  √  => /static/fonts/glyphicons-halflings-regular.woff
                  √  => /static/fonts/glyphicons-halflings-regular.ttf
                  √  => /static/fonts/glyphicons-halflings-regular.svg
                  √  => /static/img/apic9517.png
                  √  => /../webroot-pro/static/css/255990a3b6b5b76cf3488ffb76157d45.css
                  √  => /../webroot-pro/static/js/ba1c8824da1cb2b0d3f7e94f2aea8b8d.js
                  √  => /views/area.html
                  √  => /views/length.html
                  √  => /index.html

                 5/5 => generator relationship map
                  √  => /../webroot-pro/relationship-map.json

       build success => copy 7 file(s),
                        build 2 main file(s),
                        build 0 js file(s),
                        build 3 html file(s),
                        build 6 css file(s),
                        build 0 resource file(s),
                        past 208 ms
```
如上，前端构建的时候，分为 5 个步骤：

- 1/5：将需要复制的文件复制到构建目录。
- 2/5：JS 文件的构建过程。
- 3/5：生成新的模块加载器配置文件，主要添加了版本管理。
- 4/5：HTML、CSS、静态文件的构建过程，因为这个过程是糅合的，无法将其分开。
- 5/5：生成资源引用关系图。

我们来看看生成后的`coolie-config.a08fb1c42a015ae88579ff31af1593bd.js`是怎样的（为了便于阅读，已将压缩文件格式化）：
```
*coolie@0.22.4*/
coolie.config({
    base:"./app/",
    debug:!1,
    cache:!0,
    version:{
        "area.js":"e633541fdaad38d5a0a86b24c3ad419c",
        "length.js":"cac2241d618488f567abef6c7c99dd0d"
    }
}).use();
```
生成的**relationship-map.json**：
```
    "views/area.html": {
        "css": {
            "static/css/255990a3b6b5b76cf3488ffb76157d45.css": [
                "static/css/font.css",
                "static/css/img.css",
                "static/css/style.css"
            ]
        },
        "js": {},
        "main": "static/js/app/area.js",
        "deps": [
            "static/js/utils.js"
        ]
    },
    "views/length.html": {
        "css": {
            "static/css/255990a3b6b5b76cf3488ffb76157d45.css": [
                "static/css/font.css",
                "static/css/img.css",
                "static/css/style.css"
            ]
        },
        "js": {},
        "main": "static/js/app/length.js",
        "deps": [
            "static/js/utils.js"
        ]
    },
    "index.html": {
        "css": {},
        "js": {},
        "main": ""
    }
}
```

# 快速上手

- 普通构建：[coolie入门6-coolie 实例演示](http://frontenddev.org/article/introductory-coolie-6-coolie-example-demonstration.html)
- 分块构建：[跟我学 coolie 之 5 模块分块构建](http://frontenddev.org/article/follow-me-coolie-5-module-block-building.html)

{% include "../_include/cnzz.md" %}