"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const protocol_1 = require("../../protocol");
const _1 = require(".");
const query = (requestId, sinkInput) => {
    const packet = new packet_1.default();
    packet.setCommand(29);
    packet.setRequestId(requestId);
    packet.putU32(typeof sinkInput === 'number' ? sinkInput : protocol_1.PA_NO_VALUE);
    return packet;
};
const reply = (packet, _protocol) => {
    const sinkInputs = (0, _1.parseSinkInputPacket)(packet);
    if (sinkInputs.length !== 1) {
        throw new Error('Expected exactly one sinkInput!');
    }
    return sinkInputs[0];
};
const GetSinkInput = {
    query,
    reply
};
exports.default = GetSinkInput;
//# sourceMappingURL=getSinkInput.js.map