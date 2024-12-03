"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const protocol_1 = require("../../protocol");
const _1 = require(".");
const query = (requestId, sourceOutput) => {
    const packet = new packet_1.default();
    packet.setCommand(31);
    packet.setRequestId(requestId);
    packet.putU32(typeof sourceOutput === 'number' ? sourceOutput : protocol_1.PA_NO_VALUE);
    return packet;
};
const reply = (packet, _protocol) => {
    const sourceOutputs = (0, _1.parseSourceOutputPacket)(packet);
    if (sourceOutputs.length !== 1) {
        throw new Error('Expected exactly one sourceOutput!');
    }
    return sourceOutputs[0];
};
const GetSourceOutput = {
    query,
    reply
};
exports.default = GetSourceOutput;
//# sourceMappingURL=getSourceOutput.js.map