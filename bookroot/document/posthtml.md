# 介绍

PostHTML is a tool to transform HTML/XML with JS plugins. By <http://theprotein.io> team 


- github <https://github.com/posthtml/posthtml>
- organization <https://github.com/posthtml>


coolie-cli 在 posthtml 的基础上进行了二次封装，使使用更简单，只有以下两个参数


# conditions
匹配条件，类型 `Object`。

## 匹配单个条件
```
{
    tag: 'div',
    attrs: {
        class: 'some'
    }
}
```

## 匹配多个条件
```
[{
    tag: 'div',
    attrs: {
        class: 'some'
    }
}, {
    tag: 'iframe'
}]
```



# transform
节点转换，类型 `Function`。
```
function (node) {
    node.attrs.abc = 'hhe';
    node.attrs.style += 'border: 1px solid red;';
    return node;
}
```

函数必须返回当前节点（`node`）对象。

