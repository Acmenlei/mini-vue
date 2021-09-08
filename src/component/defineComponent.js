import { isData } from "../common.js";
import Vue from "../index.js";
/**
 * 全局注册定义组件
 * @param {String} compName 
 * @param {Object} compConfig 
 * @returns 
 */
export default function defineComponent (compName, compConfig) {
    if(!compConfig.template) return console.warn("template is undefined!");
    if(!isData(compConfig.data)) return console.warn("data must be a object!");
    this.$data = compConfig.data;
    this.$computed = compConfig.computed;
    this.$el = compConfig.el;
    this.template = compConfig.template;
    Vue.prototype._init(this); // 初始化当前组件s
    return this;
}