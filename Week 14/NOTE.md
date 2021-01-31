## 学习笔记

### 组件

组件，一般认为是跟UI强相关的，某种意义上可以认为它是一种特殊的模块或者是特殊的对象，既是对象又是模块。它可以以树形结构来进行组合以及一定的模板化的配置能力。

组件的语义要素

* Properties(与Attribute同时出现，翻译成属性，强调从属关系)
* Methods
* Inherit
* Attribute(与Properties同时出现，翻译成特性，强调描述性)
* Conifg & State
* Event(事件机制，往组件外传递东西)
* Lifecycle(生命周期)
* Children

#### Properties 与Attribute

```html
<!-- 操作Attribute -->
<my-component attribute="v"/>
myComponent.getAttribute("a")
myComponent.setAttribute("a","value")
<!-- 操作Property -->
myComponent.a = "value"
<!-- 两者虽然效果一样，但是实际上它们的行为是有区别的 -->
```



#### Lifecycle

#### Children





#### 本周学习内容

* 组件的基本知识
* 轮播组件

#### 参考资料

[npx 使用教程](https://www.ruanyifeng.com/blog/2019/02/npx.html)