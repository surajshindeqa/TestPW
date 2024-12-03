"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const _1 = require(".");
const query = (requestId) => {
    const packet = new packet_1.default();
    packet.setCommand(26);
    packet.setRequestId(requestId);
    return packet;
};
const reply = (packet, protocol) => {
    return (0, _1.parseModulePacket)(packet, protocol);
};
const GetModuleList = {
    query,
    reply
};
exports.default = GetModuleList;
//# sourceMappingURL=getModuleList.js.map