# 介绍
任何一切工具，只要推广给更多的人使用，就难免会有更多私人定制和个性化需求。
coolie-cli 也一直在努力，即使 coolie-cli 就已经是通用级别的构建工具了。


coolie-cli 中间件服务于不同的阶段，如构建 html 之前，构建 html 之后，等等。


# 示例
需要将`<div data-src="image.png"></div>`构建成`<img src="xxxxx.png">`。
这是一个非常个性化的需求了，不属于通用级别，这个时候就可以使用 coolie 中间件来完成。

我们在构建 html 之后，再处理下 html 文件：

```
coolie.use(function (options){  
    // 如果当前构建进度不是在 html 之后，则取消操作
    if( options.progress !== 'post-html' ) {
        return options;
    }
    
    // 找到有 data-src 属性的 div
    coolie.mathHTML(options.code, {
        tag: 'div',
        attrs: {
            'data-src': /.*/
        }
    },function (node){
        // 构建资源模块，返回构建之后的 url
        var url = coolie.buildResPath(node.attrs['data-src'], options.file);
        
        // 修改为 img 标签
        node.tag = 'img';
        
        // 添加 src 属性
        node.attrs.src = url;
        
        // 设置为非闭合标签
        node.closed = false;
        
        // 取消 data-src 属性
        node.attrs['data-src'] = false;
        
        // 返回节点信息
        return node;
    });
});
```


# 官方中间件
- [coolie-html-attr-resource](/middleware/coolie-html-attr-resource.md)
- [coolie-html-embed-php](/middleware/coolie-html-embed-php.md)
- [coolie-html-tag-template](/middleware/coolie-html-tag-template.md)



# 文档
- [coolie 中间件文档](/document/coolie-middleware.md)
- [coolie 中间件模板](/document/coolie-middleware-template.md)


