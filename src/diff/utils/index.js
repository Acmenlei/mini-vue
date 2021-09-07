import getPatches from "../patches.js"
export default {
    isString(node) {
        return typeof node === "string";
    },
    diffAttrs(newProps, oldProps) {
        let patches = {} // 补丁对象
        // 如果新属性中没有这个属性那么就不添加
        for (let key in oldProps) {
            if(newProps.hasOwnProperty(key)) {
                if(oldProps[key] !== newProps[key]) {
                    patches[key] = newProps[key];
                }
            } else {
                patches[key] = ""
            }
        }
        for (let key in newProps) {
            // 如果旧属性中不存在新属性中的key 那么就是新增
            if(!oldProps.hasOwnProperty(key)) {
                patches[key] = newProps[key];
            }
        }
        return patches;
    },
    child(oldChildren, newChildren, index, globalPatches) {
        oldChildren.forEach((c, idx) => {
            getPatches(c, newChildren[idx], index, globalPatches)
        });
    }
}