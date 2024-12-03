"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_CHANNEL_MAP_BASE_SIZE = 2;
class PAChannelMap extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_CHANNEL_MAP;
    }
    toTagBuffer(value) {
        const buffer = Buffer.allocUnsafe(PA_CHANNEL_MAP_BASE_SIZE + value.channels);
        let offset = 0;
        offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_CHANNEL_MAP.toString().charCodeAt(0), offset);
        offset = buffer.writeUInt8(value.channels, offset);
        value.types.map(type => offset = buffer.writeUInt8(type, offset));
        return buffer;
    }
    fromTagBuffer(buffer) {
        return this.parseTag(buffer);
    }
    sanitizeBuffer(buffer) {
        const value = this.parseTag(buffer);
        return buffer.subarray(0, PA_CHANNEL_MAP_BASE_SIZE + value.channels);
    }
    parseTag(buffer) {
        const channels = buffer.readUInt8(1);
        const types = [];
        for (let index = 0; index < channels; index++) {
            types.push(buffer.readUInt8(2 + index));
        }
        return { channels, types };
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_CHANNEL_MAP.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAChannelMap;
//# sourceMappingURL=channelMap.js.map