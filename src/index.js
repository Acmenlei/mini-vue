import Compiler from "./compiler/compiler.js";
import { isObject } from "./common.js";
import compileNode from "./compiler/compileNode.js";
import initData from "./initData.js";

export default function Vue(options) {
  if (isObject(options)) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el;
    initData(this);
  } else {
    console.warn("参数必须为键值对形式");
  }
}

Vue.prototype.$mount = function (vm) {
  let { el } = vm.$options;
  // Compiler(el, vm)
  el = document.querySelector(el);
  compileNode(el.childNodes, vm);
};
