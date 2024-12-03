"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATag = exports.PATagType = void 0;
var PATagType;
(function (PATagType) {
    PATagType[PATagType["PA_TAG_INVALID"] = 0] = "PA_TAG_INVALID";
    PATagType["PA_TAG_STRING"] = "t";
    PATagType["PA_TAG_STRING_NULL"] = "N";
    PATagType["PA_TAG_U32"] = "L";
    PATagType["PA_TAG_U8"] = "B";
    PATagType["PA_TAG_U64"] = "R";
    PATagType["PA_TAG_S64"] = "r";
    PATagType["PA_TAG_SAMPLE_SPEC"] = "a";
    PATagType["PA_TAG_ARBITRARY"] = "x";
    PATagType["PA_TAG_BOOLEAN_TRUE"] = "1";
    PATagType["PA_TAG_BOOLEAN_FALSE"] = "0";
    PATagType["PA_TAG_BOOLEAN"] = "1";
    PATagType["PA_TAG_TIMEVAL"] = "T";
    PATagType["PA_TAG_USEC"] = "U";
    PATagType["PA_TAG_CHANNEL_MAP"] = "m";
    PATagType["PA_TAG_CVOLUME"] = "v";
    PATagType["PA_TAG_PROPLIST"] = "P";
    PATagType["PA_TAG_VOLUME"] = "V";
    PATagType["PA_TAG_FORMAT_INFO"] = "f";
    PATagType["PA_TAG_PROP"] = "p";
})(PATagType = exports.PATagType || (exports.PATagType = {}));
class PATag {
    constructor(init) {
        if (init instanceof Buffer && this.isTagBuffer(init)) {
            if (this.isValidBuffer(init)) {
                this.tag = Buffer.from(this.sanitizeBuffer(init));
                this.value = this.fromTagBuffer(this.tag);
            }
            else {
                throw new Error('Error parsing buffer. Incorrect tag type!');
            }
        }
        else {
            this.value = init;
            this.tag = Buffer.from(this.toTagBuffer(this.value));
        }
        this.size = this.tag.length;
    }
    isKnownTagType(tagType) {
        return Object.values(PATagType).includes(String.fromCharCode(tagType));
    }
    static toObject(tags, keyNames) {
        const values = tags.map(t => t.value);
        return new Array(Math.floor(values.length / keyNames.length))
            .fill(0)
            .map(() => values.splice(0, keyNames.length))
            .map(pv => keyNames.map((p, i) => [p, pv[i]]))
            .map(pv => Object.fromEntries(pv));
    }
}
exports.PATag = PATag;
//# sourceMappingURL=common.js.map