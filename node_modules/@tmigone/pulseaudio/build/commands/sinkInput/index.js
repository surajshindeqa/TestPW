"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSinkInputPacket = exports.MoveSinkInput = exports.GetSinkInputList = exports.GetSinkInput = void 0;
const getSinkInput_1 = require("./getSinkInput");
exports.GetSinkInput = getSinkInput_1.default;
const getSinkInputList_1 = require("./getSinkInputList");
exports.GetSinkInputList = getSinkInputList_1.default;
const moveSinkInput_1 = require("./moveSinkInput");
exports.MoveSinkInput = moveSinkInput_1.default;
const parseSinkInputPacket = (packet) => {
    const sinkInputs = [];
    const tags = packet.getTagsIterable();
    while (!tags.done) {
        const sinkInput = {
            index: tags.nextValue(),
            name: tags.nextValue(),
            moduleIndex: tags.nextValue(),
            clientIndex: tags.nextValue(),
            sinkIndex: tags.nextValue(),
            sampleSpec: tags.nextValue(),
            channelMap: tags.nextValue(),
            channelVolume: tags.nextValue(),
            bufferLatency: tags.nextValue(),
            sinkLatency: tags.nextValue(),
            resampleMethod: tags.nextValue(),
            driverName: tags.nextValue(),
            isMuted: tags.nextValue(),
            properties: tags.nextValue(),
            isCorked: tags.nextValue(),
            hasVolume: tags.nextValue(),
            isVolumeWritable: tags.nextValue(),
            format: tags.nextValue()
        };
        sinkInputs.push(sinkInput);
    }
    return sinkInputs;
};
exports.parseSinkInputPacket = parseSinkInputPacket;
//# sourceMappingURL=index.js.map