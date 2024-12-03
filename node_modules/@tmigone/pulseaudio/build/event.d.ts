export declare const enum PASubscriptionMask {
    NULL = 0,
    SINK = 1,
    SOURCE = 2,
    SINK_INPUT = 4,
    SOURCE_OUTPUT = 8,
    MODULE = 16,
    CLIENT = 32,
    SAMPLE_CACHE = 64,
    SERVER = 128,
    AUTOLOAD = 256,
    CARD = 512,
    ALL = 767
}
export declare const enum PASubscriptionEventType {
    SINK = 0,
    SOURCE = 1,
    SINK_INPUT = 2,
    SOURCE_OUTPUT = 3,
    MODULE = 4,
    CLIENT = 5,
    SAMPLE_CACHE = 6,
    SERVER = 7,
    AUTOLOAD = 8,
    CARD = 9,
    FACILITY_MASK = 15,
    NEW = 0,
    CHANGE = 16,
    REMOVE = 32,
    TYPE_MASK = 48
}
export interface PAEvent {
    category: string;
    type: string;
    index: number;
}
