"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const _1 = require(".");
const query = (requestId) => {
    const packet = new packet_1.default();
    packet.setCommand(24);
    packet.setRequestId(requestId);
    return packet;
};
const reply = (packet, protocol) => {
    return (0, _1.parseSourcePacket)(packet, protocol);
};
const GetSourceList = {
    query,
    reply
};
exports.default = GetSourceList;
//# sourceMappingURL=getSourceList.js.map