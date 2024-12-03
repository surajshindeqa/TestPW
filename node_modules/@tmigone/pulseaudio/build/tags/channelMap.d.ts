/// <reference types="node" />
import { PATag, PATagType } from './common';
import { ChannelMap } from '../types/pulseaudio';
export default class PAChannelMap extends PATag<ChannelMap> {
    type: PATagType;
    toTagBuffer(value: ChannelMap): Buffer;
    fromTagBuffer(buffer: Buffer): ChannelMap;
    sanitizeBuffer(buffer: Buffer): Buffer;
    parseTag(buffer: Buffer): ChannelMap;
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
