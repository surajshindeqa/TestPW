import { PACommand } from '..';
import PAPacket from '../../packet';
import { SinkInput } from '../../types/pulseaudio';
interface GetSinkInputList extends PACommand<SinkInput[]> {
    query: (requestId: number) => PAPacket;
}
declare const GetSinkInputList: GetSinkInputList;
export default GetSinkInputList;
