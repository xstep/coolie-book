# 准备

- NodeJS <https://nodejs.org/>
- 一台能够联网的计算机
- 会敲简单命令
- 保持学习的心态

在安装 coolie 之前，你需要安装 nodejs
（官网：<https://nodejs.org/>，淘宝镜像：<http://npm.taobao.org/mirrors/node>） 环境。
无论是 mac 还是 pc 用户，都可以直接下载安装包可视化安装。

安装完成之后，打开命令行窗口，输入
```
➜  node -v
```
会显示当前安装的 node 版本号
```
v4.2.1
```
输入
```
➜  npm -v
```
会输出当前安装的 npm 版本号
```
2.14.7
```


# 安装
coolie 的安装很简单。全局条件下（`-g`参数表示`global`，义为全局），安装即可：
```
npm install -g coolie
```

如果长时间无反应，也可以使用[淘宝源](https://npm.taobao.org/)来安装。

```
npm install -g coolie --registry=http://registry.npm.taobao.org
```

安装完成后，来调戏下他吧：
```
➜ coolie


                                  oooo    o8o
                                  `888    `"'
  .ooooo.    .ooooo.    .ooooo.    888   oooo    .ooooo.
 d88' `"Y8  d88' `88b  d88' `88b   888   `888   d88' `88b
 888        888   888  888   888   888    888   888ooo888
 888   .o8  888   888  888   888   888    888   888    .o
 `Y8bod8P'  `Y8bod8P'  `Y8bod8P'  o888o  o888o  `Y8bod8P'

┌──────────────────────────────┐
│ coolie@2.0.0                 │
│ 前端工程化构建工具           │
│ 官网：https://coolie.ydr.me/ │
└──────────────────────────────┘


1. 命令
   build              >>  前端工程化构建
   book               >>  打开 coolie 官方指南
   init               >>  初始化配置文件
   create             >>  创建一个 coolie 样板工程
   demo <demoId>      >>  下载 coolie 官方示例
   help               >>  打印帮助信息
   version            >>  打印版本信息

2. 参数
   -h --help          >>  打印命名的帮助信息
   -d --dirname       >>  指定目标目录，默认为当前工作目录
   -j --coolie.js     >>  初始化模块加载器配置文件，生成文件名为`coolie-config.js
   -c --coolie-cli    >>  初始化前端工程化构建配置文件，生成文件名为`coolie.config.js
   -e --express       >>  选择 express 全栈工程样板
   -s --static        >>  选择静态工程样板
   -r --redis         >>  是否在 express 样板中使用 redis
   -m --mongoose      >>  是否在 express 样板中使用 mongoose
```



# 更新
可以定期检查下 coolie-cli 是否有更新，以便体验到更优质的构建效果。
```
➜ coolie version
```

更新 coolie-cli，需要使用 npm

```
➜ npm update -g coolie
```

如果长时间无反应，也可以使用[淘宝源](https://npm.taobao.org/)来更新。

```
sudo npm update -g coolie --registry=http://registry.npm.taobao.org
```

