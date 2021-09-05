import { isObject } from "./common.js";
import mountComponent from "./compiler/index.js";
import parseAST from "./compiler/parse.js";
import initData from "./initData.js";

export default function Vue(options) {
  if (isObject(options)) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el;
    this.$methods = options.methods;
    initData(this);
  } else {
    console.warn("参数必须为键值对形式");
  }
}

Vue.prototype.$mount = function (vm) {
  mountComponent(vm)
};

Vue.prototype.update = function (ast) {
  const vnode = parseAST(ast, this);
  const rnode = document.querySelector(this.$el);
  rnode.parentNode.replaceChild(vnode, rnode);
}