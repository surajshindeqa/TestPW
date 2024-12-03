"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIndexPacket = exports.parseModulePacket = exports.UnloadModule = exports.LoadModule = exports.GetModuleList = exports.GetModule = void 0;
const getModule_1 = require("./getModule");
exports.GetModule = getModule_1.default;
const getModuleList_1 = require("./getModuleList");
exports.GetModuleList = getModuleList_1.default;
const loadModule_1 = require("./loadModule");
exports.LoadModule = loadModule_1.default;
const unloadModule_1 = require("./unloadModule");
exports.UnloadModule = unloadModule_1.default;
const parseModulePacket = (packet, _protocol) => {
    const modules = [];
    const tags = packet.getTagsIterable();
    while (!tags.done) {
        const module = {
            index: tags.nextValue(),
            name: tags.nextValue(),
            argument: tags.nextValue(),
            usageCounter: tags.nextValue(),
            properties: tags.nextValue()
        };
        modules.push(module);
    }
    return modules;
};
exports.parseModulePacket = parseModulePacket;
const parseIndexPacket = (packet, _protocol) => {
    const tags = packet.getTagsIterable();
    const moduleIndex = tags.nextValue();
    return moduleIndex;
};
exports.parseIndexPacket = parseIndexPacket;
//# sourceMappingURL=index.js.map