"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSourceOutputPacket = exports.MoveSourceOutput = exports.GetSourceOutputList = exports.GetSourceOutput = void 0;
const getSourceOutput_1 = require("./getSourceOutput");
exports.GetSourceOutput = getSourceOutput_1.default;
const getSourceOutputList_1 = require("./getSourceOutputList");
exports.GetSourceOutputList = getSourceOutputList_1.default;
const moveSourceOutput_1 = require("./moveSourceOutput");
exports.MoveSourceOutput = moveSourceOutput_1.default;
const parseSourceOutputPacket = (packet) => {
    const sourceOutputs = [];
    const tags = packet.getTagsIterable();
    while (!tags.done) {
        const sourceOutput = {
            index: tags.nextValue(),
            name: tags.nextValue(),
            moduleIndex: tags.nextValue(),
            clientIndex: tags.nextValue(),
            sourceIndex: tags.nextValue(),
            sampleSpec: tags.nextValue(),
            channelMap: tags.nextValue(),
            bufferLatency: tags.nextValue(),
            sourceLatency: tags.nextValue(),
            resampleMethod: tags.nextValue(),
            driverName: tags.nextValue(),
            properties: tags.nextValue(),
            isCorked: tags.nextValue(),
            channelVolume: tags.nextValue(),
            isMuted: tags.nextValue(),
            hasVolume: tags.nextValue(),
            isVolumeWritable: tags.nextValue(),
            format: tags.nextValue()
        };
        sourceOutputs.push(sourceOutput);
    }
    return sourceOutputs;
};
exports.parseSourceOutputPacket = parseSourceOutputPacket;
//# sourceMappingURL=index.js.map