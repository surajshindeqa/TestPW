/// <reference types="node" />
import { PATag, PATagType } from './common';
export default class PABoolean extends PATag<boolean> {
    type: PATagType;
    toTagBuffer(value: boolean): Buffer;
    fromTagBuffer(buffer: Buffer): boolean;
    sanitizeBuffer(buffer: Buffer): Buffer;
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
