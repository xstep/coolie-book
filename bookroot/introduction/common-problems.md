# windows 下使用命令报错

![](http://s.ydr.me/@/res/20151127155459658441576068 =798x323)

原因是，在当前执行命令的目录下有`coolie.js`文件，windows 在执行命令时会优先读取当前目录下的
同名文件，如执行`coolie`命令即在当前目录查找`coolie.js`。

解决方案：

- 更换目录
- 或者重命名 `coolie.js`
- 或者删除 `coolie.js`



