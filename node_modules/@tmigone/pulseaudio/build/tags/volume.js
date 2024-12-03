"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_VOLUME_SIZE = 5;
class PAVolume extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_VOLUME;
    }
    toTagBuffer(value) {
        const buffer = Buffer.allocUnsafe(PA_VOLUME_SIZE);
        let offset = 0;
        offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_VOLUME.toString().charCodeAt(0), offset);
        buffer.writeUInt32BE(value, offset);
        return buffer;
    }
    fromTagBuffer(buffer) {
        return buffer.readUInt32BE(1);
    }
    sanitizeBuffer(buffer) {
        return buffer.subarray(0, PA_VOLUME_SIZE);
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_VOLUME.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAVolume;
//# sourceMappingURL=volume.js.map