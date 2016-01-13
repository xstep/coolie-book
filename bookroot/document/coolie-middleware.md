**Beta 阶段**

--------------------

# 介绍
coolie-cli 中间件作用于构建工具构建的不同阶段。
中间件必须是一个同步函数，该函数在构建阶段会接受到一个配置参数`options`：

```
function coolieMiddlewareSample (options){
    // ... do
}
```

中间件忽略处理，需要原样返回 options 对象。

```
function coolieMiddlewareSample (options){
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
function coolieMiddlewareSample (options){
    if(options.progress !== 'post-html') {
        return options;
    }
    
    options.code += Date.now();
    return options;
}
```

