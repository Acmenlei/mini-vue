import { observer } from "./observer.js";

/* 数组响应式 */
const __proto__ = Object.create(Array.prototype, {})
const __methods__ = ['push', 'splice', 'unshift', 'shift', 'find', 'every', 'pop', 'slice', 'some']
__methods__.forEach( method => {
    Object.defineProperty(__proto__, method, {
        value: function (...args) {
            const ret = Array.prototype[method].apply(this, args);
            let inserted = null
            switch(method) {
                case "push":
                case "unshift":
                    inserted = args;
                    break;
                case "splice": 
                inserted = args.slice(2);
                     break;
            }
            if(inserted) observer(inserted);
            this.__ob__.dep.notify() // 通知更新
            return ret;
        },
        enumerable: false,
        writable: true
    })
});
export default function defineArrReactive(data) {
    data.__proto__ = __proto__;
}