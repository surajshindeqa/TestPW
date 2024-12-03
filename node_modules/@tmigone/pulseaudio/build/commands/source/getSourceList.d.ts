import { PACommand } from '..';
import PAPacket from '../../packet';
import { Source } from '../../types/pulseaudio';
interface GetSourceList extends PACommand<Source[]> {
    query: (requestId: number) => PAPacket;
}
declare const GetSourceList: GetSourceList;
export default GetSourceList;
