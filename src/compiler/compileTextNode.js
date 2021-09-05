import Watcher from "../watcher.js"

/* Vue模板字符串替换data数据 */
function replaceVueGrammar(target, data) {
    let index = 0, origin = data, curr = null;
    while ( curr = target[index] ) {
        origin = origin[curr];
        index++;
    }
    return origin;
}

export default function compileTextNode(node, vm) {
    let prop = RegExp.$1.trim().split(".");
    /* 更新UI界面的勾子函数 一旦发生改变 将会调用watcher的update方法 */
    function cb() {
        let value = replaceVueGrammar(prop, vm);
        node.textContent = typeof value === "object" ? JSON.stringify(value) : String(value)
    }
    // 实例化watcher 将当前更新watcher存入当前key的dep
    new Watcher(cb)
}