"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const _1 = require(".");
const query = (requestId, moduleIndex) => {
    const packet = new packet_1.default();
    packet.setCommand(25);
    packet.setRequestId(requestId);
    packet.putU32(moduleIndex);
    return packet;
};
const reply = (packet, protocol) => {
    const sinks = (0, _1.parseModulePacket)(packet, protocol);
    if (sinks.length !== 1) {
        throw new Error('Expected exactly one sink!');
    }
    return sinks[0];
};
const GetModule = {
    query,
    reply
};
exports.default = GetModule;
//# sourceMappingURL=getModule.js.map