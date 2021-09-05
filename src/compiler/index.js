import Watcher from "../watcher.js";
import generatAST from "./generate.js";

export default function mountComponent(vm) {
  vm.template = document.querySelector(vm.$el);
  let mount = () => {
    let ast = generatAST(vm.template, vm);
    vm.update( ast );
  }
  new Watcher(mount)
}