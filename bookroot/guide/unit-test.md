模块化开发之后，非常容易的进行单元测试。但前端单元测试因为需要浏览器支持，
在操作上还是有一定的成本的。不过，目前已经有一套比较通用的做法。

在了解模块化单元测试之前，需要了解以下项目

- 测试驱动器：[karma](https://karma-runner.github.io/)
- 测试断言库：[jasmine](http://jasmine.github.io/)
- 开发可视化：[webstorm](https://www.jetbrains.com/webstorm/)
- karma-coolie 适配器：[karma-coolie](https://github.com/cooliejs/karma-coolie)


关于 webstorm 的一些使用技巧文章中有提到 
[《webstorm入门4-karma/jasmine/coverage/coveralls/phantomjs/travis-ci单元测试》](http://frontenddev.org/article/webstorm-primer-4-karma-jasmine-coverage-coveralls-phantomjs-travis-ci-unit-tests.html)。



# 下载
使用 `coolie demo` 命令下载本 demo。
```
➜ coolie demo 11
```



# 编写源代码
新建一个 `coolie-demo11` 目录。

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
```

## `square.js`
```
/**
 * 计算方形的面积、周长
 * @author ydr.me
 * @create 2016-04-08 23:35
 */


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
```

# 安装测试模块
新建一个 `package.json`

```
{
    "name": "coolie-demo11",
    "version": "0.0.1"
}
```

然后安装模块

```
npm install -D karma karma-coverage karma-jasmine karma-chrome-launcher karma-coolie
```

初始化单元测试配置文件 `karma.config.js`。这里直接复制这个文件即可
```
/**
 * karma 测试配置文件
 * @author ydr.me
 * @create 2016-04-20 21:15
 */


'use strict';


module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // 单元测试框架
        frameworks: ['jasmine', 'coolie'],


        client: {},


        // list of files / patterns to load in the browser
        files: [
            {
                // 加载 src 下的原始文件，但不直接引入，使用模块加载器引入
                pattern: './src/**',
                included: false
            },
            {
                // 加载 src 下的原始文件，但不直接引入，使用模块加载器引入
                pattern: './test/**',
                included: false
            },
            {
                // 加载 test 下的入口文件，但不直接引入，使用模块加载器引入
                pattern: './test/main.js',
                included: true
            }
        ],


        // list of files to exclude
        include: [],
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // 原始模块，需要测试覆盖率
            './src/**.js': ['coverage']
        },


        // optionally, configure the reporter
        // 覆盖率报告
        coverageReporter: {
            reporters: [{
                type: 'text-summary'
            }]
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // 报告类型
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,


        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,


        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },


        // plugins
        plugins: ['karma-*']
    });
};
```

这个配置文件基本不需要改动，主要的地方已经用中文注释了。


# 测试入口文件 `test/main.js`
我们需要将所有的 src 模块在这个入口模块里引入并导出。
```
(function (__karma__, coolie) {
    var tests = [];

    for (var file in __karma__.files) {
        if (__karma__.files.hasOwnProperty(file)) {
            if (/\/test\.[^/]*\.js$/i.test(file)) {
                tests.push(file);
            }
        }
    }

    coolie.use(tests);

    coolie.callback(function () {
        __karma__.start.call();
    });
})(window.__karma__, coolie);
```


# 测试文件

## `test/test.circle.js`
```
/**
 * test circle
 * @author ydr.me
 * @create 2016-04-09 00:07
 */


var circle = require('../src/circle');

describe('circle.js', function () {
    // 圆面积
    it('.getArea', function () {
        // 半径为 1 的圆
        expect(circle.getArea(1)).toEqual(Math.PI);
    });

    // 圆周长
    it('.getCircumference', function () {
        // 半径为 1 的圆
        expect(circle.getCircumference(1)).toEqual(2 * Math.PI);
    });
});
```

## `test/test.square.js`
```
/**
 * test square
 * @author ydr.me
 * @create 2016-04-09 00:07
 */


var square = require('../src/square');

describe('square.js', function () {
    // 方形面积
    it('.getArea', function () {
        // 边长为 1 的正方形
        expect(square.getArea(1, 1)).toEqual(1);
    });

    //// 方形周长
    //it('.getCircumference', function () {
    //    // 边长为 1 的正方形
    //    expect(square.getCircumference(1, 1)).toEqual(4);
    //});
});
```


# 单元测试

## webstorm 配置
![](https://dn-fed.qbox.me/@/res/20160409002122450952799356)

- 1：选择单元测试框架 karma
- 2：填写名称“unit test”或者其他
- 3：在下拉框里选择 `karma.config.js`

保存之后就可以玩了。

![](https://dn-fed.qbox.me/@/res/20160409002449989491933608)

从左到右：

- 左：单元测试按钮
- 中：单元测试调试模式按钮
- 右：单元测试覆盖率测试按钮

## 单元测试
点击单元测试按钮。启动之后会在后台自动打开浏览器。测试完成会显示结果。

![](https://dn-fed.qbox.me/@/res/20160410112216962464706696 =718x504)

## 覆盖率测试
上面的`test.square.js`故意漏点一点代码没有被测试，来看看覆盖率是否正确。点击单元测试覆盖率测试按钮，覆盖率测试。

![](https://dn-fed.qbox.me/@/res/20160605130142378880230269 =1260x570)

如上图：
    
- 绿色：已进行覆盖率测试
- 红色：未进行覆盖率测试




# 小结
至此 11 个 demo 已经全部看完了，
覆盖了传统工程（coolie-demo2）、多模块工程（coolie-demo7）、
单页面工程（coolie-demo9）和复合工程（coolie-demo10），
涉及到了前端的方方面面。

愿 coolie 如你所想。


