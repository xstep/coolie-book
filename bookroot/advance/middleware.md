# 什么是 coolie 中间件

如果你用过 [express](http://expressjs.com/) ，那么你对中间件的概念应该有所了解。对于 coolie 的中间件，也是类似原理：

```
src => middleware1 => ... => middlewareN => dest
```

从原始资源`src`到最终资源`dest`，中间经过了 N 个中间件的处理，最终改变了结果。


# 如何使用 coolie 中间件

## 需求
现在有这么一个需求。需要将

```
<img data-original="/path/to/img.png">
```

构建为

```
<img data-original="/res/00000111111.png">
```

形式，其中`00000111111`为原始资源`/path/to/img.png`构建之后的版本号。


## coolie 本身不能实现？
coolie 是一个通用级别的构建工具，只会对标准的 HTML 资源属性进行资源管理，而需求中提到的`data-original`不属于
标准资源属性。

标准的 HTML 资源属性有：

- `img`、`video`、`audio`、`embed`、`source` 的 `src` 属性
- `link` 的 `href` 属性
- `object` 的 `data` 属性
- `source` 的 `srcset` 属性


## 查找中间件
[使用 NPM 查找所需要的中间件](https://www.npmjs.com/search?q=coolie-)。
对应各个模块的描述，查看模块主页信息。


## 下载中间件 
```
npm install -SD coolie-img-data-original
```


## 使用中间件
按照中间件的文档描述的使用方法：
```
coolie.use(require('coolie-img-data-original'));
```

