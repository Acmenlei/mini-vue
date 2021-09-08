import Watcher from "../watcher.js";
/**
 * 初始化computed配置项
 */
export default function initComputed(vm) {
    const computed = vm.$computed;
    let watcher = vm._watcher = Object.create(null);
    for (let key in computed) {
        // 给每个属性挂载一个watcher 让所依赖的数据将计算属性收集起来
        // 当所依赖的数据发生变化 即会去notify所有watcher去更新
        // 更新又会进行前后虚拟dom树的diff 产生一个补丁包
        // 最后将这个补丁包打到真实dom上
        watcher[key] = new Watcher(computed[key], {
            layz: true
        }, vm);
        defineComputed(vm, key, watcher);
    }
}
/**
 * 将计算属性的key代理到vue实例上 从而可以通过vue实例进行访问
 */
function defineComputed(vm, key) {
    const description = {
        enumerable: true,
        configurable: true,
        get() {
            const watcher = vm._watcher[key]
            // 当数据为脏数据 重新渲染 执行对应的更新方法
            if (watcher.dirty) {
                watcher.evaluate();
                this.dirty = false
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