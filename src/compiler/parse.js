import { vonClick, vModel, vBind } from "./attributes.js";
import htmlTags from "./tags.js"
// 解析抽象语法树
export default function parseAST(root, vm) {
  let vnode = null;
  if (root._nodeType === 1) {
    if(!htmlTags.hasOwnProperty(root._tagName)) { // 不存在当前属性的话
      // 那么他就是一个组件
      console.log("组件标签：", root._tagName);
    }
    vnode = document.createElement(root._tagName);
    if (root._attributes) {
      let attributes = root._attributes;
      for (let prop in attributes) {
        /* 处理click语法糖 */
        if(/@click/.test(prop) || /v-on:click/.test(prop)) {
            vonClick(vnode, attributes[prop], vm);
            continue;
        }
        // 处理bind语法
        else if (/^:/.test(prop) || /v-bind/.test(prop)) {
            vBind(vnode, prop, attributes[prop], vm)
            continue;
        }
        // 处理vmodel语法 
        else if(/v-model/.test(prop)) {
          vModel(vnode, attributes[prop], vm);
        }
        vnode.setAttribute(prop, attributes[prop]);
      }
    }
    if (root.children) {
      let children = root.children;
      for (let vnodeChild of children) {
        vnode.appendChild(parseAST(vnodeChild, vm));
      }
    }
  } else if (root._nodeType === 3) {
    vnode = document.createTextNode(root._textContent);
  }
  return vnode;
}
