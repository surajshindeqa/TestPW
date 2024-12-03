"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const PA_CHANNEL_VOLUME_BASE_SIZE = 2;
class PAChannelVolume extends common_1.PATag {
    constructor() {
        super(...arguments);
        this.type = common_1.PATagType.PA_TAG_CVOLUME;
    }
    toTagBuffer(value) {
        const buffer = Buffer.allocUnsafe(PA_CHANNEL_VOLUME_BASE_SIZE + value.channels * 4);
        let offset = 0;
        offset = buffer.writeUInt8(common_1.PATagType.PA_TAG_CVOLUME.toString().charCodeAt(0), offset);
        offset = buffer.writeUInt8(value.channels, offset);
        value.volumes.map(volume => offset = buffer.writeUInt32BE(volume, offset));
        return buffer;
    }
    fromTagBuffer(buffer) {
        return this.parseTag(buffer);
    }
    sanitizeBuffer(buffer) {
        const value = this.parseTag(buffer);
        return buffer.subarray(0, PA_CHANNEL_VOLUME_BASE_SIZE + value.channels * 4);
    }
    parseTag(buffer) {
        const channels = buffer.readUInt8(1);
        const volumes = [];
        for (let index = 0; index < channels; index++) {
            volumes.push(buffer.readUInt32BE(2 + index * 4));
        }
        return { channels, volumes };
    }
    isValidBuffer(buffer) {
        const tagType = buffer.readUInt8(0);
        return tagType === common_1.PATagType.PA_TAG_CVOLUME.toString().charCodeAt(0);
    }
    isTagBuffer(buffer) {
        return true;
    }
}
exports.default = PAChannelVolume;
//# sourceMappingURL=channelVolume.js.map