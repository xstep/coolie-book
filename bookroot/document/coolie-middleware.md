**coolie 中间件目前处于测试阶段。**


# html 中间件
```
src html => middleware1 => ... => middlewareN => dest html
```

每一个 coolie 中间件都会接收到这样的参数。
```
function coolieMiddleware(options){
    // 传入的代码
    options.code += ' <!-- by some middleware -->';

    return options;
}
```

通过对象引用的方式，改变`options`对象的值来实现中间件的传递。

