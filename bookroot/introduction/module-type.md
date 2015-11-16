# 模块类型

除了默认的 javascript 模块，还有 css、html 以及资源模块。
coolie.js 默认就支持`js`、`html`、`css`、`image`、`text`和`json`六中模块类型。
并且支持模块类型出口定义，如`html`模块出口为一个 url，或者一个`image`模块出口为 base64。

使用方法：

```
require('some.js');
require.async('some.js');

require('some.css', 'css');
require('some.css', 'css|url');
require('some.css', 'css|base64');
require('some.css', 'css|text');

require('some.txt', 'text');
require('some.txt', 'text|url');
require('some.txt', 'text|base64');
require('some.txt', 'text|text');

require('some.html', 'html');
require('some.html', 'html|url');
require('some.html', 'html|base64');
require('some.html', 'html|text');

require('some.jpg', 'image');
require('some.jpg', 'image|url');
require('some.jpg', 'image|base64');

require('some.json', 'json');
require('some.json', 'json|url');
require('some.json', 'json|base64');
require('some.json', 'json|text');
```


