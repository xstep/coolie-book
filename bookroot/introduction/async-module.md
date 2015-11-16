# 异步模块

```
if (isIE8) {
    require.async('compatible-ie8.js');
} else if (isIE6) {
    require.async('compatible-ie6.js');
} else {
    require.async('compatible-es5.js');
}
```

这是很常见的需求。根据不同的情况，加载不同的模块。

coolie 在构建之前会分析所有依赖的异步模块，然后依次标记全局ID。


```
if (isIE8) {
    require.async('1');
} else if (isIE6) {
    require.async('2');
} else {
    require.async('3');
}
```

然后将异步模块和同步模块一起构建。

```
if (a) {
    r.async('1');
} else if (b) {
    r.async('2');
} else {
    r.async('3');
}
```

