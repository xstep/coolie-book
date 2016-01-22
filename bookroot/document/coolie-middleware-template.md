```
var dato = require('ydr-utils').dato;

var pkg = require('./package.json');

var defaults = {
    // 默认配置
};


// 中间件出口是一个函数，参数是中间件配置
module.exports = function (configs) {
    configs = dato.extend({}, defaults, configs);

    var coolieMiddlewareTemplate = function (options) {
        // 中间件做的事情
        // ...
        
        return options;
    };

    // 中间件方法需要返回 `package` 对象
    coolieMiddlewareTemplate.package = pkg;

    // 中间件出口执行返回一个中间件方法
    return coolieMiddlewareTemplate;
};

// 需要返回中间件默认配置
module.exports.defaults = defaults;
```

