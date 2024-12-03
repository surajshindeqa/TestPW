"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const _1 = require(".");
const query = (requestId) => {
    const packet = new packet_1.default();
    packet.setCommand(22);
    packet.setRequestId(requestId);
    return packet;
};
const reply = (packet, protocol) => {
    return (0, _1.parseSinkPacket)(packet, protocol);
};
const GetSinkList = {
    query,
    reply
};
exports.default = GetSinkList;
//# sourceMappingURL=getSinkList.js.map