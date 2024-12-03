"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const _1 = require(".");
const query = (requestId) => {
    const packet = new packet_1.default();
    packet.setCommand(32);
    packet.setRequestId(requestId);
    return packet;
};
const reply = (packet, _protocol) => {
    return (0, _1.parseSourceOutputPacket)(packet);
};
const GetSourceOutputList = {
    query,
    reply
};
exports.default = GetSourceOutputList;
//# sourceMappingURL=getSourceOutputList.js.map