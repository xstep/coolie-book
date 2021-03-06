前端构建工具指的是`coolie-cli`，基于 nodejs，是系统工具，安装之后会注册全局命令`coolie`。
工具全部源码均已开源（仓库：<https://github.com/cooliejs/coolie-cli>）。

coolie-cli 是前端构建工具，是前端工程化解决方案，不是编译工具
（常见问题：[什么是编译，什么是构建](/introduction/common-problems/#heading-1-1)）。


# 全局命令
```
➜  coolie

                                  oooo    o8o
                                  `888    `"'
  .ooooo.    .ooooo.    .ooooo.    888   oooo    .ooooo.
 d88' `"Y8  d88' `88b  d88' `88b   888   `888   d88' `88b
 888        888   888  888   888   888    888   888ooo888
 888   .o8  888   888  888   888   888    888   888    .o
 `Y8bod8P'  `Y8bod8P'  `Y8bod8P'  o888o  o888o  `Y8bod8P'

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.22                                      ║
║   The front-end development builder.                 ║
╚══════════════════════════════════════════════════════╝

1. Command
   build                  >> build a front-end project
   book                   >> open coolie book in default browser
   install <module>       >> install a coolie module
   init                   >> initial configuration file
   help                   >> show help information
   version                >> show version information

2. Options
   -d --dirname           >> specified a directory
   -j --coolie.js         >> initial configuration file of `coolie.js`
   -c --coolie-cli        >> initial configuration file of `coolie-cli`

```



# coolie build
执行前端构建。

默认构建目录为当前工作目录，也可以使用`-d`或`--dirname`参数指定构建目录。

前端构建时，需要在指定目录查找配置文件，顺序为：
```
coolie.config.js
coolie.json
```
如果两个文件都没有找到，则会抛出错误。


# coolie book
使用默认浏览器打开 coolie 官网，即你当前看到的网站。


# coolie install <module>
安装一个 coolie 支持的前端模块。目前支持的有：

- [alien](https://github.com/cloudcome/alien) 
- [donkey](https://github.com/cloudcome/donkey) 
- [coolie](https://github.com/cooliejs/coolie.js) 


# coolie init
初始化配置文件。目前支持初始化以下配置文件：

- 前端模块加载器（`coolie.js`）的配置文件，使用`-j`或`--coolie.js`参数
- 前端开发构建工具（`coolie-cli`）的配置文件，使用`-c`或`--coolie-cli`参数


# coolie help
输出帮助信息。


# coolie version
输出版本信息，显示本地的前端开发构建工具版本，和线上最新的前端模块加载器、前端开发构建工具版本。



