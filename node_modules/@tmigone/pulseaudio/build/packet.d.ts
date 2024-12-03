/// <reference types="node" />
import { Iterator } from './utils/iterator';
import { PATag, PAU32 } from './tag';
import { ChannelVolume } from './types/pulseaudio';
export declare const PA_PACKET_HEADER: Buffer;
export default class PAPacket {
    packet: Buffer;
    tagsSize: number;
    header: Buffer;
    command: PAU32;
    requestId: PAU32;
    tags: Array<PATag<any>>;
    private readonly debugPrint;
    constructor(buffer?: Buffer);
    write(): Buffer;
    read(buffer: Buffer): void;
    static isChunkHeader(chunk: Buffer): boolean;
    static getChunksSize(chunks: Buffer[]): number;
    static getPacketSize(buffer: Buffer): number;
    static isValidPacket(chunks: Buffer | Buffer[]): boolean;
    setCommand(value: number): void;
    setRequestId(value: number): void;
    putU32(value: number): void;
    putBoolean(value: boolean): void;
    putArbitrary(value: Buffer): void;
    putString(value: string): void;
    putProp(value: [string, string]): void;
    putPropList(value: Array<[string, string]>): void;
    putChannelVolume(value: ChannelVolume): void;
    getTagsIterable(): Iterator<PATag<any>>;
}
