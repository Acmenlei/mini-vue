// 存储渲染watcher
const targetStack = []

let uid = 0;
export default function Dep() {
    this.watchers = []
}

Dep.target = null;

Dep.prototype.depend = function () {
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

export function pushTarget(target) {
    Dep.target = target;
    targetStack.push(target);
}

export function popTarget() {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1];
}