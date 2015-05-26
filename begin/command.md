# 命令
如果你忘了 coolie 的命令是什么了，那么可以直接输入`coolie`即可：
```
➜ coolie

            ╔═══════════════════════════════════════════════════════╗
            ║          coolie.cli@0.16.13                           ║
            ║          The front-end development builder.           ║
            ╚═══════════════════════════════════════════════════════╝

coolie book          => 打开 coolie book
coolie version       => 输出版本号
coolie pull [path]   => 下载 coolie.min.js 到指定目录
coolie alien [path]  => 下载 alien/ 到指定目录
coolie config [path] => 在指定目录生成`coolie-config.js`
coolie json [path]   => 在指定目录生成`coolie.json`
coolie build [path]  => 在指定目录根据`coolie.json`配置文件执行构建HTML/JS/CSS
```

当然，输入未注册的命令，都会输出这个帮助列表。

## coolie wiki
命令将会使用默认浏览器打开 wiki 页面，这里打开的是 coolie book 的官网。
```
coolie wiki
```



{% include "../_include/cnzz.md" %}