/// <reference types="node" />
import { PATag, PATagType } from './common';
import { SampleSpec } from '../types/pulseaudio';
export default class PASampleSpec extends PATag<SampleSpec> {
    type: PATagType;
    toTagBuffer(value: SampleSpec): Buffer;
    fromTagBuffer(buffer: Buffer): SampleSpec;
    sanitizeBuffer(buffer: Buffer): Buffer;
    isValidBuffer(buffer: Buffer): boolean;
    isTagBuffer(buffer: Buffer): boolean;
}
