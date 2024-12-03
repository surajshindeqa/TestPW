"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const packet_1 = require("../../packet");
const query = (requestId, name, argument) => {
    const packet = new packet_1.default();
    packet.setCommand(51);
    packet.setRequestId(requestId);
    packet.putString(name);
    packet.putString(argument);
    return packet;
};
const reply = (packet, protocol) => {
    return (0, _1.parseIndexPacket)(packet, protocol);
};
const LoadModule = {
    query,
    reply
};
exports.default = LoadModule;
//# sourceMappingURL=loadModule.js.map