# windows 下使用命令报错

![](https://dn-fed.qbox.me/@/res/20151127155459658441576068 =798x323)

![](https://dn-fed.qbox.me/@/res/20151202162557723506808103 =1103x763)

原因是，在当前执行命令的目录下有`coolie.js`文件，windows 在执行命令时会优先读取当前目录下的
同名文件，如执行`coolie`命令即在当前目录查找`coolie.js`。

解决方案：

- 更换目录
- 或者重命名 `coolie.js`
- 或者删除 `coolie.js`



# coolie 为什么不支持 `scss`、`less`之类的预编译文件
`scss`、`less`都属于预编译文件，只需要专门的编译工具监听文件修改实时编译即可。
而如果 coolie 要支持的话，那么势必要监听文件修改后编译+构建了（事实上，fis、webpack等之类的就是这么做的）。

那么，什么是编译，什么是构建呢？

## 什么是编译
> 利用编译程序从源语言编写的源程序产生目标程序的过程。（来源[百度百科](http://baike.baidu.com/view/69568.htm)）

简而言之，将 A 语言转换成 B 语言的过程，称之为**编译**。

如将`scss`转换为`css`语言，就是属于编译。


## 什么是构建
这个词，在[百度百科](http://baike.baidu.com/view/2067054.htm)上解释的不是很完整。

简而言之，在 A 语言的基础上进行二次修饰为构建，修饰结果还是 A 语言。

如将`coolie.js`压缩成`coolie.min.js`为构建，俗名“压缩”，前后两个文件还是 JS 文件，语言类型没有发生变化。

coolie-cli 是前端构建工具，因此，不具备编译功能。



# coolie#1.x 与 jquery 发生冲突
```
<script src="js/jquery-2.1.1.js"></script>
<script coolie src="./coolie.js" data-config="./coolie-config.js" data-main="main.js"></script>
```

运行时提示：

![](http://s.ydr.me/@/res/20151231112644879662781225 =324x126)

而如果把 jquery 移除掉：

```
<script coolie src="./coolie.js" data-config="./coolie-config.js" data-main="main.js"></script>
```

运行正常：

![](http://s.ydr.me/@/res/20151231112739834617633431 =293x96)

## 解决方案
将 coolie.js 放在最后即可：
```
<script src="js/jquery-2.1.1.js"></script>
<!--coolie 放在最后-->
<script coolie src="./coolie.js" data-config="./coolie-config.js" data-main="main.js"></script>
```

运行正常：

![](http://s.ydr.me/@/res/20151231112739834617633431 =293x96)


## 问题原因
页面上的`script`标签是同步加载的，如上一共有两个`script`，分别是`coolie.js`和`jquery.js`，
`coolie.js`加载运行完成，激活了模块系统（全局注册`define`方法），然后就开始加载各种模块 A、B、C、D，
而此时`jquery.js`也在加载运行完成，与正在加载的 A、B、C、D 发生了冲突，
这也是目前所有模块化解决方案会带来的弊端。

```
coolie.js --> A、B、C、D
              jquery.js
```

如上，A、B、C、D 和 jquery.js 是一同加载运行的，而 jquery 从 1.7 以上就支持模块化了，
所以各自发生了紊乱（路径匹配原则）。

```
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}
```

而将 coolie.js 放在最后就没有这个问题了：
```
jquery.js
            coolie.js --> A、B、C、D
```

如上，jquery.js 运行时，还未激活模块系统（未注册全局`define`方法），
而当 coolie.js 去加载模块时，就不会与已运行的脚本发生冲突。

