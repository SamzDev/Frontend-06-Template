## 学习笔记

### 组件基础概念与组成

组件，一般认为是跟UI强相关的，某种意义上可以认为它是一种特殊的模块或者是特殊的对象，既是对象又是模块。它可以以树形结构来进行组合以及一定的模板化的配置能力。

组成组件的语义要素

* Properties(与Attribute同时出现，翻译成属性，强调从属关系)
* Methods
* Inherit
* Attribute(与Properties同时出现，翻译成特性，强调描述性)
* Conifg & State
* Event(事件机制，往组件外传递东西)
* Lifecycle(生命周期)
* Children

#### Property 与Attribute

```html
<!-- 操作Attribute -->
<my-component attribute="v"/>
myComponent.getAttribute("a")
myComponent.setAttribute("a","value")
<!-- 操作Property -->
myComponent.a = "value"
<!-- 两者虽然效果一样，但是实际上它们的行为是有区别的 -->
```

```html
<!-- 这里面的style 是字符串 -->
<div class="cls1 cls2" style="color:blue"></div>
<script>
	var div = document.getElementsByTagName('div')[0];
	div.style // 这是一个对象
</script>
```

```html
<a href="//m.taobao.com"></a>
<script>
  var a = document.getElementsByTagName('a')[0];
  a.href // "http://m.taobao.com"，这是URL resolve后的结果
  a.getAttribute('href') // "//m.taobao.com", 与HTML代码一致
</script>
<!-- 在这个例子里，可以看到Property与Attribute 的明显区别 -->
```

```html
<input value = "cute" />
<script>
  var input = document.getElementsByTagName('input')[0];
  //如果property没有设置，则结果是attribute
  input.value // "cute"
  input.getAttribute('value'); // "cute"
  //如果通过property设置value的值，则attribute不变，property变化，而元素上实际的效果是property优先
  input.value = "hello"
  input.value // "hello"
  input.getAttribute('value'); // "cute"
  input.setAttribute('value','world') // 元素上依然显示"hello"
</script>
```

#### Lifecycle

![yVYSjx.png](https://s3.ax1x.com/2021/02/01/yVYSjx.png)


#### Children

* Content型Children
  * 内容有几个Children最终则显示几个Children，是固定数量的。
* Template型Children
  * 作为模板，而Children数量由data数据决定，模板会根据数量复制。



#### 本周学习内容

* 组件的基本知识
* 轮播组件
