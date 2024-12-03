"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const query = (requestId, moduleIndex) => {
    const packet = new packet_1.default();
    packet.setCommand(52);
    packet.setRequestId(requestId);
    packet.putU32(moduleIndex);
    return packet;
};
const reply = (_packet, _protocol) => {
    return { success: true };
};
const UnloadModule = {
    query,
    reply
};
exports.default = UnloadModule;
//# sourceMappingURL=unloadModule.js.map