/// <reference types="node" />
import { PATag, PATagType } from './common';
import PAProp from './prop';
export default class PAPropList extends PATag<Array<[string, string]>> {
    type: PATagType;
    toTagBuffer(value: Array<[string, string]>): Buffer;
    fromTagBuffer(buffer: Buffer): Array<[string, string]>;
    sanitizeBuffer(buffer: Buffer): Buffer;
    isValidBuffer(buffer: Buffer): boolean;
    parseTag(buffer: Buffer): PAProp[];
    isTagBuffer(buffer: Buffer): boolean;
}
