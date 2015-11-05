# 安装

在安装 coolie 之前，你需要安装 nodejs（官网：<https://nodejs.org/>） 环境，如果你是前端开发者，
那么你对 nodejs 应该有一定程度的了解，这里就不作详述了。

coolie 的安装很简单。全局条件下，安装即可：
```
sudo npm install -g coolie
```

如果长时间无反应，也可以使用[淘宝源](http://cnpmjs.org/)来安装。

```
sudo npm install -g coolie --registry=https://r.cnpmjs.org
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
sudo npm update -g coolie
```

如果长时间无反应，也可以使用[淘宝源](http://cnpmjs.org/)来更新。

```
sudo npm update -g coolie --registry=https://r.cnpmjs.org
```