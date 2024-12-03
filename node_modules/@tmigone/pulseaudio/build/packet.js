"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PA_PACKET_HEADER = void 0;
const fs = require("fs");
const iterator_1 = require("./utils/iterator");
const tag_1 = require("./tag");
const bigInt_1 = require("./utils/bigInt");
exports.PA_PACKET_HEADER = Buffer.from([
    0xFF, 0xFF, 0xFF, 0xFF,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00
]);
var SectionLength;
(function (SectionLength) {
    SectionLength[SectionLength["SIZE"] = 4] = "SIZE";
    SectionLength[SectionLength["HEADER"] = 16] = "HEADER";
    SectionLength[SectionLength["COMMAND"] = 5] = "COMMAND";
    SectionLength[SectionLength["REQUEST"] = 5] = "REQUEST";
})(SectionLength || (SectionLength = {}));
var SectionIndex;
(function (SectionIndex) {
    SectionIndex[SectionIndex["SIZE"] = 0] = "SIZE";
    SectionIndex[SectionIndex["HEADER"] = 4] = "HEADER";
    SectionIndex[SectionIndex["HEADER_END"] = 20] = "HEADER_END";
    SectionIndex[SectionIndex["COMMAND"] = 21] = "COMMAND";
    SectionIndex[SectionIndex["REQUEST"] = 26] = "REQUEST";
    SectionIndex[SectionIndex["TAGS"] = 30] = "TAGS";
})(SectionIndex || (SectionIndex = {}));
class PAPacket {
    constructor(buffer) {
        this.tagsSize = 0;
        this.header = exports.PA_PACKET_HEADER;
        this.tags = [];
        this.debugPrint = process.env.DEBUG_PRINT !== undefined;
        if (buffer != null) {
            this.packet = Buffer.from(buffer.subarray(0, PAPacket.getPacketSize(buffer)));
            this.read(this.packet);
        }
    }
    write() {
        const allTags = [this.command, this.requestId, ...this.tags];
        this.tagsSize = allTags.reduce((sum, tag) => {
            sum += tag.size;
            return sum;
        }, 0);
        this.packet = Buffer.allocUnsafe(4 + 16 + this.tagsSize);
        let offset = 0;
        offset = this.packet.writeUInt32BE(this.tagsSize, offset);
        offset += exports.PA_PACKET_HEADER.copy(this.packet, offset);
        for (const tag of allTags) {
            tag.tag.copy(this.packet, offset);
            offset += tag.size;
        }
        if (this.debugPrint) {
            fs.writeFileSync('PAPacket.write.buffer', this.packet.toString('hex'));
            fs.writeFileSync('PAPacket.write.tags', (0, bigInt_1.JSONStringify)(allTags));
        }
        return this.packet;
    }
    read(buffer) {
        if (!PAPacket.isValidPacket(buffer)) {
            throw new Error('Packet is not valid.');
        }
        try {
            this.tagsSize = buffer.readUInt32BE(0);
            this.header = buffer.subarray(4, 20);
            this.command = new tag_1.PAU32(buffer.readUInt32BE(21));
            this.requestId = new tag_1.PAU32(buffer.readUInt32BE(26));
            const tagsBuffer = buffer.subarray(30, 30 + this.tagsSize - 5 - 5);
            let offset = 0;
            let tag;
            while (offset < tagsBuffer.length) {
                const tagType = tagsBuffer.readUInt8(offset);
                switch (tagType) {
                    case tag_1.PATagType.PA_TAG_U32.toString().charCodeAt(0):
                        tag = new tag_1.PAU32(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_ARBITRARY.toString().charCodeAt(0):
                        tag = new tag_1.PAArbitrary(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_STRING.toString().charCodeAt(0):
                    case tag_1.PATagType.PA_TAG_STRING_NULL.toString().charCodeAt(0):
                        tag = new tag_1.PAString(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_BOOLEAN.toString().charCodeAt(0):
                    case tag_1.PATagType.PA_TAG_BOOLEAN_FALSE.toString().charCodeAt(0):
                    case tag_1.PATagType.PA_TAG_BOOLEAN_TRUE.toString().charCodeAt(0):
                        tag = new tag_1.PABoolean(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_PROPLIST.toString().charCodeAt(0):
                        tag = new tag_1.PAPropList(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_SAMPLE_SPEC.toString().charCodeAt(0):
                        tag = new tag_1.PASampleSpec(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_CHANNEL_MAP.toString().charCodeAt(0):
                        tag = new tag_1.PAChannelMap(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_CVOLUME.toString().charCodeAt(0):
                        tag = new tag_1.PAChannelVolume(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_USEC.toString().charCodeAt(0):
                        tag = new tag_1.PAUsec(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_VOLUME.toString().charCodeAt(0):
                        tag = new tag_1.PAVolume(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_U8.toString().charCodeAt(0):
                        tag = new tag_1.PAU8(tagsBuffer.subarray(offset));
                        break;
                    case tag_1.PATagType.PA_TAG_FORMAT_INFO.toString().charCodeAt(0):
                        tag = new tag_1.PAFormat(tagsBuffer.subarray(offset));
                        break;
                    default:
                        throw new Error(`Tag type: ${tagType} not supported. Please report issue.`);
                }
                this.tags.push(tag);
                offset += tag.size;
            }
        }
        catch (error) {
            console.log(error);
        }
        if (this.debugPrint) {
            fs.writeFileSync('PAPacket.read.buffer', buffer.toString('hex'));
            fs.writeFileSync('PAPacket.read.tags', (0, bigInt_1.JSONStringify)(this.tags));
        }
    }
    static isChunkHeader(chunk) {
        if (chunk.length < 4 + 16) {
            return false;
        }
        const header = chunk.subarray(4, 20);
        return Buffer.compare(header, exports.PA_PACKET_HEADER) === 0;
    }
    static getChunksSize(chunks) {
        return chunks.reduce((sum, chunk) => {
            sum += chunk.length;
            return sum;
        }, 0);
    }
    static getPacketSize(buffer) {
        const tagsSize = buffer.readUInt32BE(0);
        return 4 + 16 + tagsSize;
    }
    static isValidPacket(chunks) {
        if (chunks instanceof Buffer) {
            chunks = [chunks];
        }
        if (chunks.length === 0) {
            return false;
        }
        const chunksSize = this.getChunksSize(chunks);
        const dataLength = chunks[0].readUInt32BE(0);
        return this.isChunkHeader(chunks[0]) && chunksSize >= (4 + 16 + dataLength);
    }
    setCommand(value) {
        this.command = new tag_1.PAU32(value);
    }
    setRequestId(value) {
        this.requestId = new tag_1.PAU32(value);
    }
    putU32(value) {
        this.tags.push(new tag_1.PAU32(value));
    }
    putBoolean(value) {
        this.tags.push(new tag_1.PABoolean(value));
    }
    putArbitrary(value) {
        this.tags.push(new tag_1.PAArbitrary(value));
    }
    putString(value) {
        this.tags.push(new tag_1.PAString(value));
    }
    putProp(value) {
        this.tags.push(new tag_1.PAProp(value));
    }
    putPropList(value) {
        this.tags.push(new tag_1.PAPropList(value));
    }
    putChannelVolume(value) {
        this.tags.push(new tag_1.PAChannelVolume(value));
    }
    getTagsIterable() {
        return (0, iterator_1.createIterator)(this.tags.map(t => t.value));
    }
}
exports.default = PAPacket;
//# sourceMappingURL=packet.js.map