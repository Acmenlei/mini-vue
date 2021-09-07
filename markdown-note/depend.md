#### 1. defineReactive

定义响应式数据，首先是对象的依赖收集，其次是数组的依赖收集

##### 1.2. 对象依赖收集

1. 模板编译

```js
// 首先在挂载更新处出初始化我们的全局更新Watcher
export default function mountComponent(vm) {
    vm.template = document.querySelector(vm.$el);
    let mount = () => {
        let ast = generatAST(vm.template, vm);
        vm.update( ast );
    }
    new Watcher(mount) // 此处会将全局的Dep.target 赋值为当前生成的watcher
}
```

2. 触发依赖收集

在编译模板的时候 我们会将`{{xxx}}`语法编译为`data`中对应的真实数据，那么，我们已经对data中的数据做了拦截，编译的时候必然会触发get拦截，那么我们是不是就可以再get中去做依赖收集？

```js
export default function defineReactive(target, key, value) {
    const childOb = observer(value); // 递归响应式
    const dep = new Dep();
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            if (Dep.target) { // 我们通过调用mountComponent已经将Dep.target赋值为了当前的全局渲染Watcher 那么此处肯定是有值的
                dep.depend(); // 将依赖key的所有watcher全部都收集起来
                if(childOb) {
                    childOb.dep.depend()
                }
            }
            return value;
        },
        set(newVal) {
            if (value === newVal) return;
            value = newVal;
             // 当key发生改变 通知上面收集的watcher去更新 
            dep.notify();
            observer(newVal);
        },
    });
}
```

##### 1.3. 数组依赖收集和更新

数组是没有Obeject.defineProperty的， 我们通过重写对应数组上的原型来进行数组的拦截更新

```js
// 将对应的数据包装为响应式数据
export default function Observer(data) {
  Object.defineProperty(data, "__ob__", {
    value: this, // 保存为当前observer实例
    enumerable: false,
    writable: true,
    configurable: true,
  });
  data.__ob__.dep = new Dep(); // 在Observer实例上挂载一个dep实例 用于数组的依赖收集以及派发更新

  if (isArray(data)) {
    // 处理数组响应式
    defineArrReactive(data);
    this.observeArray(data);
  } else {
    // 处理对象响应式
    this.walk(data);
  }
}
```

同时在每个key对应的value上添加一个__ob__属性，在ob上挂载`dep`，让数组可以进行依赖更新通知

```js
/* 数组响应式 */
const ORIGIN_PROTO = Array.prototype;
const ARRAY_PROTO = Object.create(ORIGIN_PROTO);
const METHODS = [
    "push",
    "splice",
    "unshift",
    "shift",
    "find",
    "every",
    "pop",
    "slice",
    "some",
    "reverse",
];
METHODS.forEach((method) => {
    Object.defineProperty(ARRAY_PROTO, method, {
        value: function (...args) {
            const ret = ORIGIN_PROTO[method].apply(this, args);
            let inserted, ob = this.__ob__; // ob为observer实例
            switch (method) {
                case "push":
                case "unshift":
                    inserted = args;
                    break;
                case "splice":
                    inserted = args.slice(2);
                    break;
            }
            // 监视新添加后的值
            if (inserted) ob.observeArray(inserted); 
            ob.dep.notify(); // 通知更新
            return ret;
        },
        enumerable: false,
        writable: true,
        configurable: true,
    });
});
export default function defineArrReactive(data) {
    data.__proto__ = ARRAY_PROTO;
}
```

