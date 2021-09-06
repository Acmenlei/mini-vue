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
    pushTarget(this)
    this.value = this._cb.apply(this.vm);
    popTarget()
}
Watcher.prototype.update = function () {
    Promise.resolve().then(() => this._cb()); // 触发更新
    this.dirty = true; // 数据更新了 需要重新计算值
}
// 更新脏数据
Watcher.prototype.evaluate = function () {
    this.get();
    this.dirty = false;
}