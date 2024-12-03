"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const protocol_1 = require("../../protocol");
const _1 = require(".");
const query = (requestId, sink) => {
    const packet = new packet_1.default();
    packet.setCommand(21);
    packet.setRequestId(requestId);
    packet.putU32(typeof sink === 'number' ? sink : protocol_1.PA_NO_VALUE);
    packet.putString(typeof sink === 'string' ? sink : '');
    return packet;
};
const reply = (packet, protocol) => {
    const sinks = (0, _1.parseSinkPacket)(packet, protocol);
    if (sinks.length !== 1) {
        throw new Error('Expected exactly one sink!');
    }
    return sinks[0];
};
const GetSink = {
    query,
    reply
};
exports.default = GetSink;
//# sourceMappingURL=getSink.js.map