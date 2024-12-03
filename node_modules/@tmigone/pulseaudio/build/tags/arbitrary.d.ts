/// <reference types="node" />
import { PATag, PATagType } from './common';
export default class PAArbitrary extends PATag<Buffer> {
    type: PATagType;
    toTagBuffer(value: Buffer): Buffer;
    fromTagBuffer(buffer: Buffer): Buffer;
    sanitizeBuffer(buffer: Buffer): Buffer;
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
