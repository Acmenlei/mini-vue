import { isArray } from "./common.js";
import { observer } from "./observer.js";

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
      if (inserted) observer(inserted); 
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