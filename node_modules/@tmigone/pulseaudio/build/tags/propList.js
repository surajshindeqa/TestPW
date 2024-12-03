"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const prop_1 = require("./prop");
const PA_PROP_LIST_BASE_SIZE = 2;
class PAPropList extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_PROPLIST;
    }
    toTagBuffer(value) {
        const props = [];
        value.map(val => props.push(new prop_1.default(val)));
        const parts = [Buffer.from(common_1.PATagType.PA_TAG_PROPLIST), ...props.map(p => p.tag), Buffer.from(common_1.PATagType.PA_TAG_STRING_NULL)];
        return Buffer.concat(parts);
    }
    fromTagBuffer(buffer) {
        const values = this.parseTag(buffer);
        return values.map(v => v.value);
    }
    sanitizeBuffer(buffer) {
        const values = this.parseTag(buffer);
        let propsSize = 0;
        for (const val of values) {
            propsSize += val.size;
        }
        return buffer.subarray(0, PA_PROP_LIST_BASE_SIZE + propsSize);
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_PROPLIST.toString().charCodeAt(0);
    }
    parseTag(buffer) {
        if (buffer.subarray(0, 2).toString('hex') === '504e') {
            return [];
        }
        const props = [];
        let done = false;
        let index = 1;
        while (!done) {
            const prop = new prop_1.default(buffer.subarray(index));
            props.push(prop);
            index = index + prop.size;
            done = buffer.readUInt8(index) === 0x4e;
        }
        return props;
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAPropList;
//# sourceMappingURL=propList.js.map