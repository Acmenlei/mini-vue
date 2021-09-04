import { observer } from "./observer.js";
import Dep from "./dep.js";

export default function defineReactive(target, key, value) {
  /*const childNode = */ observer(value); // 递归响应式
  const dep = new Dep();
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
        /* 判断watcher是否已创建 */
      if (Dep.target) {
        dep.depend();
        // if(childNode && childNode.dep) {
        //     childNode.dep.depend()
        // }
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
