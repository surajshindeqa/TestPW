"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("../../packet");
const query = (requestId, clientName) => {
    const packet = new packet_1.default();
    packet.setCommand(9);
    packet.setRequestId(requestId);
    packet.putPropList([['application.name', clientName]]);
    return packet;
};
const reply = (packet) => {
    return {
        index: packet.tags[0].value
    };
};
const SetClientName = {
    query,
    reply
};
exports.default = SetClientName;
//# sourceMappingURL=setClientName.js.map