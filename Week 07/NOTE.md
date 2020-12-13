## 学习笔记

### 宏任务(MacroTask)和微任务(MicroTask)

根据老师在《重学前端》里提到的，采纳JSC引擎术语，将宿主发起的任务称为宏观任务(MacroTask)，将JavaScript引擎发起的任务称为微观任务(MicroTask)。`setTimeout`等宿主API会添加宏观任务，而`Promise`会永远在队列尾部添加微观任务。

### 事件循环

Event Loop(事件循环)，本身是来自于node的一个概念，它描述了我们如何去使用`JavaScript`引擎的过程。它有三个部分，第一部分：获取代码，第二部分：执行代码，第三部分：等待(如，一个事件，一段时间，一个锁)。

### 函数调用

函数调用会形成一个栈式的调用关系，是一个`stack`数据结构。而里面每一个`stack`存储的东西称为`Execution Context`(执行上下文)，执行一个语句时所需要的所有信息都保存在这个`Execution Context`里。

### Realm

在JavaScript的标准里，定义了一个叫`Realm`的东西，在一个JavaScript引擎的实例里，它所有的内置对象都会被放进一个`Realm`里面。不同的`Realm`实例之间是完全相互独立的，也可以相互传递对象。



#### 本周学习内容

* JS表达式
  * 运算符和表达式
  * 类型转换
* JS语句
  * 运行时概念
  * 简单语句和复合语句
  * 声明
* JS结构化
  * 宏任务和微任务
  * JS函数调用

### 参考资料

[JavaScript执行（一）：Promise里的代码为什么比setTimeout先执行？](https://time.geekbang.org/column/article/82764)

[JavaScript执行（二）：闭包和执行上下文到底是怎么回事？](https://time.geekbang.org/column/article/83302)

[JavaScript执行（三）：你知道现在有多少种函数吗？](https://time.geekbang.org/column/article/83719)

[ecma262/#sec-code-realms](https://tc39.es/ecma262/#sec-code-realms)