# coolie 词义
coolie 这个单词有点儿意思，中英同音并且同义，义指“苦力”。

现在，coolie 作为前端构建工具，它仍然是苦力（coolie）。
往常需要人为手动做的苦力活、重复活，现在都全部交给 coolie 来做。
因为 coolie 能够做的更好、更精确。





# coolie 组成部分
为了便于区分，将 coolie 分为两部分：

- [前端开发使用的模块加载器](./module-loader.md)，称之为[**coolie.js**](https://github.com/cooliejs/coolie.js)。
- [前端构建使用的构建工具](./front-end-build.md)，称之为[**coolie-cli**](https://github.com/cooliejs/coolie-cli)。





# coolie 简史

## 0.x
萌芽时期，确定了前端构建的痛点：

- 压缩了 JS，如何在 HTML 里替换
- 重命名了 JS，如何在 HTML 里替换
- 如何处理 CSS 里的图片
- 模块合并后，充斥了大量无用的路径标记
- 公共模块如何抽离
- 异步模块如何抽离
- 。。。

便着手开始建立一套无痛切入的前端构建工具，在初期就基本确定了以下原则：

- 最小程度的不影响现有代码的运行
- 不编译，直接运行
- 通用化，可以满足大部分开发场景
- 模块化
- 智能化，无须人工介入即可完成所有工作
- 静态化，拿来即用，不需要频繁修改配置文件


[0.x 详细的版本记录](/version/0.x.md)。



## 1.x
成长时期，在这个阶段，coolie 在企业环境下得到了充分的锤炼，满载美誉。

[1.x 详细的版本记录](/version/1.x.md)。



## 2.x
成熟时期，coolie 已支持了 CommonJS 规范。

[2.x 详细的版本记录](/version/2.x.md)。




