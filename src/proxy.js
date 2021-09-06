// 进行响应式数据代理
export default function proxy(vm) {
  let data = vm.$data;
  for (let prop in data) {
    proxyReactive(vm, "$data", prop);
  }
}
// 将data中的数据在vue实例上做一层响应式数据的代理 让我们在vue实例上也能获取到data中的数据
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
