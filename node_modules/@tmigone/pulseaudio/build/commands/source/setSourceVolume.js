"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const protocol_1 = require("../../protocol");
const query = (requestId, source, channelVolumes) => {
    const packet = new packet_1.default();
    packet.setCommand(38);
    packet.setRequestId(requestId);
    packet.putU32(typeof source === 'number' ? source : protocol_1.PA_NO_VALUE);
    packet.putString(typeof source === 'string' ? source : '');
    packet.putChannelVolume({ channels: channelVolumes.channels, volumes: channelVolumes.volumes.map(v => Math.max(Math.min(v, 0xFFFFFFFE), 0)) });
    return packet;
};
const reply = (_packet, _protocol) => {
    return { success: true };
};
const SetSourceVolume = {
    query,
    reply
};
exports.default = SetSourceVolume;
//# sourceMappingURL=setSourceVolume.js.map