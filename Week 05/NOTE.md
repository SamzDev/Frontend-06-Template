## 学习笔记

#### Proxy

Proxy可以为另一个对象创建代理，用该代理可以拦截和重新定义对象的基本操作，例如，赋值、取值、属性查找、枚举等等。Proxy是专门为底层库来设计的一个特性，老师并不建议在业务中大量使用Proxy，应用了Proxy的代码会让预期性变差。

#### 使用Range和CSSOM的综合练习

在监听`maousemove`事件的时候，应该将`maousemove`的事件监听挂载`document`上，而不是挂在`dragable`上，以解决在过快拖动时，出现托断的情况。

通过`for`循环做出一个`range`的表，列出可以插入`dragable`的位置，再通过`insertNode`将`dragable`插入对应的位置。

### 本周学习内容

* Proxy与双向绑定
* 使用Range实现DOM精确操作

### 参考资料

[Proxy - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

