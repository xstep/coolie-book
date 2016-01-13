**Beta 阶段**

--------------------

# 介绍
coolie-cli 中间件作用于构建工具构建的不同阶段。
中间件必须是一个同步函数，该函数在构建阶段会接受到一个配置参数`options`：

```
function coolieMiddlewareSample (options) {
    // ... do
}
```

中间件忽略处理，需要原样返回 options 对象。

```
function coolieMiddlewareSample (options) {
    // ignore
    return options;
}
```



# options

## options.progress

构建阶段，目前有值:

- `pre-html`：构建 html 文件之前
- `post-html`：构建 html 文件之后

## options.code

当前的源代码，用于中间件处理。


# sample
给每个 html 文件末尾都加上当前时间戳。

```
function coolieMiddlewareSample (options) {
    if (options.progress !== 'post-html') {
        return options;
    }
    
    options.code += Date.now();
    return options;
}
```


# API
每一个中间件的上下文（`this`）都是当前构建的 coolie 对象：

```
function coolieMiddlewareSample (options) {
    var coolie = this;
    
    // do next
}
```



coolie 对象上包装了以下接口：


## `matchHTML([conditions,] transform)`
匹配 html 并做相应转换（`conditions`、`transform` 语法参考 [posthtml](./posthtml.md) 一节）。

示例，匹配所有 `a` 标签，并加上 `target="_blank"`
```
coolie.matchHTML({
    tag: 'a'
}, function(node) {
    // <a></a>
    if (!node.attrs) {
        return node;
    }
    
    // <a href="#"></a>
    if (!node.attrs.href || node.attrs.href[0] === '#') {
        return node;
    }
    
    node.attrs.target = '_blank';
    return node;
});
```

## `buildCSSPath(url, file[, options])`


## `buildJSPath(url, file[, options])`


## `buildResPath(url, file[, options])`

