import { observer } from "./observer.js";

export default function initData(vm) {
    observer(vm.$data)
}

