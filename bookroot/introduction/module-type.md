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

如：
```
require('some.css', 'css|style');

// 标记 some.css 模块为 css 模块
// 但模块的出口是 style，即会被自动插入到 DOM 中
```

默认的模块类型出口为：

- js：js
- css：text
- text：text
- html：text
- file：url
- json：js

示例：

```
// 返回 js 模块
require('some.js');
// 回调返回 js 模块
require.async('some.js', callback);

// 返回 css 文本
require('some.css', 'css');
// 返回 css url
require('some.css', 'css|url');
// 返回 css base64
require('some.css', 'css|base64');
// 返回 css 文本
require('some.css', 'css|text');
// 自动插入样式并返回`style`节点
require('some.css', 'css|style');

// 返回 text 文本
require('some.txt', 'text');
// 返回 text url
require('some.txt', 'text|url');
// 返回 text base64
require('some.txt', 'text|base64');
// 返回 text 文本
require('some.txt', 'text|text');

// 返回 html 文本
require('some.html', 'html');
// 返回 html url
require('some.html', 'html|url');
// 返回 html base64
require('some.html', 'html|base64');
// 返回 html 文本
require('some.html', 'html|text');

// 返回文件 url
require('some.jpg', 'file');
// 返回文件 url
require('some.jpg', 'file|url');
// 返回文件 base64
require('some.jpg', 'file|base64');

// 返回 json 的 js 对象
require('some.json', 'json');
// 返回 json 的 url 格式
require('some.json', 'json|url');
// 返回 json 的 base64 格式
require('some.json', 'json|base64');
// 返回 json 的文本
require('some.json', 'json|text');
```


`require.async`为异步模块，[详细点这里](./async-module.md)

