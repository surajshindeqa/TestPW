"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_ARBITRARY_BASE_SIZE = 5;
class PAArbitrary extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_ARBITRARY;
    }
    toTagBuffer(value) {
        const buffer = Buffer.allocUnsafe(PA_ARBITRARY_BASE_SIZE + value.length);
        let offset = 0;
        offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_ARBITRARY.toString().charCodeAt(0), offset);
        offset = buffer.writeUInt32BE(value.length, offset);
        value.copy(buffer, offset);
        return buffer;
    }
    fromTagBuffer(buffer) {
        return buffer.subarray(5);
    }
    sanitizeBuffer(buffer) {
        const valueLength = buffer.readUInt32BE(1);
        return buffer.subarray(0, PA_ARBITRARY_BASE_SIZE + valueLength);
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_ARBITRARY.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        try {
            const tagType = buffer.readUInt8(0);
            const valueLength = buffer.readUInt32BE(1);
            const value = buffer.subarray(PA_ARBITRARY_BASE_SIZE, PA_ARBITRARY_BASE_SIZE + valueLength);
            return tagType === common_1.PATagType.PA_TAG_ARBITRARY.toString().charCodeAt(0) && valueLength === value.length;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.default = PAArbitrary;
//# sourceMappingURL=arbitrary.js.map