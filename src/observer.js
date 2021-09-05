import { isObject, isArray } from "./common.js";
import defineReactive from "./defineReactive.js";
import Dep from "./dep.js";
import defineArrReactive from "./protoArgument.js";

export function observer(value) {
  if (!isObject(value)) return;
  if (value.__ob__) return value.__ob__;
  return new Observer(value); // 生成实例对象
}

export default function Observer(data) {
  Object.defineProperty(data, "__ob__", {
    value: this, // 保存为当前observer实例
    enumerable: false,
    writable: true,
    configurable: true,
  });
  data.__ob__.dep = new Dep(); // 在Observer实例上挂载一个dep实例 用于数组的依赖收集以及派发更新

  if (isArray(data)) {
    // 处理数组响应式
    defineArrReactive(data);
    this.observeArray(data);
  } else {
    // 处理对象响应式
    this.walk(data);
  }
}

Observer.prototype.walk = function (data) {
  for (let key in data) {
    defineReactive(data, key, data[key]);
  }
};

Observer.prototype.observeArray = function(data) {
    for (let i = 0, l = data.length; i < l; i++) {
        observer(data[i]);
    }
}
