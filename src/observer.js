import { isObject, isArray } from "./common.js"
import defineReactive from "./defineReactive.js";
import defineArrReactive from "./protoArgument.js";

export default function Observer(data) {
    if (!isObject(data)) { // 如果他不是对象或者数组 那么直接中止
        return
    }
    if (isArray(data)) {
        // 处理数组响应式
        defineArrReactive(data);
        for (let i = 0; i < data.length; i++) {
            Observer(data[i])
        }
    } else {
        // 处理对象响应式
        Observer.prototype.walk(data);
    }
}

Observer.prototype.walk = function (data) {
    for (let key in data) {
        defineReactive(data, key, data[key]);
    }
}