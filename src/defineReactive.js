import Observer from "./observer.js";

export default function defineReactive(target, key, value) {
    Observer(value); // 递归响应式
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log("getter获取 收集依赖", key);
            return value;
        },
        set(newVal) {
            if (value === newVal) return;
            console.log("setter更新 通知依赖更新", key);
            Observer(newVal);
            value = newVal;
        }
    })
}