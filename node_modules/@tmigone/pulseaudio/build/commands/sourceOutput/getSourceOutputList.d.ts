import { PACommand } from '..';
import PAPacket from '../../packet';
import { SourceOutput } from '../../types/pulseaudio';
interface GetSourceOutputList extends PACommand<SourceOutput[]> {
    query: (requestId: number) => PAPacket;
}
declare const GetSourceOutputList: GetSourceOutputList;
export default GetSourceOutputList;
