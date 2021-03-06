## 学习笔记

### 基本概念

#### 排版

`Layout`，一般翻译成排版或者布局，课程里统一翻译作排版，是指，浏览器将内容(文字、图片、图形、表格等等)确定位置的过程。

#### 渲染

`Render`，课程里翻译作渲染，是指它在图形学上的意义，将模型变成位图的过程

#### 合成

`Compositing`，课程里翻译作合成，是指将子元素渲染到位图上面的过程，不过`toy-browser`里暂未实现该功能

#### 绘制

绘制是指将位图绘制到屏幕上，变成肉眼可见的图像的过程，而这个只需要浏览器将要显示的位图交给操作系统即可。本周学习任务中，利用`images`模块，将要显示的位图保存成图片，因为`nodejs`没有图形环境。

### 排版流程

* 预处理，处理`flexDirection`和`wrap`相关属性，将`width`、`height`、`left`、`right`、`top`、`bottom`等属性抽象成`main`、`cross`的相关属性
* 分行
  * 根据主轴尺寸，把元素分进行(háng)
  * 若设置了`no-wrap`，则强行分配进第一行
* 计算主轴方向
  * 找出所有`Flex`元素
  * 把主轴方向的剩余尺寸按比例分配给这些元素
  * 若剩余空间为负数，所有`flex`元素为0，等比压缩剩余元素
* 计算交叉轴方向
  * 根据每一行中最大元素尺寸计算行高
  * 根据行高`flex-align`和`item-align`，确定元素具体位置

### 渲染步骤

* 准备工作
  * 准备图形环境，`npm install images`
  * 在`viewpoint`上进行绘制
  * 绘制相关属性
    * `background-color`
    * `background-image`
    * `border`

* 绘制
  * 递归调用子元素的绘制方法完成DOM树的绘制，并忽略一些不需要的节点
  * `toy-browser`项目忽略了部分功能
    * 文字绘制，该功能需要用到字体库
    * 对图层进行`compositing`

#### 本周学习内容

* 排版
* 渲染--绘制

### 参考资料

[浏览器：一个浏览器是如何工作的？（阶段四）](https://time.geekbang.org/column/article/81730)

[浏览器：一个浏览器是如何工作的？（阶段五）](https://time.geekbang.org/column/article/82397)