"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const protocol_1 = require("../../protocol");
const query = (requestId, cookie) => {
    const packet = new packet_1.default();
    packet.setCommand(8);
    packet.setRequestId(requestId);
    packet.putU32(protocol_1.PA_PROTOCOL_VERSION);
    packet.putArbitrary(cookie);
    return packet;
};
const reply = (packet) => {
    var _a;
    return {
        protocol: (_a = packet.tags[0]) === null || _a === void 0 ? void 0 : _a.value
    };
};
const Authenticate = {
    query,
    reply
};
exports.default = Authenticate;
//# sourceMappingURL=authenticate.js.map