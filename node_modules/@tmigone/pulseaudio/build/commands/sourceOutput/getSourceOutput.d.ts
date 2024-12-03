import { PACommand } from '..';
import PAPacket from '../../packet';
import { SourceOutput } from '../../types/pulseaudio';
interface GetSourceOutput extends PACommand<SourceOutput> {
    query: (requestId: number, sourceOutput: number | string) => PAPacket;
}
declare const GetSourceOutput: GetSourceOutput;
export default GetSourceOutput;
