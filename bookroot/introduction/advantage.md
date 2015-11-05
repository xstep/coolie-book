# 前端工程化解决方案
模块加载器与构建工具双剑合璧，达到前端工程化解决方案的最优解。

- 前端模块加载器（coolie.js）服务于前端页面，与构建结果深度契合，甚至在未来 es6 模块化方案成熟之后，都可以一键切换。
- 前端开发构建工具（coolie cli）服务于构建方面，与模块加载器深度契合，保证通用的构建前提下，又可以通过中间件来扩展构建过程。


# 与后端语言无关
coolie 的前端工程解决方案只与前端有关，与后端语言无关，无论是 JAVA、NodeJS，还是纯静态站点，都是适用的。

当然，如果你的资源是通过后端语言来管理，那 coolie 肯定没法插手。


# 与工程类型无关
coolie 属于通用级别的前端工程化解决方案，与工程类型无关，无论是传统的企业站，还是展示类型的营销站，还是新潮的单页面应用，
还是桌面网站，还是移动网站，还是 webapp，都是可以胜任的。只要你写的代码是 html、js、css。


# 前端模块加载器零配置
前端模块加载器只有一个配置项（只有`base`一项，[详细点这里](/begin/coolie-config.js.md)）。
并且该配置文件可以自动生成（使用`coolie init -j`，[详细点这里](/begin/command.md)）。


# 前端开发构建工具少配置
同样，前端开发构建工具的配置也是非常的少（[详细点这里](/begin/coolie.config.js.md)）。
也同样，该配置文件可以自动生成（使用`coolie init -c`，[详细点这里](/begin/command.md)）。

仅仅需要一点点配置，就可以省去你的大量的 grunt、gulp、webpack 代码。


# 开发 cmd，生产 amd
开发环境（构建之前）下使用最为人性化的 [cmd 规范](/introdution/commonjs-amd-cmd-umd.md)：
```
define(function(require, exports, module){
    require('path/to/some/module')
});
```
生产环境（构建之后）生成性能最优的 [amd 规范](/introdution/commonjs-amd-cmd-umd.md)：
```
define("0",[],function(r){r("1")});
```


# 独一无二的模块路径压缩技术
上一点，构建之后的模块ID和引用ID，都被压缩成单个字符，这是其他模块构建工具无法做到的。

在这种情况下，你的模块路径可以写成任意长度，都可以在构建之后得到压缩。因此也不需要别名这些配置，
既减少了配置，也方便了书写。

![](http://s.ydr.me/@/res/20151106001604514297417252)


# 资源版本管理
coolie 会对标准的资源属性引用的资源进行版本管理，即：

- `img`、`video`、`audio`、`embed`、`source` 的 `src` 属性
- `link` 的 `href` 属性
- `object` 的 `data` 属性
- `source` 的 `srcset` 属性

构建前后对比：
```
<img src="/path/to/img.png">

=>

<img src="http://cdn.org/res/file_md5_version.png">
```

__`file_md5_version`表示文件的 md5 版本号，下同。__


# 资源分组管理
有资源分组管理，就更好的执行 css 模块化了。
```
<!--coolie-->
<link rel="stylesheet" href="normalize.css">
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="text.css">
<link rel="stylesheet" href="button.css">
<!--/coolie-->

=>

<link rel="stylesheet" href="http://cdn.org/res/file_md5_version.css">
```

在书写 css 的时候，只需要按照模块类型分开写 css，然后再页面上按需引用即可。

同样的，js 也是一样的，这里推荐直接使用 cmd 模块化方案。

**智能的 coolie 在处理同样的分组不会再次合并，会将上一次处理结果缓存下来。**


# 支持模块分块构建
默认情况下，一个模块入口会将所有被依赖的模块打包成一个文件。
当我们的工程里大量使用了相同的模块的时候，我们就应该考虑将这些公共模块单独独立出来，
这就是模块分块构建策略（[详细点这里](/begin/coolie.config.js.md)）。


# 支持异步模块构建
有些模块是不需要在页面初始化进行载入的，这些模块只在特定条件才会被使用，
那么这些模块适合写成异步模块，比如单页面应用就非常适合。

![](http://s.ydr.me/@/res/20151106001753116899628868)


# 自由扩展，私人定制
coolie 在 1.x 版本之后已经支持扩展支持了（[使用 coolie 中间件](/advance/middleware.md)）。
通过 coolie 中间件可以完成你的个性化需求，实现私人定制。


# 长期维护，中英社区支持
coolie 定位于通用级的前端工程化解决方案，将会长期发展下去（[coolie 未来规划](/develop/feature.md)）。

coolie 的相关问题、建议、意见可以在中英社区里提出：

- 中文 <http://frontenddev.org/question/>
- 英文 <https://github.com/cloudcome/nodejs-coolie/issues>


# 代码开源，安全保障

- 前端模块加载器 <https://github.com/cloudcome/coolie>
- 前端开发构建工具 <https://github.com/cloudcome/nodejs-coolie>


# 企业产品，质量保障
目前 coolie 相关东西已在企业级产品中得到广泛使用。

- 荡客 <http://www.dangkr.com/>
- 驴管家 <http://www.lv-guanjia.com/>
- FED社区 <http://frontenddev.org/>
- 更多，下一个就是你的企业级产品。


# 鹤立鸡群，傲视天下
目前，开源的工具中，没有任何一款工具与 coolie 相媲美。coolie 所做的事情，虽然普通，但却意义非凡。
在类似功能的产品中，如 grunt、gulp、webpack、postCSS 等，都需要人为去维护各种构建代码，甚至出现这样的代码

```
gulp.src('/path/to/a.js').pipe(uglify).dest('/path/to/a.min.js');
gulp.src('/path/to/b.js').pipe(uglify).dest('/path/to/b.min.js');
gulp.src('some.html').pipe(findAJSAndReplaceToAMinJS).dest('path/some.html');
gulp.src('some.html').pipe(findBJSAndReplaceToBMinJS).dest('path/some.html');
```

这样的代码是非常无意义的（压缩 a.js 和 b.js 然后替换 html 里的引用），因为这样的压缩操作不止一个文件不止一个工程。
在 coolie 面前，只需要一个标记即可：

```
<!--coolie-->
<script src="/path/a.js"></script>
<script src="/path/b.js"></script>
<!--/coolie-->

=>

<script src="/js/file_md5_version.js"></script>
```


# 苦力本色，为己代言

coolie 做的就这些微不足道的事情，在前端工具风行的年代，coolie 依然我行我素，做好的自己的事情。

当我听到一些说今天学这个工具，明天学那个工具；
今天这个工具退出舞台了，明天那个工具退出舞台了；
今天 CMD 规范没什么用了，明天 ES2015 模块化出来了；
今天 react 火起来了，明天 backbone 没落了；
感觉这是一个风风火火的前端世界，其实很浮躁不是吗？

在我的眼中，coolie 正好契合当前的时机，得益于完善的模块化规范，得益于 NodeJS 的诞生，
才让它做的如此冷静。

你要说，coolie 会不会退出历史舞台，那我告诉你，很长一段时间都不会。
因为coolie 是“苦力”，只做前端开发构建（本质是处理 html、js、css 与资源引用）这一件事，
并立志将它做到最好，这是它的本色，也是本事。
只要 html、js、css 还在，那么它就不会日落。

coolie 是我的代表作。

