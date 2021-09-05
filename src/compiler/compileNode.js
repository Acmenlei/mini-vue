import compileTextNode from "./compileTextNode.js";

export default function compileNode(childNodes, vm) {
  for (let node of childNodes) {
    if (node.nodeType === 1) {
      // 元素结点
      compileNode(node.childNodes, vm);
    } else if (node.nodeType === 3 && node.textContent.match(/{{(.+?)}}/)) {
      // 文本结点
      compileTextNode(node, vm);
    }
  }
}
