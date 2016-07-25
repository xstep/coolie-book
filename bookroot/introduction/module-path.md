# 相对路径

```
require('./path/to/module');
require('../path/to/module');
```


- 使用`./`开头的路径
- 使用`../`开头的路径

这些模块是根据当前模块所在的目录开始查找。



# 非相对路径

```
require('jquery');
require('blear.core.selector');
```

这些模块是 node 模块，则从 `nodeModulesDir` （[模块加载器配置文件](/document/coolie-config.js.md)）根目录查找。

**因此，需要你前端使用的 node_modules 下的模块是平级安装的（npm3 已经支持）。**

