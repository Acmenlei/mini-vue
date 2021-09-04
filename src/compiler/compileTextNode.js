import Watcher from "../watcher.js"

export default function compileTextNode(node, vm) {
    let prop = RegExp.$1.trim()
    function cb() {
        let value = vm[prop];
        node.textContent = typeof value === "object" ? JSON.stringify(value) : String(value)
    }
    // 实例化watcher
    new Watcher(cb) // 文本将当前更新watcher存入当前key的dep
}