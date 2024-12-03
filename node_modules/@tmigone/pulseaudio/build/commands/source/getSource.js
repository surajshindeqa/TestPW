"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const protocol_1 = require("../../protocol");
const _1 = require(".");
const query = (requestId, source) => {
    const packet = new packet_1.default();
    packet.setCommand(23);
    packet.setRequestId(requestId);
    packet.putU32(typeof source === 'number' ? source : protocol_1.PA_NO_VALUE);
    packet.putString(typeof source === 'string' ? source : '');
    return packet;
};
const reply = (packet, protocol) => {
    const sinks = (0, _1.parseSourcePacket)(packet, protocol);
    if (sinks.length !== 1) {
        throw new Error('Expected exactly one sink!');
    }
    return sinks[0];
};
const GetSource = {
    query,
    reply
};
exports.default = GetSource;
//# sourceMappingURL=getSource.js.map