"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const query = (requestId) => {
    const packet = new packet_1.default();
    packet.setCommand(35);
    packet.setRequestId(requestId);
    packet.putU32(767);
    return packet;
};
const reply = (_packet, _protocol) => {
    return {
        success: true
    };
};
const Subscribe = {
    query,
    reply
};
exports.default = Subscribe;
//# sourceMappingURL=subscribe.js.map