# glob 路径

- `*`：多个文件
- `**`：多层级目录
- [更多](https://www.npmjs.com/package/glob)

coolie 前端构建的配置文件以下配置是支持 glob 路径的：

- `js.main`
- `html.src`
- `copy`

这些配置，既可以是 glob 字符串，也可以是 glob 字符串数组。

```
js.main: [
    "/path1/**",
    "/path2/**"
]
```


## 示例1
```
/path/to/*
```
匹配
```
/path/to/1.js
/path/to/2
```
不匹配
```
/path/to/1/1.js
/path/to/1/2
```

## 示例2
```
/path/to/**
```
匹配
```
/path/to/1.js
/path/to/2
```
也匹配
```
/path/to/1/1.js
/path/to/1/2
```

coolie cli 构建配置项是支持 glob 路径的，因此不需要为每一个文件写配置。
造成了项目创建写配置，后期基本不需要变化的现象。



# 资源路径

- 静态路径：使用`http://`、`https://`、`ftp://`、`ftps://`和`//`（自动适应协议）标记的资源。
- 绝对路径：资源相对根目录，使用`/`标记的资源。
- 相对路径：资源相对于当前文件，使用`./`标记和直接文件名的资源。
    
在前端构建的时候，遇到资源路径时，会进行以下处理：

- 静态路径：自动跳过。
- 绝对、相对路径：复制或合并或压缩或合并压缩指定资源到指定目录。

coolie 在处理资源时，会将资源的路径转为绝对路径。

```
<img src="/src/path/to/image1.png"/>
<img src="./path/to/image2.png"/>

=>

<img src="/dest/res/image1.png"/>
<img src="/dest/res/image2.png"/>
```

如果加上目标域`http://cdn.com/`，则：
```
<img src="/src/path/to/image1.png"/>
<img src="./path/to/image2.png"/>

=>

<img src="http://cdn.com/dest/res/image1.png"/>
<img src="http://cdn.com/dest/res/image2.png"/>
```


添加`coolieignore`以忽略资源构建
```
<img src="/src/path/to/image1.png" coolieignore/>
<img src="./path/to/image2.png"/>

=>

<img src="/src/path/to/image1.png"/>
<img src="/dest/res/image2.png"/>
```

