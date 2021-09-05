import { observer } from "./observer.js";
import proxy from "./proxy.js";

export default function initData(vm) {
  proxy(vm); // 代理
  observer(vm.$data);
  vm.$mount(vm);
}

