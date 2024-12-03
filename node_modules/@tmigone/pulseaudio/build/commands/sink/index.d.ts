import PAPacket from '../../packet';
import { Sink } from '../../types/pulseaudio';
import GetSink from './getSink';
import GetSinkList from './getSinkList';
import SetSinkVolume from './setSinkVolume';
export { GetSink, GetSinkList, SetSinkVolume };
export declare const parseSinkPacket: (packet: PAPacket, protocol: number) => Sink[];
