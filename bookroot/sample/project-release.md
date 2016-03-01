一个项目的发布过程通常包括以下步骤：

1. 前端构建
2. 上传静态资源
3. 上传代码


下面就这 3 点分别来说说最佳实践：

# 前端构建
```
coolie build -d webroot-dev
```

在 `webroot-dev`目录执行前端构建。


# 上传静态资源
```
alioss upload
7niu upload
```

使用[阿里云云储存](https://www.npmjs.com/package/alioss)或者[七牛云储存](https://www.npmjs.com/package/7niu)都有直接的命令行支持。



# 上传代码
```
git push origin
```


# npm script
将 3 个步骤写成一个 npm script，就可以直接调用了
```
"script": {
    "release": "coolie build -d webroot-dev && 7niu upload && git add webroot-pro && git commit -am 'release' && git push"
}
```

拆分一下就是：
```
coolie build -d webroot-dev &&
7niu upload &&
git add webroot-pro &&
git commit -am 'release' &&
git push
```
