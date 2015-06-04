`coolie.json`（前端构建配置文件）相对于`coolie-config.js`（前端模块加载器配置文件）来说要复杂的多，
不过不必紧张，可以使用
```
coolie json
```
[自动生成](./webroot/begin/command.md#coolie-json-path)。

**申明**

- 为了便于区分，将构建的源目录称之为“开发目录”，构建之后的目录称之为“生产目录”。
- `src`路径/目录都是相对于开发目录的。
- `dest`路径/目录都是相对于生产目录的。


下面逐一介绍下 coolie.json 配置文件的各个配置项。

# js
JS 文件的构建的相关配置。

## js.src
`array`。coolie.js 的前端模块化入口文件，支持 glob 通配符（下文提到的通配符与此相同），
JS 压缩采用的是 uglify2。

**glob部分语法**
- `*`：匹配任意数量的字符，但不匹配`/`
- `?`：匹配单个字符，但不匹配`/`
- `**`：匹配任意数量的字符，包括`/`，只要它是路径中唯一的一部分
- `{}`：允许使用一个逗号分割的列表或者表达式
- `!`：排除匹配

**进阶阅读**
- [注释的特殊处理](./advance/comments.md)
- [npm: glob](https://www.npmjs.com/package/glob)
- [npm: uglify-js](https://www.npmjs.com/package/uglify-js)


## js.coolie-config.js
`string`。coolie.js 的配置文件（前端模块化加载器配置文件）的路径，因为构建操作需要改写配置文件，所以这个选项是必须的。


# css
CSS 文件的构建的相关配置。

## css.dest
`string`。css 文件的保存目录，相对于生产目录。

## css.minify
`object`。css 压缩的一些配置，压缩工具使用的是 clean-css。
保持默认即可。

**进阶阅读**

- [注释的特殊处理](./advance/comments.md)
- [npm: clean-css](https://www.npmjs.com/package/clean-css)


# html
HTML 文件的构建的相关配置。

## html.src
`array`。html 文件的路径，支持通配符。这些 html 文件里的内容会被构建修改。

## html.minify
`boolean`。html 文件是否压缩，为了照顾到各种模板引擎，只删除了回车、注释，如果用了一些逗比的缩进模板引擎，那么需要设置为 false。

**进阶阅读**

- [注释的特殊处理](./advance/comments.md)
- [coolie 标签属性](./advance/attribute-coolie.md)
- [coolieignore 标签属性](./advance/attribute-coolieignore.md)

# resource
## resource.dest
`string`。静态资源（在 HTML 文件里引用到的图片、ico 和在 CSS 文件里引用到的图片、字体等）的保存目录。

# copy
`array`。需要原样复制的文件，支持通配符。

# dest
构建的目录目录，生产目录相关配置。
## dest.dirname
`string`。目标目录，生产目录。
## dest.host
`string`。绑定的网络地址，通常为分布到 CDN 环境的地址，如“http://cdn.domain.com/path/to/”。


{% include "../_include/cnzz.md" %}
