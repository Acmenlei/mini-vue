import Watcher from "../watcher.js"
/**
 * 
 * @param {生成的DOM} node 
 * @param {需要调用的函数} method 
 * @param {Vue实例} vm 
 */
export function vonClick(node, method, vm) {
    node.addEventListener("click", function() {
        vm["$methods"][method].apply(vm);
    })
}
/**
 * 
 * @param {生成的DOM} node 
 * @param {对应data中的值} value 
 * @param {Vue实例} vm 
 */
export function vModel(node, value, vm) {
    node.value = vm[value];
    node.addEventListener("input", function () {
        vm[value] = node.value;
    })
}
/**
 * 
 * @param {生成的DOM} node 
 * @param {绑定的属性} prop 
 * @param {属性绑定所对应data中的值} value 
 * @param {Vue实例} vm 
 */
export function vBind(node, prop, value, vm) {
    function cb() {
        let attrs = prop.split(":");
        prop = attrs.length == 1 ? attrs[0] : attrs[1]; // 取:后面的属性
        node.setAttribute(prop, vm[value])
    }
    new Watcher(cb); // 更新操作由watcher去做
}