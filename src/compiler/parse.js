import {vonClick, vModel} from "./attributes.js";

// 解析抽象语法树
export default function parseAST(root, vm) {
  let vnode = null;
  if (root._nodeType === 1) {
    vnode = document.createElement(root._tagName);
    if (root._attributes) {
      let attributes = root._attributes;
      for (let prop of attributes) {
        /* 处理click语法糖 */
        if(/@click/.test(prop.name) || /v-on:click/.test(prop.name)) {
            vonClick(vnode, prop.value, vm);
            continue;
        } // 处理vmodel语法 
        else if(/v-model/.test(prop.name)) {
          vModel(vnode, prop.value, vm);
        }
        vnode.setAttribute(prop.name, prop.value);
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
