"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const packet_1 = require("../../packet");
const query = (requestId) => {
    const packet = new packet_1.default();
    packet.setCommand(20);
    packet.setRequestId(requestId);
    return packet;
};
const reply = (packet, protocol) => {
    const serverInfo = (0, _1.parseServerInfoPacket)(packet, protocol);
    if (serverInfo.length !== 1) {
        throw new Error('Expected exactly one serverInfo!');
    }
    return serverInfo[0];
};
const GetServerInfo = {
    query,
    reply
};
exports.default = GetServerInfo;
//# sourceMappingURL=getServerInfo.js.map