## 学习笔记

#### 字典树（Trie）

字典树，又叫Trie树，一种树形数据结构，专门处理字符串匹配，用来解决从字符串集合中快速查找某个字符串这类问题。

通过将字符串集合里重复的公共前缀合并在一起，详细图文可查看https://zh.wikipedia.org/wiki/Trie 或者 [35 | Trie树：如何实现搜索引擎的搜索关键词提示功能？](https://time.geekbang.org/column/article/72414)

#### KMP

KMP是一个字符串的模式匹配算法，从一个字符串里查找另一个字符串。KMP算法就是利用已经匹配的信息确定下一次匹配的起始位置，减少重复检查已匹配的字符，从而提高效率。

#### Wildcard

Wildcard，是加上通配符的字符串匹配，该情况比较复杂，`*` 表示匹配任意数量的任意字符 `?`表示匹配任意字符。课里老师将其逐段转换成`exec`去处理正则表达式。

### 本周学习内容

* 字符串分析算法总论
  * 字典树
  * KMP
  * Wildcard
  * 正则
  * 状态机
  * LL LR
* 字符串分析算法--字典树
* KMP字符串模式匹配算法
* 字符串分析算法--Wildcard



### 参考资料

[32 | 字符串匹配基础（上）：如何借助哈希算法实现高效字符串匹配？](https://time.geekbang.org/column/article/71187)

[33 | 字符串匹配基础（中）：如何实现文本编辑器中的查找功能？](https://time.geekbang.org/column/article/71525)

[34 | 字符串匹配基础（下）：如何借助BM算法轻松理解KMP算法？](https://time.geekbang.org/column/article/71845)

[35 | Trie树：如何实现搜索引擎的搜索关键词提示功能？](https://time.geekbang.org/column/article/72414)

[字符串匹配的KMP算法 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)





