import Watcher from "../watcher.js";

/**
 * 模板解析
 * @param {HTMLElement} root
 */
export default function Compiler(root, vm) {
  let el = document.querySelector(root);
  /* 将真实dom解析成抽象语法树ast */
  const ast = generatAST(el, vm);
  const vnode = parseAST(ast);
  let mount = () => {
      update(el, vnode)
  }
  new Watcher(mount)
}

function update (rnode, vnode) {
    rnode.parentNode.replaceChild(vnode, rnode);
}

/* Vue模板字符串替换data数据 */
function replaceVueGrammar(target, data) {
  let index = 0,
    origin = data,
    curr = null;
  while ((curr = target[index])) {
    origin = origin[curr];
    index++;
  }
  return typeof origin === 'object' ? JSON.stringify(origin) : String(origin);
}

/* 生成抽象语法树 */
function generatAST(root, vm) {
  let _nodeType = root.nodeType,
    _tagName = root.tagName && root.tagName.toLowerCase(),
    _attributes = []; // 属性
  let tree = {};
  if (_nodeType === 1) {
    // 元素节点
    let attribute = root.attributes;
    for (let prop of attribute) {
      _attributes.push({ name: prop.name, value: prop.value });
    }
    tree = { _nodeType, _tagName, _attributes, children: [] };
    if (root.childNodes.length > 0) {
      let childrens = root.childNodes;
      for (let element of childrens) {
        tree.children.push(generatAST(element, vm));
      }
    }
  } else if (_nodeType === 3) {
    // 文本结点
    const rule = /{{(.+?)}}/;
    let _textContent = root.textContent.replace(rule, function($, $1) {
        let props = $1.trim().split(".");
        return replaceVueGrammar(props, vm);
    })
    tree = { _nodeType, _textContent };
  }
  return tree;
}
// 解析抽象语法树
function parseAST(root) {
    let vnode = null;
    if(root._nodeType === 1) {
        vnode = document.createElement(root._tagName);
        if(root._attributes) {
            let attributes = root._attributes;
            for (let prop of attributes) {
                vnode.setAttribute(prop.name, prop.value);
            }
        }
        if(root.children) {
            let children =  root.children;
            for (let vnodeChild of children) {
                vnode.appendChild(parseAST(vnodeChild));
            }
        }
    } else if(root._nodeType === 3) {
        vnode = document.createTextNode(root._textContent);
    }
    return vnode;
}
