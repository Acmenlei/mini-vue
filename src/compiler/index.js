import Watcher from "../watcher.js";
import generatAST from "./generate.js";

// 组件挂载
export default function mountComponent(vm) {
  vm.template = document.querySelector(vm.$el);
  // 每次都去重新生成 virtual DOM
  let mount = () => {
    let VNode = generatAST(vm.template, vm);
    vm.update(VNode);
  }
  new Watcher(mount)
}