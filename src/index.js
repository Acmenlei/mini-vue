import { isObject } from "./common.js";
import mountComponent from "./compiler/index.js";
import parseAST from "./compiler/parse.js";
import initComputed from "./computed/index.js";
import proxy from "./proxy.js"
import initData from "./initData.js"

export default function Vue(options) {
  if (isObject(options)) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el;
    this.$methods = options.methods;
    this.$computed = options.computed;
    this._init(this)
  } else {
    console.warn("参数必须为键值对形式");
  }
}
// 初始化
Vue.prototype._init = function (vm) {
  proxy(vm); // 代理
  initData(vm);
  initComputed(vm);
  vm.$mount(vm);
}
// 挂载
Vue.prototype.$mount = function (vm) {
  mountComponent(vm)
};
// 更新操作
Vue.prototype.update = function (ast) {
  const vnode = parseAST(ast, this);
  const rnode = document.querySelector(this.$el);
  rnode.parentNode.replaceChild(vnode, rnode);
}