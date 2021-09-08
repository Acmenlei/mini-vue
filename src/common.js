export function isObject(data) {
    return typeof data == "object" && data != null;
}

export function isArray(data) {
    return Array.isArray(data);
}

export function isData(data) {
    if(typeof data === "function" || typeof data === 'object') {
        return data !== null;
    }
}