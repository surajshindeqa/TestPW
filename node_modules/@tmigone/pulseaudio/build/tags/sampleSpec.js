"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_SAMPLE_SPEC_SIZE = 7;
class PASampleSpec extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_SAMPLE_SPEC;
    }
    toTagBuffer(value) {
        const buffer = Buffer.allocUnsafe(PA_SAMPLE_SPEC_SIZE);
        let offset = 0;
        offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_SAMPLE_SPEC.toString().charCodeAt(0), offset);
        offset = buffer.writeUInt8(value.format, offset);
        offset = buffer.writeUInt8(value.channels, offset);
        buffer.writeUInt32BE(value.rate, offset);
        return buffer;
    }
    fromTagBuffer(buffer) {
        return {
            format: buffer.readUInt8(1),
            channels: buffer.readUInt8(2),
            rate: buffer.readUInt32BE(3)
        };
    }
    sanitizeBuffer(buffer) {
        return buffer.subarray(0, PA_SAMPLE_SPEC_SIZE);
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_SAMPLE_SPEC.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PASampleSpec;
//# sourceMappingURL=sampleSpec.js.map