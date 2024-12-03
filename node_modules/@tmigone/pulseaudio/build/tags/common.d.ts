/// <reference types="node" />
export declare enum PATagType {
    PA_TAG_INVALID = 0,
    PA_TAG_STRING = "t",
    PA_TAG_STRING_NULL = "N",
    PA_TAG_U32 = "L",
    PA_TAG_U8 = "B",
    PA_TAG_U64 = "R",
    PA_TAG_S64 = "r",
    PA_TAG_SAMPLE_SPEC = "a",
    PA_TAG_ARBITRARY = "x",
    PA_TAG_BOOLEAN_TRUE = "1",
    PA_TAG_BOOLEAN_FALSE = "0",
    PA_TAG_BOOLEAN = "1",
    PA_TAG_TIMEVAL = "T",
    PA_TAG_USEC = "U",
    PA_TAG_CHANNEL_MAP = "m",
    PA_TAG_CVOLUME = "v",
    PA_TAG_PROPLIST = "P",
    PA_TAG_VOLUME = "V",
    PA_TAG_FORMAT_INFO = "f",
    PA_TAG_PROP = "p"
}
export declare abstract class PATag<T> {
    tag: Buffer;
    size: number;
    type: PATagType;
    value: T;
    abstract toTagBuffer(value: T): Buffer;
    abstract fromTagBuffer(buffer: Buffer): T;
    abstract isValidBuffer(buffer: Buffer): boolean;
    abstract sanitizeBuffer(buffer: Buffer): Buffer;
    abstract isTagBuffer(buffer: Buffer): boolean;
    constructor(init: T | Buffer);
    isKnownTagType(tagType: number): boolean;
    static toObject(tags: Array<PATag<any>>, keyNames: string[]): Record<string, any>;
}
