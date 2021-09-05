export function vonClick(node, method, vm) {
    node.addEventListener("click", function() {
        vm["$methods"][method].apply(vm);
    })
}

export function vModel(node, value, vm) {
    node.value = vm[value];
    node.addEventListener("input", function () {
        vm[value] = node.value;
    })
}