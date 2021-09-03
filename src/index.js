import Observer from "./observer.js";
import Compiler from "./compiler.js";
import { isObject } from "./common.js"

export default function Vue(options) {
    if (isObject(options)) {
        this._data = options.data;
        this._el = options.el;
        /* 初始化 */
        // Compiler(options.el, options.data)
        Observer(options.data);
    } else {
        console.warn("参数必须为键值对形式")
    }
}