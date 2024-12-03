/// <reference types="node" />
import { PATag, PATagType } from './common';
import { Format } from '../types/pulseaudio';
export default class PAU8 extends PATag<Format[]> {
    type: PATagType;
    toTagBuffer(values: Format[]): Buffer;
    fromTagBuffer(buffer: Buffer): Format[];
    sanitizeBuffer(buffer: Buffer): Buffer;
    parseTag(buffer: Buffer): Format[];
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
