# 安装

在安装 coolie 之前，你需要安装 nodejs（官网：<https://nodejs.org/>） 环境，如果你是前端开发者，
那么你对 nodejs 应该有一定程度的了解，这里就不作详述了。

coolie 的安装很简单。全局条件下，安装即可：
```
npm install -g coolie
```

安装完成后，来调戏下他吧：
```
➜  ✗ coolie

            ╔═══════════════════════════════════════════════════════╗
            ║          coolie.cli@0.16.11                           ║
            ║          The front-end development builder.           ║
            ╚═══════════════════════════════════════════════════════╝

coolie wiki          => 打开 WIKI 页面
coolie version       => 输出版本号
coolie pull [path]   => 下载 coolie.min.js 到指定目录
coolie alien [path]  => 下载 alien/ 到指定目录
coolie config [path] => 在指定目录生成`coolie-config.js`
coolie json [path]   => 在指定目录生成`coolie.json`
coolie build [path]  => 在指定目录根据`coolie.json`配置文件执行构建HTML/JS/CSS
```

目前，coolie 带有一些私有色彩，其中`coolie alien`命令，你可能用不到，但其他命令都是公用的。
你可能注意到了，coolie 没有`install`命令，coolie 目前没有全面实现包下载管理。


