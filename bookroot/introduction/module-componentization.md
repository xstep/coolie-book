在 coolie 的世界里，任何文件都可以作为模块来进行载入，
因此模块化组件非常容易实现。

如 banner 组件：
```
banner
├── index.js
├── style.css <= style.scss
├── image.png
└── template.html
```

模块组件入口是`index.js`，然后自主管理自己的模块，如样式、图片、模板等等。


使用模块组件：
```
var Banner = require('path/to/banner/index.js');

var banner1 = new Banner('#banner1');
var banner2 = new Banner('#banner2');

// ...
```
