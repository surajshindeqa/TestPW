import PAPacket from '../../packet';
import { SourceOutput } from '../../types/pulseaudio';
import GetSourceOutput from './getSourceOutput';
import GetSourceOutputList from './getSourceOutputList';
import MoveSourceOutput from './moveSourceOutput';
export { GetSourceOutput, GetSourceOutputList, MoveSourceOutput };
export declare const parseSourceOutputPacket: (packet: PAPacket) => SourceOutput[];
