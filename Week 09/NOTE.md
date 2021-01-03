## 学习笔记



### HTML解析

* 用有限状态机实现HTML的分析， [HTML标准](https://html.spec.whatwg.org/multipage/)已经规定好了大约有80个HTML状态
* 主要处理的标签：开始标签，结束标签和自封闭标签
* 在状态机中计入业务逻辑，并将组合token
* 属性值有三种写法：单引号、双引号、无引号，需要较多状态进行处理
* 通过栈，将token构建成DOM树
  * 开始标签，创建元素并入栈
  * 结束标签，出栈
  * 自封闭节点相当于入栈后立即出栈
  * 任何元素的父元素是它入栈前的栈顶
  * 多个文本节点需要合并

ps：这里的`token`是指编译原理中的术语，表示最小的有意义单元

### CSS计算

在HTML解析的基础上，进行CSS计算

* 解析遇到`style`标签时，保存CSS规则，同时调用CSS Parser (通过`npm`安装`css`包) 分析CSS规则
* 在创建第一个元素后，立即计算CSS，忽略在`body`里有`style`标签的情况
* 获取当前元素的所有父元素，从内向外匹配选择器
* 选择器的排列从当前元素向外排，复杂选择器拆成单个元素的选择器，通过循环匹配父元素队列
* 根据选择器的类型和元素属性，计算是否与当前元素匹配
* 当完成匹配时，选择器就会应用到元素上，形成computedStyle
* CSS根据`specificity`和后来优先规则来计算专指程度
  * `specificity`是个四元组([0,0,0,0])，越左边权重越高
  * `specificity`计算逻辑：一个CSS规则的`specificity`值由其包含的简单选择器相加而成


### CSS 选择器

![语法结构](https://static001.geekbang.org/resource/image/4f/67/4fa32e5cf47c72a58f7a8211d4e8fc67.png)

![语法结构分析示例](https://static001.geekbang.org/resource/image/8b/7c/8bdd0a249ab1dbf8b854b2decd7eb87c.png)

根据《重学前端》里提到的，从CSS选择器的语法结构可得，选择器通过几种`combinator`链接。`complex-selector`与`compound-selector`还有待后期学习，加以理解。两者好像都可以翻译成复合选择器，但两者又有所区别，`complex-selector`表示的范围比`compound-selector`大。



### 本周学习内容

* HTML解析
* CSS计算

###  参考资料

[浏览器：一个浏览器是如何工作的？（阶段二）](https://time.geekbang.org/column/article/80260)

[浏览器：一个浏览器是如何工作的（阶段三）](https://time.geekbang.org/column/article/80311)

[CSS语法：除了属性和选择器，你还需要知道这些带@的规则](https://time.geekbang.org/column/article/80042)

[HTML  Standard](https://html.spec.whatwg.org/multipage/)

