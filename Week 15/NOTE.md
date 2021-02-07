## 学习笔记

### JavaScript处理帧的方案

1. `setInterval(() => {}, 16)`，16ms代表60帧，但比较不可控
2. `setTimeout(() => {}, 16)`，16ms代表60帧，这是相对安全的做法
3. `requestAnimationFrame(callback)`，在浏览器执行动画下一帧之前，执行回调函数，它的帧率与浏览器相关。现代浏览器更推荐采用`requestAnimationFrame(callback)`方案

### 事件的捕获与冒泡

* 捕获
  * 将设备(鼠标或触摸屏)的点击坐标转换为具体的元素上的事件的过程，称为捕获过程。
  * 事件流是从根节点传递到具体元素的，这就是所谓的从外向内。
* 冒泡
  * 元素的事件优先响应，然后事件往根节点上传递，就像泡泡那样从下往上冒，称为冒泡。
  * 事件流是从具体元素传递到根节点的，这就是所谓的从内到外。

![Graphical representation of an event dispatched in a DOM tree using the DOM event flow](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)

参考[UI Evenet](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)的图片，会有更清晰的理解

#### 手势识别

![yNhxxJ.png](https://s3.ax1x.com/2021/02/07/yNhxxJ.png)



* `tap`手势(点击)，点一下就松开
* `pan`手势(拖拽)，点击并移动一定距离(本例采用10px距离)后，可以不停移动直到松开点击。
* `press`手势(按压)，点击并持续保持点击一段时间(本例采用0.5s)
* `flick`手势(快速滑动)，在`pan`手势结束状态下，如果速度到达设定值就会识别为`flick`手势

#### 本周学习内容

* 手势与动画
  * 设计时间线
  * 手势识别

### 参考资料

[浏览器事件：为什么会有捕获过程和冒泡过程？](https://time.geekbang.org/column/article/90485)

[UI Evenet](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)