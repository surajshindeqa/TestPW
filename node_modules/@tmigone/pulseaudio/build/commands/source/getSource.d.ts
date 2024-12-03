import { PACommand } from '..';
import PAPacket from '../../packet';
import { Source } from '../../types/pulseaudio';
interface GetSource extends PACommand<Source> {
    query: (requestId: number, source: number | string) => PAPacket;
}
declare const GetSource: GetSource;
export default GetSource;
