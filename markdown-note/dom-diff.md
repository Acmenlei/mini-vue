dom diff

不会跨级对比 一一对应

`dom diff`最后还是要操作`dom`的，只是尽可能的去减少了浏览器的重绘和重排

#### 过程

1. 更新的时候拿到上一次生成的`virtual dom `和 最新生成的`virtual dom`进行比较
2. 两个`virtual dom` 比较之后生成对应的`patches`
3. 将`patches`打到真实`dom`上 完成更新

