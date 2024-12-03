"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASubscriptionEventType = exports.PASubscriptionMask = void 0;
var PASubscriptionMask;
(function (PASubscriptionMask) {
    PASubscriptionMask[PASubscriptionMask["NULL"] = 0] = "NULL";
    PASubscriptionMask[PASubscriptionMask["SINK"] = 1] = "SINK";
    PASubscriptionMask[PASubscriptionMask["SOURCE"] = 2] = "SOURCE";
    PASubscriptionMask[PASubscriptionMask["SINK_INPUT"] = 4] = "SINK_INPUT";
    PASubscriptionMask[PASubscriptionMask["SOURCE_OUTPUT"] = 8] = "SOURCE_OUTPUT";
    PASubscriptionMask[PASubscriptionMask["MODULE"] = 16] = "MODULE";
    PASubscriptionMask[PASubscriptionMask["CLIENT"] = 32] = "CLIENT";
    PASubscriptionMask[PASubscriptionMask["SAMPLE_CACHE"] = 64] = "SAMPLE_CACHE";
    PASubscriptionMask[PASubscriptionMask["SERVER"] = 128] = "SERVER";
    PASubscriptionMask[PASubscriptionMask["AUTOLOAD"] = 256] = "AUTOLOAD";
    PASubscriptionMask[PASubscriptionMask["CARD"] = 512] = "CARD";
    PASubscriptionMask[PASubscriptionMask["ALL"] = 767] = "ALL";
})(PASubscriptionMask = exports.PASubscriptionMask || (exports.PASubscriptionMask = {}));
var PASubscriptionEventType;
(function (PASubscriptionEventType) {
    PASubscriptionEventType[PASubscriptionEventType["SINK"] = 0] = "SINK";
    PASubscriptionEventType[PASubscriptionEventType["SOURCE"] = 1] = "SOURCE";
    PASubscriptionEventType[PASubscriptionEventType["SINK_INPUT"] = 2] = "SINK_INPUT";
    PASubscriptionEventType[PASubscriptionEventType["SOURCE_OUTPUT"] = 3] = "SOURCE_OUTPUT";
    PASubscriptionEventType[PASubscriptionEventType["MODULE"] = 4] = "MODULE";
    PASubscriptionEventType[PASubscriptionEventType["CLIENT"] = 5] = "CLIENT";
    PASubscriptionEventType[PASubscriptionEventType["SAMPLE_CACHE"] = 6] = "SAMPLE_CACHE";
    PASubscriptionEventType[PASubscriptionEventType["SERVER"] = 7] = "SERVER";
    PASubscriptionEventType[PASubscriptionEventType["AUTOLOAD"] = 8] = "AUTOLOAD";
    PASubscriptionEventType[PASubscriptionEventType["CARD"] = 9] = "CARD";
    PASubscriptionEventType[PASubscriptionEventType["FACILITY_MASK"] = 15] = "FACILITY_MASK";
    PASubscriptionEventType[PASubscriptionEventType["NEW"] = 0] = "NEW";
    PASubscriptionEventType[PASubscriptionEventType["CHANGE"] = 16] = "CHANGE";
    PASubscriptionEventType[PASubscriptionEventType["REMOVE"] = 32] = "REMOVE";
    PASubscriptionEventType[PASubscriptionEventType["TYPE_MASK"] = 48] = "TYPE_MASK";
})(PASubscriptionEventType = exports.PASubscriptionEventType || (exports.PASubscriptionEventType = {}));
//# sourceMappingURL=event.js.map