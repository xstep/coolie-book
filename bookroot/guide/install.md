# 准备

- NodeJS <https://nodejs.org/>
- 一台能够联网的计算机
- 会敲简单命令
- 保持学习的心态

在安装 coolie 之前，你需要安装 nodejs（官网：<https://nodejs.org/>） 环境。
无论是 mac 还是 pc 用户，都可以直接下载安装包可视化安装。

安装完成之后，打开命令行窗口，输入
```
node -v
```
会显示当前安装的 node 版本号
```
v4.2.1
```
输入
```
npm -v
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

如果长时间无反应，也可以使用[淘宝源](http://cnpmjs.org/)来安装。

```
npm install -g coolie --registry=https://r.cnpmjs.org
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

╔══════════════════════════════════════════════════════╗
║   coolie@1.0.0                                       ║
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
   -c --"coolie cli"      >> initial configuration file of `coolie cli`

```



# 更新
```
npm update -g coolie
```

如果长时间无反应，也可以使用[淘宝源](http://cnpmjs.org/)来更新。

```
sudo npm update -g coolie --registry=https://r.cnpmjs.org
```

