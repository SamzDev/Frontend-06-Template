

## 学习笔记

### CSS总论

#### 1.  CSS 语法

从CSS 2.1版本的语法为起点，探索CSS。

* https://www.w3.org/TR/CSS21/grammar.html#q25.0 

* https://www.w3.org/TR/css-syntax-3

#### 2. CSS @规则

这是老师整理的CSS @规则，每个规则可以点击链接查阅或者查看[CSS语法：除了属性和选择器，你还需要知道这些带@的规则](https://time.geekbang.org/column/article/80042)，都有介绍

* @charset ： https://www.w3.org/TR/css-syntax-3/
* @import ：https://www.w3.org/TR/css-cascade-4/
* @media ：https://www.w3.org/TR/css3-conditional/
* @page ： https://www.w3.org/TR/css-page-3/
* @counter-style ：https://www.w3.org/TR/css-counter-styles-3
* @key-frames ：https://www.w3.org/TR/css-animations-1/
* @font-face ：https://www.w3.org/TR/css-fonts-3/
* @supports ：https://www.w3.org/TR/css3-conditional/
* @namespace ：https://www.w3.org/TR/css-namespaces-3/

还有三个@规则，不加入到上述@规则表里
`@document`(该功能还在实验阶段)
`@color-profile`(已被废弃)
`@font-feature`

#### 3. CSS规则

课程里，将CSS规则，大致拆分成选择器和Key-Value组成的声明列表，而`CSS variables`引入了新Key值，分成Properties(属性)和Variables(变量)

* Selector
  https://www.w3.org/TR/selectors-3/ 
  https://www.w3.org/TR/selectors-4/
* Key
  * Properties
  * Variables: https://www.w3.org/TR/css-variables/
* Value
  https://www.w3.org/TR/css-values-4/

### CSS 选择器

#### 1. 选择器语法

* 简单选择器
  * 通用选择器(Universal selector)，`*`
  * 类型选择器(Type selector)，例如`div`，选择的是元素的`tagName`属性
  * 类选择器(Class selector)，例如`.cls`，如果元素有多个`class`，只要匹配一个就行了
  * ID选择器(ID selector)，例如`#id`
  * 属性选择器(Attribute selector)，例如`[attribute=value]`
  * 伪类，例如`:hover`
  * 伪元素，例如`::before`，一般以双冒号开头，但也可以用单冒号开头，推荐使用双冒号开头
* 复合选择器(Combined)
  * `*`或`div`必须写在最前面，伪类和伪元素一定要写在最后面
  * `<简单选择器><简单选择器><简单选择器>`，简单选择器挨着写就成了复合选择器。选中的元素必须同时匹配几个简单选择器
* 复杂选择器(Complex)
  * `<复合选择器><space><复合选择器>`，子孙选择器/后代选择器(Descendant combinator)
  * `<复合选择器>">"<复合选择器>`，父子选择器/直接子代选择器(Child combinator)
  * `<复合选择器>"~"<复合选择器>`，一般兄弟选择器(General sibling combinator)
  * `<复合选择器>"+"<复合选择器>`，紧邻兄弟选择器(Adjacent sibling combinator)
  * `<复合选择器>"||"<复合选择器>`，列选择器(Column combinator)，表示选择`table`中的某一列
* 选择器列表(Selector list)
  * `<复杂选择器>","<复杂选择器>`
  * 表示两个选择器之间的或关系，任意匹配到其中一个即可

#### 2. 选择器优先级

* 选择器权重从高到低排列
  * ID 选择器
  * 类选择器，属性选择器，伪类
  * 类型选择器，伪元素

#### 3. 伪类

根据[CSS选择器：伪元素是怎么回事儿？](https://time.geekbang.org/column/article/84633)里讲的内容，伪类是很大的一类简单选择器，它是选择器能力的一种补充。日常使用中，尽量通过合理的id和class来表示元素，少用伪类。

* 伪类选择器大致分为四种
  * 树结构关系伪类选择器，例如`:empty`、`:nth-child`、`:nth-last-child`
  * 链接与行为伪类选择器，例如`:link`、`:hover`、`:active`
  * 逻辑伪类选择器，例如`:not`
  * 其它伪类选择器

#### 4. 伪元素

根据[CSS选择器：伪元素是怎么回事儿？](https://time.geekbang.org/column/article/84633)的内容，兼容性达到可用的伪元素，有四种

* `::before`

* `::after`

* `::first-line`

* `::first-letter`

  

#### 本周学习内容

* CSS总论
  * CSS语法的研究
  * CSS @规则的研究
  * CSS规则的结构
  * 收集标准
  * CSS总论总结
* CSS选择器
  * 选择器语法
  * 选择器的优先级
  * 伪类
  * 伪元素

### 参考资料

[CSS语法：除了属性和选择器，你还需要知道这些带@的规则](https://time.geekbang.org/column/article/80042)

[CSS选择器：伪元素是怎么回事儿？](https://time.geekbang.org/column/article/84633)

[CSS 选择器：如何选中svg里的a元素？](https://time.geekbang.org/column/article/84365)

[CSS选择器：伪元素是怎么回事儿？](https://time.geekbang.org/column/article/84633)

[CSS selectors(MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

[Specificity(MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)