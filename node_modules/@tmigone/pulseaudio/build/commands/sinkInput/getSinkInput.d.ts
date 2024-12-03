import { PACommand } from '..';
import PAPacket from '../../packet';
import { SinkInput } from '../../types/pulseaudio';
interface GetSinkInput extends PACommand<SinkInput> {
    query: (requestId: number, sinkInput: number | string) => PAPacket;
}
declare const GetSinkInput: GetSinkInput;
export default GetSinkInput;
