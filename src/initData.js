import { observer } from "./observer.js";

export default function initData(vm) {
  proxy(vm);
  observer(vm.$data);
  vm.$mount(vm);
}

function proxy(vm) {
  let data = vm.$data;
  for (let prop in data) {
    proxyReactive(vm, "$data", prop);
  }
}

function proxyReactive(vm, originProp, prop) {
  Object.defineProperty(vm, prop, {
    enumerable: true,
    configurable: true,
    set(newV) {
      if (newV === vm[originProp][prop]) return;
      vm[originProp][prop] = newV;
    },
    get() {
      return vm[originProp][prop];
    },
  });
}
