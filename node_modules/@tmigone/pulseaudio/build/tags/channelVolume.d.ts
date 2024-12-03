/// <reference types="node" />
import { PATag, PATagType } from './common';
import { ChannelVolume } from '../types/pulseaudio';
export default class PAChannelVolume extends PATag<ChannelVolume> {
    type: PATagType;
    toTagBuffer(value: ChannelVolume): Buffer;
    fromTagBuffer(buffer: Buffer): ChannelVolume;
    sanitizeBuffer(buffer: Buffer): Buffer;
    parseTag(buffer: Buffer): ChannelVolume;
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
