"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_STRING_BASE_SIZE = 2;
const PA_NULL_STRING_SIZE = 1;
class PAString extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_STRING;
    }
    toTagBuffer(value) {
        let buffer;
        if (value.length === 0) {
            buffer = Buffer.allocUnsafe(1);
            buffer.writeUInt8(common_1.PATagType.PA_TAG_STRING_NULL.toString().charCodeAt(0));
        }
        else {
            buffer = Buffer.allocUnsafe(PA_STRING_BASE_SIZE + value.length);
            let offset = 0;
            offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_STRING.toString().charCodeAt(0), offset);
            offset += buffer.write(value, offset);
            buffer.writeUInt8(0x00, offset);
        }
        return buffer;
    }
    fromTagBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        if (tagType === common_1.PATagType.PA_TAG_STRING_NULL.toString().charCodeAt(0)) {
            return '';
        }
        else {
            return buffer.toString('utf8', 1, buffer.length - 1);
        }
    }
    sanitizeBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        if (tagType === common_1.PATagType.PA_TAG_STRING_NULL.toString().charCodeAt(0)) {
            return buffer.subarray(0, PA_NULL_STRING_SIZE);
        }
        else {
            let offset = 0;
            while (buffer.readUInt8(offset) !== 0x00) {
                offset += 1;
            }
            return buffer.subarray(0, offset + 1);
        }
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return (tagType === common_1.PATagType.PA_TAG_STRING.toString().charCodeAt(0)) || (tagType === common_1.PATagType.PA_TAG_STRING_NULL.toString().charCodeAt(0));
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAString;
//# sourceMappingURL=string.js.map