/// <reference types="node" />
import { PATag, PATagType } from './common';
import PAArbitrary from './arbitrary';
import PAString from './string';
export default class PAProp extends PATag<[string, string]> {
    type: PATagType;
    toTagBuffer(value: [string, string]): Buffer;
    fromTagBuffer(buffer: Buffer): [string, string];
    sanitizeBuffer(buffer: Buffer): Buffer;
    isValidBuffer(buffer: Buffer): boolean;
    parseTag(buffer: Buffer): [PAString, PAArbitrary];
    isTagBuffer(buffer: Buffer): boolean;
}
