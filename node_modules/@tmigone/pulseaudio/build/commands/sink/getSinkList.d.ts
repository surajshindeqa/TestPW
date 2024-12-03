import { PACommand } from '..';
import PAPacket from '../../packet';
import { Sink } from '../../types/pulseaudio';
interface GetSinkList extends PACommand<Sink[]> {
    query: (requestId: number) => PAPacket;
}
declare const GetSinkList: GetSinkList;
export default GetSinkList;
