"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const query = (requestId, sourceOutput, destSource) => {
    const packet = new packet_1.default();
    packet.setCommand(68);
    packet.setRequestId(requestId);
    packet.putU32(sourceOutput);
    packet.putU32(destSource);
    packet.putString('');
    return packet;
};
const reply = (_packet, _protocol) => {
    return { success: true };
};
const MoveSourceOutput = {
    query,
    reply
};
exports.default = MoveSourceOutput;
//# sourceMappingURL=moveSourceOutput.js.map