import {
    REPLACE,
    ATTRS,
    TEXT,
    REMOVE
} from "./patcheTypes/index.js"
import diffTools from "./utils/index.js"

/**
 * 将旧的节点和新的节点作比较 生成 diff patches 补丁包
 * @param {Node} oldNode 
 * @param {Node} newNode 
 */
export default function diff(oldNode, newNode) {
    let index = 0, globalPatches = {}; // 全局的index
    getPatches(oldNode, newNode, index, globalPatches);
    return globalPatches;
}

function getPatches(oldNode, newNode, index, globalPatches) {
    let patches = [];
    // 元素不存在的情况 直接删除
    if (!newNode._nodeType) {
        // 元素被删除了
        patches.push({ type: REMOVE, index })
    }
    // 比较文本节点的情况
    else if (newNode._nodeType === 3 && newNode._nodeType === 3) {
        if(newNode._textContent != oldNode._textContent) {
            patches.push({ type: TEXT,  text: newNode._textContent})
        }
    }
    // 比较元素节点
    else if(newNode._tagName && oldNode._tagName && newNode._tagName === oldNode._tagName) {
       //规则1：节点类型相同，比较属性
        let attrs = diffTools.diffAttrs(newNode._attributes, oldNode._attributes);
        if(Object.keys(attrs).length > 0) {
            patches.push({ type: ATTRS, attrs })
        }
      diffTools.child(oldNode.children, newNode.children, index+1, globalPatches);
    }
    // 整个节点都不相等 直接替换掉
    else {
        patches.push({ type: REPLACE, newNode })
    }
    if(patches.length > 0) {
        globalPatches[index] = patches;
    }
}