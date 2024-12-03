"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBigInt = exports.JSONParse = exports.JSONStringify = void 0;
function JSONStringify(value) {
    return JSON.stringify(value, (_, v) => typeof v === 'bigint' ? `${v}n` : v);
}
exports.JSONStringify = JSONStringify;
function JSONParse(json) {
    return JSON.parse(json, (_key, value) => {
        if (isBigInt(value)) {
            return BigInt(value.substr(0, value.length - 1));
        }
        return value;
    });
}
exports.JSONParse = JSONParse;
function isBigInt(value) {
    return typeof value === 'string' && /^\d+n$/.test(value);
}
exports.isBigInt = isBigInt;
//# sourceMappingURL=bigInt.js.map