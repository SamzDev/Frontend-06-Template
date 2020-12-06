## 学习笔记

### 语言分类

按语法分类

* 非形式语言
* 中文，英文
* 形式语言

  * 乔姆斯基谱系

#### 乔姆斯基谱系

这是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：

* 0- 型文法（无限制文法或短语结构文法）包括所有的文法。
* 1- 型文法（上下文相关文法）生成上下文相关语言。
* 2- 型文法（上下文无关文法）生成上下文无关语言。
* 3- 型文法（正规文法）生成正则语言。

### 产生式

在计算机中，Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，[BNF](https://zh.wikipedia.org/wiki/%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F)）的语句，称为产生式。

### [图灵完备性](https://zh.wikipedia.org/wiki/%E5%9C%96%E9%9D%88%E5%AE%8C%E5%82%99%E6%80%A7)

* 命令式 -- [图灵机理论](https://zh.wikipedia.org/wiki/%E5%9B%BE%E7%81%B5%E6%9C%BA)
  * goto
  * if和while
* 声明式 -- lambda演算
  * 递归

### 动态语言与静态语言

* 动态语言

  * 在用户的设备/在线服务器上
  * 产品实际运行时
  * Runtime(运行时)

* 静态语言

  * 在程序员的设备上
  * 产品开发时
  * Compiletime(编译时)

### 类型系统

* 动态类型系统与静态类型系统
  * 动态类型系统在用户设备上保留有类型信息
  * 静态类型系统只在开发过程中保留有类型信息，最终编译成目标代码时，类型信息都被丢掉了
  * Java一类提供了反射机制的，可称为半动态半静态类型系统，编译时丢弃类型信息，运行时通过反射获取类型信息
* 强类型与弱类型
  * 强类型：无隐式转换
  * 弱类型：有隐式转换
* 复合类型
  * 结构体
  * 函数签名
*  [子类型](https://en.wikipedia.org/wiki/Subtyping)
* 泛型
  * [逆变/协变](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html)

### 一般命令式编程语言的设计方式--五层级结构

* Atom(原子级)
* Expression(表达式)
* Statement(语句)
* Structure(结构)
* Program(模块)

### JavaScript 标准里的七种类型

* Number
  * [IEEE 754 Double Float](https://zh.wikipedia.org/wiki/%E9%9B%99%E7%B2%BE%E5%BA%A6%E6%B5%AE%E9%BB%9E%E6%95%B8)
* String
  * Character(字符)
  * Code Point(码点)
  * Encoding(编码)
  * "abc"，'abc'， \`abc\` 三种字符串语法
* Boolean
* Object--Prototype(原型)
  * Identifier(唯一性的标识)
  * State(状态)
  * Behavior(行为)
* Null
  * 表示有值但是是空的
* Undefined
  * 语义上表示根本没有人设过这个值
  * Undefined并非关键字，而是一个全局变量
  * 通过`void 0;`产生Undefined，比较安全
* Symbol



#### String字符集

* ASCII
* Unicode
* UCS
* GB
  * GB2312
  * GBK(GB13000)
  * GB18030
* ISO-8859
* BIG5

### 本周学习内容

* JS语言通识
  * 泛用语言分类
  * 产生式
  * 现代语言的分类
  * 编程语言的性质
  * 一般命令式编程语言的设计方式
* JS类型
  * Number
  * String
  * 对象
  * 其他类型

## 参考资料

[协变与逆变](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html)