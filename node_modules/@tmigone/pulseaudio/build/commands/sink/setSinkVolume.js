"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const protocol_1 = require("../../protocol");
const query = (requestId, sink, channelVolumes) => {
    const packet = new packet_1.default();
    packet.setCommand(36);
    packet.setRequestId(requestId);
    packet.putU32(typeof sink === 'number' ? sink : protocol_1.PA_NO_VALUE);
    packet.putString(typeof sink === 'string' ? sink : '');
    packet.putChannelVolume({ channels: channelVolumes.channels, volumes: channelVolumes.volumes.map(v => Math.max(Math.min(v, 0xFFFFFFFE), 0)) });
    return packet;
};
const reply = (_packet, _protocol) => {
    return { success: true };
};
const SetSinkVolume = {
    query,
    reply
};
exports.default = SetSinkVolume;
//# sourceMappingURL=setSinkVolume.js.map