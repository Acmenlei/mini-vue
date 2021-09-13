/**
 * 判断是否为对象
 * @param {Object} data 
 * @returns 
 */
export function isObject(data) {
    return typeof data == "object" && data != null;
}
/**
 * 判断是否为数组
 * @param {Object} data 
 * @returns 
 */
export function isArray(data) {
    return Array.isArray(data);
}
/**
 * 判断是否为data数据格式
 * @param {Object} data 
 * @returns 
 */
export function isData(data) {
    if(typeof data === "function" || typeof data === 'object') {
        return data !== null;
    }
}