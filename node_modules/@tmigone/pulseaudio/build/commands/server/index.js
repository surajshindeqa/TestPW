"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseServerInfoPacket = exports.Subscribe = exports.GetServerInfo = exports.Authenticate = void 0;
const authenticate_1 = require("./authenticate");
exports.Authenticate = authenticate_1.default;
const getServerInfo_1 = require("./getServerInfo");
exports.GetServerInfo = getServerInfo_1.default;
const subscribe_1 = require("./subscribe");
exports.Subscribe = subscribe_1.default;
const parseServerInfoPacket = (packet, _protocol) => {
    const serverInfos = [];
    const tags = packet.getTagsIterable();
    while (!tags.done) {
        const serverInfo = {
            name: tags.nextValue(),
            version: tags.nextValue(),
            user: tags.nextValue(),
            hostname: tags.nextValue(),
            sampleSpec: tags.nextValue(),
            defaultSink: tags.nextValue(),
            defaultSource: tags.nextValue(),
            cookie: tags.nextValue(),
            channelMap: tags.nextValue()
        };
        serverInfos.push(serverInfo);
    }
    return serverInfos;
};
exports.parseServerInfoPacket = parseServerInfoPacket;
//# sourceMappingURL=index.js.map