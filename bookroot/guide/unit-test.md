模块化开发之后，非常容易的进行单元测试。但前端单元测试因为需要浏览器支持，
在操作上还是有一定的成本的。不过，目前已经有一套比较通用的做法。

在了解模块化单元测试之前，需要了解以下项目

- 测试驱动器：[karma](https://karma-runner.github.io/)
- 测试断言库：[jasmine](http://jasmine.github.io/)
- 开发可视化：[webstorm](https://www.jetbrains.com/webstorm/)

# coolie-demo11
新建一个 `coolie-demo11` 目录。


# 编写我们的源代码
任务是：写两个模块用于计算圆形和方形的面积、周长。

新建 `src` 目录，用于存放我们的原始模块。

```
.
├── readme.md
└── src
    ├── circle.js
    └── square.js

1 directory, 3 files
```

## `circle.js`
```
/**
 * 计算圆的面积、周长
 * @author ydr.me
 * @create 2016-04-08 23:35
 */


define(function (require, exports, module) {
    /**
     * 圆的面积
     * @param radius {Number} 半径
     * @returns {number}
     */
    exports.getArea = function (radius) {
        return Math.PI * radius * radius;
    };


    /**
     * 圆的周长
     * @param radius {Number} 半径
     * @returns {number}
     */
    exports.getCircumference = function (radius) {
        return 2 * Math.PI * radius;
    };
});
```

## `square.js`
```
/**
 * 计算方形的面积、周长
 * @author ydr.me
 * @create 2016-04-08 23:35
 */


define(function (require, exports, module) {
    /**
     * 方形的面积
     * @param width {Number} 宽
     * @param height {Number} 高
     * @returns {number}
     */
    exports.getArea = function (width, height) {
        return width * height;
    };


    /**
     * 方形的周长
     * @param width {Number} 宽
     * @param height {Number} 高
     * @returns {number}
     */
    exports.getCircumference = function (width, height) {
        return 2 * (width + height);
    };
});
```




