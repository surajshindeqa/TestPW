/// <reference types="node" />
import { PATag, PATagType } from './common';
export default class PAUsec extends PATag<bigint> {
    type: PATagType;
    toTagBuffer(value: bigint): Buffer;
    fromTagBuffer(buffer: Buffer): bigint;
    sanitizeBuffer(buffer: Buffer): Buffer;
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
