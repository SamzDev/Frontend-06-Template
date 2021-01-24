## 学习笔记

### HTML 语法 

![](https://static001.geekbang.org/resource/image/b6/bc/b6fdf08dbe47c837e274ff1bb6f630bc.jpg)

SGML是一种古老的标记语言，而HTML是SGML的子集，所以HTML遵循SGML的基本语法。

##### 标签语法

* 开始标签：<tagname>
  * 带属性的开始标签： <tagname attributename="attributevalue">
* 结束标签：</tagname>
* 自闭合标签：<tagname />

HTML还有很多语义化的标签，可以参考[HTML 语义：如何运用语义类标签来呈现 Wiki 网页？](https://time.geekbang.org/column/article/78168)

##### 文本语法

* 普通文本
* CDATA文件节点
  * 在 CDATA 节点内，不需要考虑多数的转义情况

##### DTD（Document Type Defination）

DTD，全称`Document Type Defination`(文档类型定义)，SGML 通过DTD来定义每一种文档类型。在HTML4.01时代，有三种DTD，分别是严格模式、过渡模式、frameset模式。而到了HTML5时代，就放弃了这些复杂有没有多大实际作用的DTD，采用一个简单的DTD，`<!DOCTYPE html>`

##### Extensible HTML version 1.0 Strict DTD

这是与HTML4相同，符合SGML规范的DTD

* http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
* http://www.w3.org/TR/xhtml1/DTD/xhtml-lat1.ent
* http://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent
* http://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent

### 浏览器API

#### DOM API

DOM是对HTML所描述的文档的一个抽象

DOM API 大致分为四部分:

* 节点：DOM树形结构中的节点相关API
* 事件：触发和监听事件相关API
* Range：操作文字范围相关API
* 遍历：遍历DOM需要的API

##### 节点

![](https://static001.geekbang.org/resource/image/6e/f6/6e278e450d8cc7122da3616fd18b9cf6.png)

Node 是DOM树继承关系的根节点，它定义了DOM节点在DOM树上的操作。上图展示了各种子节点，`Element`分成`HTMLElement`和其他(SVGElement、MathMLElement等)，所以平时常用的元素其实是`HTMLElement`是一部分`Element`。

###### 节点里的导航类操作

```html
<!-- Node -->
• parentNode 
• childNodes 
• firstChild
• lastChild
• nextSibling
• previousSibling
<!-- Element -->
• parentElement
• children
• firstElementChild
• lastElementChild
• nextElementSibling
• previousElementSibling
```

其中`parentNode`与`parentElement`是相同的。

###### 节点里的修改操作

```html
• appendChild 
• insertBefore 
• removeChild 
• replaceChild
```

###### 节点里的高级操作

```html
• compareDocumentPosition: 是一个用于比较两个节点中关系的函数。
• contains: 检查一个节点是否包含另一个节点的函数
• isEqualNode: 检查两个节点是否完全相同。
• isSameNode: 检查两个节点是否是同一个节点，实际上在JavaScript中可以用“===”代替，有可能用于处理不同语言的对象比较。
• cloneNode: 复制一个节点，如果传入参数 true，则会连同子元素 做深拷贝。
```

##### 事件

这个API相对简单，可以参考[EventTarget.addEventListener(MDN)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

##### RangeAPI

这API可以对元素进行更细致的操作，而且性能高效。可以说是对DOM树操作的万能API、

```html
• range.setStartBefore 
• range.setEndBefore 
• range.setStartAfter
• range.setEndAfter
• range.selectNode
• range.selectNodeContents
```

##### 遍历API

在DOM API 中，提供了 `NodeIterator` 和 `TreeWalker` 用来遍历DOM树。相比直接用属性来遍历，`NodeIterator` 和 `TreeWalker` 提供了过滤功能，而且还可以把属性节点也包含在遍历之内。

#### CSSOM 

对CSS文档的一个抽象就是CSSOM，CSS 的一切API也是需要通过`document.styleSheets`去访问的。`window.getComputedStyle(element, pseudoElement);`是一个重要的的API，既可以获取计算后的元素属性，还可以获取伪元素的一些属性。

CSSOM View部分的API

```html
<!-- Window -->
• window.innerHeight, window.innerWidth
• window.devicePixelRatio
• window.screen
• scrollX 
• scrollY
• scroll(x, y)
• scrollBy(x, y)

<!-- Scroll -->
• scrollTop
• scrollLeft
• scrollWidth
• scrollHeight
• scroll(x, y)
• scrollBy(x, y)
• scrollIntoView()

<!-- Layout -->
• getClientRects()
• getBoundingClientRect()
```



#### 本周学习内容

* 重学HTML
  * HTML的定义：XML与SGML
  * HTML标签语法
  * HTML语法
* 浏览器API
  * DOM API
  * 事件API
  * Range API
  * CSSOM 与CSSOM View
  * 其他API

### 参考资料

[HTML 语义：div 和 span 不是够用了吗？](https://time.geekbang.org/column/article/78158)

[HTML 语义：如何运用语义类标签来呈现 Wiki 网页？](https://time.geekbang.org/column/article/78168)

[HTML 元信息类标签：你知道 head 里一共能写哪几种标签吗？](https://time.geekbang.org/column/article/82711)

[HTML 链接：除了 a 标签，还有哪些标签叫链接？](https://time.geekbang.org/column/article/85341)

[HTML 替换型元素：为什么 link 一个 CSS 要用 href，而引入 js 要用 src 呢？](https://time.geekbang.org/column/article/89491)

[HTML 语言：DTD 到底是什么？](https://time.geekbang.org/column/article/92227)

[HTML·ARIA：可访问性是只给盲人用的特性么？](https://time.geekbang.org/column/article/93777)

[浏览器 DOM：你知道 HTML 的节点有哪几种吗？](https://time.geekbang.org/column/article/85031)

[浏览器 CSSOM：如何获取一个元素的准确位置](https://time.geekbang.org/column/article/86117)

[浏览器事件：为什么会有捕获过程和冒泡过程？](https://time.geekbang.org/column/article/90485)