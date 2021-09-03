/**
 * 模板解析
 * @param {HTMLElement} root 
 */
export default function Compiler(root, data) {
    Compiler.prototype.$el = document.querySelector(root);
    /* 将真实dom解析成抽象语法树ast */
    const ast = generatAST(Compiler.prototype.$el, data);
    console.log(ast);
}

/* Vue模板字符串替换data数据 */
function replaceVueGrammar(target, data) {
    let index = 0, origin = data, curr = null;
    while ( curr = target[index] ) {
        origin = origin[curr];
        index++;
    }
    return origin;
}

/* 生成抽象语法树 */
function generatAST({ attributes, nodeType, tagName, childNodes, textContent }, data) {
    let root = {
        _nodeType: nodeType,
        _tagName: tagName ? tagName.toLowerCase() : null,
        _attributes: nodeType == 1 ? [] : null,
        _children: nodeType == 1 ? [] : null,
        _textContent: textContent.trim()
    };
    let matchBraces = new RegExp(/\{\{(.+?)\}\}/, "g"); // 匹配Vue语法
    root._textContent = textContent.replace(matchBraces, function($, $1){
        let matchedData = $1.trim().split(".");
        return replaceVueGrammar(matchedData, data);
    });
    if(nodeType === 1) {
        let length = attributes.length;
        for (let i = 0; i < length; i++) {
            root._attributes.push({ name: attributes[i].name, value: attributes[i].nodeValue })
        }
        if( childNodes.length > 0 ) {
            for (let node of childNodes) {
                root._children.push(generatAST(node, root))
            }
        }
    }
    return root;
}