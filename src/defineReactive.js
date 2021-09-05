import { observer } from "./observer.js";
import Dep from "./dep.js";

export default function defineReactive(target, key, value) {
  const childOb = observer(value); // 递归响应式
  const dep = new Dep();
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) { // 判断watcher是否已创建 
        dep.depend();
        if(childOb) {
            childOb.dep.depend()
        }
      }
      return value;
    },
    set(newVal) {
      if (value === newVal) return;
      value = newVal;
      dep.notify();
      observer(newVal);
    },
  });
}
