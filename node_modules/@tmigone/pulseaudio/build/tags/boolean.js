"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_BOOLEAN_SIZE = 1;
class PABoolean extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_BOOLEAN;
    }
    toTagBuffer(value) {
        const boolValue = value ? common_1.PATagType.PA_TAG_BOOLEAN_TRUE : common_1.PATagType.PA_TAG_BOOLEAN_FALSE;
        const buffer = Buffer.allocUnsafe(PA_BOOLEAN_SIZE);
        buffer.writeUInt8(boolValue.toString().charCodeAt(0));
        return buffer;
    }
    fromTagBuffer(buffer) {
        return buffer.readUInt8(0) === common_1.PATagType.PA_TAG_BOOLEAN_TRUE.toString().charCodeAt(0);
    }
    sanitizeBuffer(buffer) {
        return buffer.subarray(0, PA_BOOLEAN_SIZE);
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return [common_1.PATagType.PA_TAG_BOOLEAN, common_1.PATagType.PA_TAG_BOOLEAN_TRUE, common_1.PATagType.PA_TAG_BOOLEAN_FALSE].map(e => e.toString().charCodeAt(0)).includes(tagType);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PABoolean;
//# sourceMappingURL=boolean.js.map