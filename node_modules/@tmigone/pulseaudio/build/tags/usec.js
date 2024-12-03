"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_USEC_SIZE = 9;
class PAUsec extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_USEC;
    }
    toTagBuffer(value) {
        const buffer = Buffer.allocUnsafe(PA_USEC_SIZE);
        let offset = 0;
        offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_USEC.toString().charCodeAt(0), offset);
        buffer.writeBigUInt64BE(value, offset);
        return buffer;
    }
    fromTagBuffer(buffer) {
        return buffer.readBigUInt64BE(1);
    }
    sanitizeBuffer(buffer) {
        return buffer.subarray(0, PA_USEC_SIZE);
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_USEC.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAUsec;
//# sourceMappingURL=usec.js.map