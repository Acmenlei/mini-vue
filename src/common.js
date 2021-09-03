export function isObject(data) {
    return typeof data == "object" && data != null;
}

export function isArray(data) {
    return Array.isArray(data);
}