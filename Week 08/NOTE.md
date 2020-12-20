## 学习笔记

### 浏览器基础渲染过程

[![rdaxjH.png](https://s3.ax1x.com/2020/12/21/rdaxjH.png)](https://imgchr.com/i/rdaxjH)

### 有限状态机处理字符串

* 每一个状态都是一个机器
  * 所有状态机接受的输入是一致的
  * 每个机器本身没有状态
  * 用函数来表示的话，应该是纯函数(无副作用)
* 每一个机器知道下一个状态
  * 每个机器都确定下一个状态(Moore)
  * 每个机器根据输入决定下一个状态(Mealy)

JavaScript 中，实现状态机的方式：把每个函数当做一个状态，参数是接受的字符，返回值是下一个状态函数。

```javascript
// JS中的Mealy有限状态机
function state(input) { // 函数参数作为输入
  // 处理状态逻辑
  /** State Logic Code*/
  return nextStateFunction;// 返回值为下一个状态，这里以函数实现，所以一般返回状态函数
}
```

### HTTP状态解析

在`HTTP`里，`request`和`response`是一对一的，先有客户端发起`request`，再由服务器端返回`response`

#### Request

```zsh
POST / HTTP/1.1                                ## Request line 记录请求方式，路径，HTTP版本
Host:127.0.0.1                                 ## BEGIN headers 记录域名、内容类型等多种信息
Content-Type:application/x-www-form-urlencoded ## 
                                               ## END headers 以空行为headers结束标志
field1=aaa&code=x%3D1                          ## body 主要信息内容
```

#### Response

```zsh
HTTP/1.1 200 OK                           ## Status line 记录HTTP版本，HTTP状态码，HTTP状态文本
Content-Type:text/html                    ## BEGIN headers 与Request类似
Date:Sun, 20 Dec 2020 12:35:01 GMT        ## 记录内容类型、日期等多种信息
Connection:keep-alive                     ## 
Transfer-Encoding:chunked                 ## 
                                          ## END headers 以空行为headers结束标志
26                                        ## BEGIN body chunked类型body，十六进制数字独占一行开头
<html><body> Hello World</body></html>    ##  
0                                         ## END body 0为结束标志
```

### 本周学习内容

* 浏览器总论
* 状态机处理字符串
  * 不使用状态机处理字符串
  * 使用状态机(通过函数实现)处理字符串
* HTTP请求与状态解析，从服务端到客户端



### 参考资料

[浏览器：一个浏览器是如何工作的？（阶段一）](https://time.geekbang.org/column/article/80240)

[浏览器：一个浏览器是如何工作的？（阶段二）](https://time.geekbang.org/column/article/80260)