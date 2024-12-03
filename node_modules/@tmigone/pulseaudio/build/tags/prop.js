"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const arbitrary_1 = require("./arbitrary");
const u32_1 = require("./u32");
const string_1 = require("./string");
const PA_PROP_BASE_SIZE = 5;
class PAProp extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_PROP;
    }
    toTagBuffer(value) {
        const valueBuffer = Buffer.allocUnsafe(value[1].length + 1);
        valueBuffer.write(value[1]);
        valueBuffer.writeUInt8(0, valueBuffer.length - 1);
        const propName = new string_1.default(value[0]);
        const propValueLength = new u32_1.default(valueBuffer.length);
        const propValue = new arbitrary_1.default(valueBuffer);
        const buffer = Buffer.allocUnsafe(propName.size + propValueLength.size + propValue.size);
        let offset = 0;
        offset += propName.tag.copy(buffer, offset);
        offset += propValueLength.tag.copy(buffer, offset);
        propValue.tag.copy(buffer, offset);
        return buffer;
    }
    fromTagBuffer(buffer) {
        const [propName, propValue] = this.parseTag(buffer);
        return [propName.value, propValue.value.subarray(0, propValue.value.length - 1).toString('utf8')];
    }
    sanitizeBuffer(buffer) {
        const [propName, propValue] = this.parseTag(buffer);
        return buffer.subarray(0, PA_PROP_BASE_SIZE + propName.size + propValue.size);
    }
    isValidBuffer(buffer) {
        return true;
    }
    parseTag(buffer) {
        let offset = 0;
        while (buffer.readUInt16BE(offset) !== common_1.PATagType.PA_TAG_U32.toString().charCodeAt(0)) {
            offset += 1;
        }
        const propName = new string_1.default(buffer.subarray(0, offset + 1));
        const propValue = new arbitrary_1.default(buffer.subarray(offset + 1 + PA_PROP_BASE_SIZE));
        return [propName, propValue];
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAProp;
//# sourceMappingURL=prop.js.map