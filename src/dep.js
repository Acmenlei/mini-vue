// 存储渲染watcher
const targetStack = []

export default function Dep() {
    this.watchers = []
}

Dep.target = null;

Dep.prototype.depend = function () {
    this.watchers.push(Dep.target);
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