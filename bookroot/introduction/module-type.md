除了默认的 javascript 模块，还有 css、html 以及资源模块。
coolie.js 默认就支持`js`、`html`、`css`、`file`、`text`和`json`六中模块类型。
并且支持模块类型出口定义，如`html`模块出口为一个 url，或者一个`image`模块出口为 base64。

使用方法：
```
require(modulePath[, modulePipeline]);
```

- `modulePath`：模块路径，即模块的相对路径，相对于当前（宿主）模块
- `modulePipeline`：模块管道，模块的入口类型和模块的出口类型（如`image|base64`，即入口模块是图片，出口转换为 base64 编码），
默认的入口、出口类型都为 js

默认的模块类型出口为：

- js：js
- css：text
- text：text
- html：text
- file：url
- json：js

示例：

```
require('some.js');
require.async('some.js');

require('some.css', 'css');
require('some.css', 'css|url');
require('some.css', 'css|base64');
require('some.css', 'css|text');
require('some.css', 'css|style');

require('some.txt', 'text');
require('some.txt', 'text|url');
require('some.txt', 'text|base64');
require('some.txt', 'text|text');

require('some.html', 'html');
require('some.html', 'html|url');
require('some.html', 'html|base64');
require('some.html', 'html|text');

require('some.jpg', 'file');
require('some.jpg', 'file|url');
require('some.jpg', 'file|base64');

require('some.json', 'json');
require('some.json', 'json|url');
require('some.json', 'json|base64');
require('some.json', 'json|text');
```


`require.async`为异步模块，[详细点这里](./async-module.md)

