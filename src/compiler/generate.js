// Vue模板字符串替换data数据
function replaceVueGrammar(target, data) {
  let index = 0,
    origin = data,
    curr = null;
  while ((curr = target[index])) {
    origin = origin[curr];
    index++;
  }
  return typeof origin === "object" ? JSON.stringify(origin) : String(origin);
}
// 生成抽象语法树
export default function generatAST(root, vm) {
  let _nodeType = root.nodeType,
    _tagName = root.tagName && root.tagName.toLowerCase(),
    _attributes = {}; // 属性
  let tree = {};
  if (_nodeType === 1) {
    // 元素节点
    let attribute = root.attributes;
    for (let prop of attribute) {
      _attributes[prop.name] = prop.value
    }
    tree = {
      _nodeType,
      _tagName,
      _attributes,
      children: []
    };
    if (root.childNodes.length > 0) {
      let childrens = root.childNodes;
      for (let element of childrens) {
        tree.children.push(generatAST(element, vm));
      }
    }
  } else if (_nodeType === 3) {
    // 文本结点
    const rule = /{{(.+?)}}/;
    let _textContent = root.textContent.replace(rule, function ($, $1) {
      let props = $1.trim().split(".");
      return replaceVueGrammar(props, vm);
    });
    tree = {
      _nodeType,
      _textContent
    };
  }
  return tree;
}