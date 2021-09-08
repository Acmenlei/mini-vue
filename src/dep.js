// 存储所有的渲染watcher
const targetStack = []

let uid = 0;
export default function Dep() {
    this.watchers = []
}

Dep.target = null;

Dep.prototype.depend = function () {
    // 避免重复的watcher收集
    if(this.watchers.includes(Dep.target)) return;
    Dep.target.uid = uid;
    this.watchers.push(Dep.target);
    uid++;
}

Dep.prototype.notify = function () {
    let {
        watchers
    } = this;
    for (let watcher of watchers) {
        watcher.update()
    }
}
// 添加watcher
export function pushTarget(target) {
    Dep.target = target;
    targetStack.push(target);
}

// 重置watcher
export function popTarget() {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1];
}