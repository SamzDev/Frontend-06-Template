## 学习笔记

### 轮播组件应用手势与动画

#### 加入手势

```javascript
/*...省略部分代码*/
import {enableGesture} from "./gesture.js"
export class Carousel extends Component {
  constructor() {/*...省略部分代码*/}
  render() {
    /*...省略部分代码*/
  enableGesture(this.root);
    /*...省略部分代码*/
  this.root.addEventListener("pan", event => {
    	let x = event.clientX - event.startX - ax;
    	let current = this[STATE].position - ((x - x % 500) / 500);
    	for (const offset of [-1, 0, 1]) {
      	let pos = current + offset;
      	pos = (pos % children.length + children.length) % children.length;
      	children[pos].style.transition = "none";
      	children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
    	}
  	})
  }
  /*...省略部分代码*/
}
```

引入`enableGesture`，同时为`this.root`开启手势监听。通过`addEventListener`，为`this.root`添加不同类型的手势事件监听，从而实现，轮播组件手势拖拽。

#### 加入动画

```javascript
/*...省略部分代码*/
import {Timeline, Animation} from "./animation.js"
import {ease} from "./ease.js"

export class Carousel extends Component {
  constructor() {/*...省略部分代码*/}
  render() {
    /*...省略部分代码*/
		let timeline = new Timeline;
    timeline.start();
    
    let t = 0;
    let ax = 0; // 动画产生的位移x
    
    /*...省略部分代码*/
    let nextPicture = () => {
        let children = this.root.children;
        let nextPosition = (this[STATE].position + 1) % children.length;

        let current = children[this[STATE].position];
        let next = children[nextPosition];

        t = Date.now();

        timeline.add(new Animation(current.style, "transform", - this[STATE].position * 500, -500 - this[STATE].position * 500, 500, 0, ease, v => `translateX(${v}px)`));
        timeline.add(new Animation(next.style, "transform", 500 - nextPosition * 500, - nextPosition * 500, 500, 0, ease, v => `translateX(${v}px)`));

        this[STATE].position = nextPosition;
        this.triggerEvent("Change", {position: this[STATE].position});
    }
    handler = setInterval(nextPicture, 3000);
  }
  /*...省略部分代码*/
}
```

引入`Timeline`与`Animation`，`Timeline`负责控制`Animation`的开始、添加、暂停、结束等状态，可通过合手势配合不同动画状态实现，拖拽的时候暂停动画，松手后恢复动画。

通过`t`与`ax`，获取动画的进度，从而让手势事件获得正确的拖拽位置。

### 为组件添加更多属性(完善组件)

#### 1. 组件变量私有化、事件机制处理

```javascript
export const STATE = Symbol("state");
export const ATTRIBUTE = Symbol("attribute");

export class Component {
    constructor(type) {
        this[ATTRIBUTE] = Object.create(null);
        this[STATE] = Object.create(null);
    }
    render() {
        return this.root;
    }
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value;
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        if (!this.root) {
            this.render();
        }
        parent.appendChild(this.root);
    }
    triggerEvent(type, args) {
        this[ATTRIBUTE]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, { detail: args}));
    }
}
```

通过Symbol实现一个State机制，并将`positon`挂在State上，当需要访问`position`时，通过`this[STATE]`这个对象进行访问，达到一个类似于`Protected`的效果。同时，也将`this.attribute`通过Symbol变成`this[ATTRIBUTE]` 实现私有化，以达到类似于`Protected`的效果。

为组件增加`triggerEvent`作为统一的事件机制，使组件内外信息流通，可以实现一些状态或者事件回调。

#### 2. 内容型Children

内容型Children的特点：你放几个Children，实际上DOM就会出现几个Children

Button组件是内容型Children的一个典型代表

以下代码实现一个Button组件

```javascript
import {Component, STATE, ATTRIBUTE, createElement} from "./framework.js"

export {STATE, ATTRIBUTE} from "./framework.js" // 用于其他继承Button的组件使用

export class Button extends Component {
    constructor() {
        super();
    }

    render() {
        this.childContainer = <span />;
        this.root = (<div>{this.childContainer}</div>).render();
        return this.root;
    }

    appendChild(child) {
        if (!this.childContainer) {
            this.render();
        }
        this.childContainer.appendChild(child);
    }
}
```



#### 3. 模板型Children

模板型Children的特点：放在Children里面的其实是一个模板，不是真的Children

List组件是模板型Children的一个典型代表

以下代码实现一个List组件

```javascript
import {Component, STATE, ATTRIBUTE, createElement} from "./framework.js"

export {STATE, ATTRIBUTE} from "./framework.js"// 用于其他继承List的组件使用

export class List extends Component {
    constructor() {
        super();
    }

    render() {
        
        this.children = this[ATTRIBUTE].data.map(this.template);
        this.root = (<div>{this.children}</div>).render();
        return this.root;
    }

    appendChild(child) {
        this.template = (child);
        this.render();
    }
}
```

#### 4. export...from...

参考[export语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)

```javascript
import {Component, STATE, ATTRIBUTE} from "./framework.js"

/*
export...from...相当于import之后再去export
但如果只export，那么export的组件不能在当前组件使用，所以依然需要import一次需要的组件
*/
export {STATE, ATTRIBUTE} from "./framework.js"

export class Carousel extends Component {
    constructor() {
        super();
    }
}
```



#### 本周学习内容

* 将手势和动画应用到轮播组件上
* 为组件添加更多属性

### 参考资料

[export语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)