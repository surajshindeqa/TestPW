import PAPacket from '../../packet';
import { SinkInput } from '../../types/pulseaudio';
import GetSinkInput from './getSinkInput';
import GetSinkInputList from './getSinkInputList';
import MoveSinkInput from './moveSinkInput';
export { GetSinkInput, GetSinkInputList, MoveSinkInput };
export declare const parseSinkInputPacket: (packet: PAPacket) => SinkInput[];
