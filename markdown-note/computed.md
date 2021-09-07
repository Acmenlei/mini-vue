#### 1. initComputed

在初始化完成data之后进行computed的初始化

- 首先要去拿到Vue配置项中的computed选项

```js
// 初始化computed
export default function initComputed(vm) {
    const computed = vm.$computed;
    let watcher = vm._watcher = Object.create(null);
    for (let key in computed) {
        watcher[key] = new Watcher(computed[key], {
            layz: true
        }, vm);
        defineComputed(vm, key, watcher);
    }
}
```

#### 2. defineComputed

- 将computed中的key代理到Vue实例上，这样就可以通过Vue实例对computed身上的属性进行访问

```js
// 将computed属性代理到vm实例上
function defineComputed(vm, key) {
    const description = {
        enumerable: true,
        configurable: true,
        get() {
            // 拿到对应属性key的watcher 判断当前值是否有缓存 也就是dirty是否为true
            // 如果没有 那么就是第一次计算 或者是所依赖的值发生了改变 需要重新计算
            const watcher = vm._watcher[key]
            // 当数据为脏数据 重新渲染 执行对应的更新方法
            if (watcher.dirty) {
                watcher.evaluate(); // 重新计算对应的值
                this.dirty = false // 缓存数据 将数据设置为干净的
            }
            // 直接取缓存的值
            return watcher.value;
        },
        set() {
            console.warn("can not setter!!!");
        }
    }
    Object.defineProperty(vm, key, description)
}
```

#### 3. Watcher

##### update

- 且每个key对应一个watcher实例，将computed中key所对应的执行函数作为watcher的_cb，当函数中所依赖的数据项发生改变，那么dirty便会变为true

```js
import { popTarget, pushTarget } from "./dep.js";
// options中lazy默认为false 当不是计算属性时 初始化会去收集依赖
// 当为计算属性时 lazy为true 初始化会走evalute函数 执行computed属性中对应的内容
// computed中如果有依赖响应式数据 那么就会触发get拦截 便会将当前的watcher收集到对应响应式数据dep的依赖中
export default function Watcher(cb, options = {}, vm = null) {
    this._cb = cb;
    this.vm = vm;
    this.value = null;
    !options.lazy && this.get();
    this.dirty = true; // 默认为脏数据
}
Watcher.prototype.get = function () {
    pushTarget(this) // 记录当前的watcher
    this.value = this._cb.apply(this.vm);
    popTarget()
}
Watcher.prototype.update = function () {
    Promise.resolve().then(() => this._cb()); // 触发异步更新
    this.dirty = true; // 数据更新了 需要重新计算值
}
// 更新脏数据
Watcher.prototype.evaluate = function () {
    this.get();
    this.dirty = false;
}
```

### 总结

当dirty为false， 取缓存，否则重新计算值
