"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_U32_SIZE = 5;
class PAU32 extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_U32;
    }
    toTagBuffer(value) {
        const buffer = Buffer.allocUnsafe(PA_U32_SIZE);
        let offset = 0;
        offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_U32.toString().charCodeAt(0), offset);
        buffer.writeUInt32BE(value, offset);
        return buffer;
    }
    fromTagBuffer(buffer) {
        return buffer.readUInt32BE(1);
    }
    sanitizeBuffer(buffer) {
        return buffer.subarray(0, PA_U32_SIZE);
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_U32.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAU32;
//# sourceMappingURL=u32.js.map