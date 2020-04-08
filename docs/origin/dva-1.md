# dva源码总概

> 源码思路：运行一个dva的五个步骤+一个API

## 实例一个dva对象

配置`connected-react-router`相关选项

```js
const history = opts.history || createHashHistory();
const createOpts = {
  initialReducer: {
    router: connectRouter(history),
  },
  setupMiddlewares(middlewares) {
    return [routerMiddleware(history), ...middlewares];
  },
  setupApp(app) {
    app._history = patchHistory(history);
    // app._history = patchHistory(history);
  },
};

const app = create(opts, createOpts);
```

返回一个初始对象

```js
  const { initialReducer, setupApp = noop } = createOpts;
  // 验证 app.create 传入的选项是否符合dva默认定义并使用
  const plugin = new Plugin();
  // 装载到插件中
  plugin.use(filterHooks(hooksAndOpts));

  const app = {
    _models: [prefixNamespace({ ...dvaModel })],
    _store: null,
    _plugin: plugin,
    use: plugin.use.bind(plugin),
    model,
    start,
  };
  return app;
```

## 使用插件（插件系统）

## 注册modal

## 注册路由（组件）

## 挂在react

## dva里面组件懒加载的原理

## redux中间件原理是什么

- 官网所说的发展史

- 什么是柯里化

- 大的dispatch驱动小的dispatch是为什么

- 数据流向示意图

- 真实源码分析

- 如何写一个中间件

- 它为什么会出现在dva里面

- 你真的理解es6 generation？？？

- 真正DVA源码解析

我目前的问题是什么 为什么看源码看不懂 最核心的问题是基础知识差 不理解程序是怎么运行的 