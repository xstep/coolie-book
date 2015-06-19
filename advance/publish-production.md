先抛一个问题？

> 是先将静态资源发布到 CDN？还是先发布页面？

如果没有版本管理的话，第一个版本
```
// index.js

var index = 123;
```

第二个版本，内容发生了变化：
```
// index.js

var index = 456;
```

但文件名称没有变，因此该文件的引用依然是旧的文件，这会导致客户端浏览器上，
无论你怎样发布 CDN，访问到的都是旧的文件，因为旧的文件，已经被 CDN 缓存了。

而如果此时，线上环境出现重大 BUG，需要回滚，怎么办？如果此时，CDN 的缓存
已经过期了，用户访问到的是刚才第二次的版本，而此时系统已经回滚到第一个版本，
又导致用户访问的是错误的文件。

# 传统

传统的做法是：

1. 在发布到生产环境之后，清除 CDN 缓存。
2. 修改引用文件的版本号，如`index.js?v=2`



# 现在
现在，coolie 可以有了更好的解决办法：

不同的文件内容，构建生产的是不同的版本号。如，第一个版本生成的是`index.123.js`，
第二个版本生成的是`index.456.js`。两个文件可以同时存在，只要 html 文件没有发布，
用户访问的都是第一个版本，只要 html 发布了，用户访问的就是新版本（第二个版本）。
而当需要回滚的时候，用户访问的就是第一个版本。

根本不会出现静态资源导致用户缓存出现问题。



# 发布

如何发布到 CDN？

- 发布到阿里云：<https://www.npmjs.com/package/alioss>
- 发布到七牛云：<https://www.npmjs.com/package/7niu>

现在，发布到生产环境可以分成：

```
删除生产环境代码 => 前端构建 => 发布到 CDN => 提交代码 => 后端编译 => 后端上线
|------------------- 前端构建 -------------------|
```

可以将前端构建的命令写成 sh 文件、npm 的 scripts 命令、makefile 文件，甚至是手动敲命令。

这里以 npm 的 scripts 为例：
```
"scripts": {
    "release": "rm -rf ./webroot-pro && coolie build webroot-dev && 7niu upload && git add webroot-pro && git commit -am 'release' && git push"
}
```

- `rm -rf ./webroot-pro`：删除生产环境代码
- `coolie build webroot-dev`：前端构建
- `7niu upload`：将静态文件上传到 CDN
- `git add webroot-pro && git commit -am 'release' && git push`：提交代码

