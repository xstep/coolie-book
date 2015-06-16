HTML 文件的构建需要考虑以下情况：

# 静态资源标签
以下方式引用的静态资源会被构建：
- img 标签的 src 属性
- link 标签的 favicon

不必构建的标签，添加`coolieignore`属性即可，如：
```
<img src="./demo1.png">
<img src="./demo1.png" coolieignore>
```
构建之后
```
<img src="/static/res/xxxxoooo1.png">
<img src="./demo1.png">
```


 
# 外链的脚本、样式
- 外链的脚本：[脚本的合并、压缩、版本管理](./build-js.md)。
- 外链的样式：[样式的合并、压缩、版本管理](./build-css.md)。



# 内联的脚本、样式
内联的脚本，指的是使用`script`标签包裹起来的脚本内容，也同样会被压缩处理。
**除非**，该`script`指定了`coolieignore`属性，或者`type`属性值不是脚本。

js type 值有：

- 空值
- javascript
- text/javascript
- text/ecmascript
- text/ecmascript-6
- text/jsx
- application/javascript
- application/ecmascript

内联的样式，指的是使用`style`标签包裹起来的样式内容，也同样会被压缩处理、版本管理。
```
<script>var abc = '这里的 script 会被构建处理';</script>
<script coolieignore>var abc = '这里的 script 会被构建处理';</script>
```


**除非**，该`style`指定了`coolieignore`属性，或者`type`属性值不是样式。


# 内嵌的样式
内嵌的样式，指的是标签里的`style`属性里的样式内容，也同样会被压缩处理、版本管理。
```
<div style="background: url('./demo.png');"></div>
<div style="background: url('/static/img/demo.png');"></div>
```
构建之后：
```
<div style="background: url('/static/res/xxxxoooo1.png');"></div>
<div style="background: url('/static/res/xxxxoooo2.png');"></div>
```


# 预格式文本
`pre`、`textarea`，以及添加了`coolieignore`或不符合脚本、样式的`script`、`style`标签都会保留原始的文本格式。如：

```
<pre>
预格式文本1
</pre>

<script type="text/plain">
预格式文本2
</script>
```
构建之后，格式不会变化：
```
<pre>
预格式文本1
</pre><script type="text/plain">
预格式文本2
</script>
```


# 注释
并不是所有的注释都会被删除的，具体参考以下几条：
- 非单行注释会被保留
    ```
<!--
换行了
-->
    ```
    构建之后
    ```
<!--换行了-->
    ```
- 开头为`-`的多行注释会被删除
    ```
<!--
- 换行了
-->
    ```
    构建之后
    ```
<空>
    ```
    
    
# 路径关系
在以上的几点分别都提到了：

- style 标签里的资源：相对于当前 html 文件，都会构建绝对路径
- style 属性里的资源：相对于当前 html 文件，都会构建绝对路径
