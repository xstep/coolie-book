# 安装

在安装 coolie 之前，你需要安装 nodejs（官网：<https://nodejs.org/>） 环境，如果你是前端开发者，
那么你对 nodejs 应该有一定程度的了解，这里就不作详述了。

coolie 的安装很简单。全局条件下，安装即可：
```
npm install -g coolie
```

安装完成后，来调戏下他吧：
```
➜ coolie

╔═════════════════════════════════════════╗
║   coolie@0.22.8                         ║
║   The front-end development builder.    ║
╚═════════════════════════════════════════╝

coolie version       => 输出版本号
coolie build [path]  => 在指定目录根据`coolie.json`执行前端构建
coolie json [path]   => 在指定目录生成`coolie.json`
coolie pull [path]   => 下载 coolie.min.js 到指定目录
coolie config [path] => 在指定目录生成`coolie-config.js`
coolie book          => 打开 coolie book
```



