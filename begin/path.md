# 入口模块路径关系

无论是模块加载器（coolie.js）还是模块构建工具（coolie.cli），参考路径都是相对路径。
coolie 的路径关系，和 seajs/requireJS 相比来说，要简单很多，简要如下：

- 模块加载器路径，相对于当前页面。
- 模块加载器配置路径，相对于模块加载器。
- 入口模块 base 目录，相对于模块加载器。
- 入口模块，相对于 base 目录。
- 构建目录，默认为当前项目 URL 访问的根目录。

用一行文字来表示：
```
入口模块 => base => 模块配置文件 => 模块加载器
```

# 引用模块的路径关系

模块之间的引用，采用的是相对路径。如：
```
- app.js
- lib.js
```

app.js 和 lib.js 是同级目录下的，那么 app.js 对 lib.js 的引用路径为：
```
require('./lib.js');
```


# 别名与 shim

coolie 不支持任何的别名和 shim。因为：

- 保持模块加载器、模块构建的简单配置。
- 开发环境下，路径长度没关系，反而有了别名会增加识别难度，而直接使用相对路径来标识模块，
对开发也会更加友好，尤其是在 webstorm 里，这个后文会说。
- 生产环境下，再怎么长的路径，都会被构建压缩掉（变成1个字符），所以配置别名没有任何意义。
- 对于 shim 来说，一个脚本手动修改下即可，无非就是添加一个 define，用配置来完成，无疑会增加配置成本和构建难度。
