import { observer } from "./observer.js";
import Dep from "./dep.js";
/**
 * 处理对象身上的每个属性 将其包装一层拦截
 * @param {*} target 
 * @param {*} key 
 * @param {*} value 
 */
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
