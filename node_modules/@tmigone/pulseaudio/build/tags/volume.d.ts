/// <reference types="node" />
import { PATag, PATagType } from './common';
export default class PAVolume extends PATag<number> {
    type: PATagType;
    toTagBuffer(value: number): Buffer;
    fromTagBuffer(buffer: Buffer): number;
    sanitizeBuffer(buffer: Buffer): Buffer;
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
