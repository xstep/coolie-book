# 模块分块


coolie cli 默认会将入口模块及其依赖模块都合并在一个文件里，
如果一些模块几乎被全站使用了，那么就可以考虑独立出来，
而不需将这些公共模块重复加载。例：

```
libs/path1/a.js
libs/path1/b.js
libs/path1/c.js

libs/path2/a.js
libs/path2/b.js
libs/path2/c.js
libs/path2/d.js
```

配置以下规则
```
chunk: [
    // 第 0 个 chunk
    'libs/path1/**',
    // 第 1 个 chunk
    'libs/path2/**'
]
```

假设有这么一个模块：
```
// libs/path1/a.js
define(function(){
    // code...
});

// main.js
define(function(require){
    require('libs/path1/a.js');
});
```

默认构建结果：
```
// file_version_1.js
define('0',['1'],function(r){r('1')});
define('1',[],function(r){});
```

按如上分块规则，构建之后：
```
// file_version_2.js
define('0',['1'],function(r){r('1')});
coolie.chunk(['0']);
```
和
```
// 0.file_version.js
define('1',[],function(r){});
```

其中，`coolie.chunk`表示加载 chunk 模块，其语法为：
```
coolie.chunk(chunkIdArray);
```

因此，`coolie.chunk(['0'])`表示加载 id 为 0 的 chunk 模块，即：
```
chunk: [
    // 第 0 个 chunk
    'libs/path1/**',   // <== 该路径下的模块
    // 第 1 个 chunk
    'libs/path2/**'
]
```



# 模块分块策略
目前，符合分块规则的模块，只有被引用 2 次及以上，才会被单独分块出来。

