import PAPacket from '../../packet';
import { Source } from '../../types/pulseaudio';
import GetSource from './getSource';
import GetSourceList from './getSourceList';
import SetSourceVolume from './setSourceVolume';
export { GetSource, GetSourceList, SetSourceVolume };
export declare const parseSourcePacket: (packet: PAPacket, protocol: number) => Source[];
