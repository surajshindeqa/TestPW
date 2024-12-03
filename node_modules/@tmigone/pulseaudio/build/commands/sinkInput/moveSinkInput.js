"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const query = (requestId, sinkInputIndex, destSinkIndex) => {
    const packet = new packet_1.default();
    packet.setCommand(67);
    packet.setRequestId(requestId);
    packet.putU32(sinkInputIndex);
    packet.putU32(destSinkIndex);
    packet.putString('');
    return packet;
};
const reply = (_packet, _protocol) => {
    return { success: true };
};
const MoveSinkInput = {
    query,
    reply
};
exports.default = MoveSinkInput;
//# sourceMappingURL=moveSinkInput.js.map