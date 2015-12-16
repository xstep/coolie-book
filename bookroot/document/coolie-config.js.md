模块加载配置文件`coolie-config.js`，用于配置模块加载器的参数。

# coolie.config>base
配置入口模块的基准路径。

```
coolie.config({
    base: "./path/to/app"
});
```

模块加载器配置非常简单，只有一个配置项。



# coolie.config>debug
默认为`true`，构建后会被重写为`false`。

```
coolie.config({
    debug: true
});
```



# 入口模块配置
同样也可以在 html 里修改模块加载器的配置。
即在 html 里的配置，一个简单的配置示例：

```
<script
coolie
src="coolie.js"
data-config="coolie-config.js"
data-main="main.js"
></script>
```

- `coolie`属性：标记该`script`被 coolie 构建时管理。
- `src`属性：标记模块加载器的路径，相对于当前页面。
- `data-config`属性：标记模块加载器配置文件的路径，相对于模块加载器。
- `data-main`属性：标记当前页面的入口模块，相对于模块加载器配置文件里的`base`路径。

`data-config`的对应关系：
```
coolie-config.js路径 = data-config值 + coolie.js路径
```

`data-main`的对应关系：
```
main = base目录 + data-main值
base = base值 + coolie-config.js路径
main = base值 + coolie-config.js路径 + data-main值
```

最终解释结果为：

- `base`：`./app/`
- `src`：`http://localhost/coolie.js`
- `data-config`：`http://localhost/coolie-config.js`
- `data-main`：`http://localhost/app/main.js`



# `~` 符号
`~`指向的是当前域，即：
```
~ = location.protocol + '//' + location.host
```

因为，模块加载器有可能是放在 CDN 上的，而配置文件和入口模块是当前域的，导致不同域，无法标记路径的相对关系。
这时候，可以使用`~`符号来标记配置文件路径。

```
<script
coolie
src="http://cdn.com/coolie.js"
data-config="~/js/coolie-config.js"
data-main="main.js"
></script>
```

如上：

- `src`属性：标记模块加载器的路径，使用的是远程地址。
- `data-config`属性：标记模块加载器配置文件的路径，使用`~`符号指向当前域。

最终解释结果为：

- `base`：`./app/`
- `src`：`http://cdn.com/coolie.js`
- `data-config`：`http://localhost/coolie-config.js`
- `data-main`：`http://localhost/app/main.js`







