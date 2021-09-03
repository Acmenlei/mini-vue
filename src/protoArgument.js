import Observer from "./observer.js";

/* 数组响应式 */
const __proto__ = Object.create(Array.prototype, {})
const __methods__ = ['push', 'splice', 'unshift', 'shift', 'find', 'every', 'pop', 'slice', 'some']

export default function defineArrReactive(data) {
    __methods__.forEach(method => {
        Object.defineProperty(data, method, {
            value: function (...args) {
                Observer(args)
                const ret = __proto__[method].apply(this, args);
                return ret;
            },
            configurable: true,
            enumerable: false,
            writable: true
        })
    });
}