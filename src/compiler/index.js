import Watcher from "../watcher.js";
import generatAST from "./generate.js";

// 组件挂载
export default function mountComponent(vm) {
  vm.template = document.querySelector(vm.$el);
  // 每次都去重新计算ast
  let mount = () => {
    let ast = generatAST(vm.template, vm);
    vm.update( ast );
  }
  new Watcher(mount)
}