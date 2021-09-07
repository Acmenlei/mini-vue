import { isObject } from "./common.js";
import mountComponent from "./compiler/index.js";
import parseAST from "./compiler/parse.js";
import initComputed from "./computed/index.js";
import proxy from "./proxy.js"
import initData from "./initData.js"
import diff from "./diff/patches.js";
import doPatches from "./diff/doPatches.js";

export default function Vue(options) {
  if (isObject(options)) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el;
    this.$methods = options.methods;
    this.$computed = options.computed;
    this.$vnode = null; // 每次生成虚拟dom需要跟上一次的虚拟dom进行比对 产生补丁对象
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
  // 每次生成新的虚拟dom树 去 跟老的虚拟dom树进行比较 得到补丁
  // 再将补丁打到真实dom上
  // if(this.$vnode) {
  //   // Dom Diff
  //   let patches = diff(this.$vnode, ast); // 
  //   console.log("补丁", patches);
  //   doPatches(document.querySelector(this.$el), patches); // 真实节点打补丁
  // } else {
    const rNode = parseAST(ast, this);
    const root = document.querySelector(this.$el);
    root.parentNode.replaceChild(rNode, root);
  // }
  // this.$vnode = ast;
  // const root = document.querySelector(this.$el);
  // root.parentNode.replaceChild(rNode, root);
}