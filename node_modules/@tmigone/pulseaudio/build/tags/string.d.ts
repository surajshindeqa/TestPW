/// <reference types="node" />
import { PATag, PATagType } from './common';
export default class PAString extends PATag<string> {
    type: PATagType;
    toTagBuffer(value: string): Buffer;
    fromTagBuffer(buffer: Buffer): string;
    sanitizeBuffer(buffer: Buffer): Buffer;
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
