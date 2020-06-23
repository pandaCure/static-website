# javascript & typescript & nodejs 模块

## 什么是模块

模块（module）是什么呢？

模块是为了软件封装，复用。当今开源运动盛行，我们可以很方便地使用别人编写好的模块，而不用自己从头开始编写。在程序设计中，我们一直强调避免重复造轮子（Don't Repeat Yourself，DRY）。

想象一下，没有模块的日子，第三库基本都是导出一个全局变量供开发者使用。例如jQuery的$，lodash的_。这些库已经尽量避免了全局变量冲突，只使用几个全局变量。但是还是不能避免有冲突，jQuery还提供了noConflict。更遑论我们自己编写的代码。

最初，Javascript 中是没有模块的概念的。这可能与一开始 Javascript 的定位有关。Javascript 最初只是希望给网页增加动态元素，定位是简单易用的脚本。
但是，随着网页端功能越来越丰富，程序越来越庞大，软件变得越来越难以维护。特别是随着 NodeJs 的兴起，Javascript 语言进入服务端编程领域。在编写大型复杂的程序，模块更是必须品。

## AMD & CMD模块介绍

## Commonjs模块介绍

### 手动实现Commonjs

## ES6模块介绍

## typescript模块介绍

## webpack & babel & typescript在项目中需要注意的

### 在webpack里面怎么使用模块的

### 使用webpack + ts-loader

### 使用webpack + babel-loader

### 使用webpack + ts-loader + babel-loader执行顺序(?来测试)