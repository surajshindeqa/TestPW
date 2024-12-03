"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const tag_1 = require("../tag");
class PAU8 extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_U8;
    }
    toTagBuffer(values) {
        const parts = [];
        parts.push(Buffer.from(common_1.PATagType.PA_TAG_U8));
        const formatCount = Buffer.allocUnsafe(1);
        formatCount.writeUInt8(values.length);
        parts.push(formatCount);
        for (const value of values) {
            const buffer = Buffer.allocUnsafe(3);
            let offset = 0;
            offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_FORMAT_INFO.toString().charCodeAt(0), offset);
            offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_U8.toString().charCodeAt(0), offset);
            offset = buffer.writeUInt8(value.encoding, offset);
            parts.push(buffer);
            const props = new tag_1.PAPropList(value.properties);
            parts.push(props.tag);
        }
        return Buffer.concat(parts);
    }
    fromTagBuffer(buffer) {
        return this.parseTag(buffer);
    }
    sanitizeBuffer(buffer) {
        const formats = this.parseTag(buffer);
        const formatSize = formats.reduce((sum, format) => {
            const props = new tag_1.PAPropList(format.properties);
            sum = sum + 3 + props.size;
            return sum;
        }, 2);
        return buffer.subarray(0, formatSize);
    }
    parseTag(buffer) {
        const formats = [];
        const count = buffer.readUInt8(1);
        let offset = 2;
        for (let index = 0; index < count; index++) {
            const encoding = buffer.readUInt8(offset + 2);
            const props = new tag_1.PAPropList(buffer.subarray(offset + 3));
            formats.push({ encoding, properties: props.value });
            offset = offset + 3 + props.size;
        }
        return formats;
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_U8.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAU8;
//# sourceMappingURL=u8.js.map