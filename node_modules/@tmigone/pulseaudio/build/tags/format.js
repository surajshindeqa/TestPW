"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const tag_1 = require("../tag");
class PAFormat extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_FORMAT_INFO;
    }
    toTagBuffer(values) {
        const parts = [];
        parts.push(Buffer.from(common_1.PATagType.PA_TAG_FORMAT_INFO));
        parts.push(Buffer.from(common_1.PATagType.PA_TAG_U8));
        const buffer = Buffer.allocUnsafe(1);
        buffer.writeUInt8(values.encoding);
        parts.push(buffer);
        const props = new tag_1.PAPropList(values.properties);
        parts.push(props.tag);
        return Buffer.concat(parts);
    }
    fromTagBuffer(buffer) {
        return this.parseTag(buffer);
    }
    sanitizeBuffer(buffer) {
        const props = new tag_1.PAPropList(buffer.subarray(3));
        return buffer.subarray(0, props.size + 3);
    }
    parseTag(buffer) {
        const encoding = buffer.readUInt8(2);
        const props = new tag_1.PAPropList(buffer.subarray(3));
        return {
            encoding,
            properties: props.value
        };
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_FORMAT_INFO.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAFormat;
//# sourceMappingURL=format.js.map