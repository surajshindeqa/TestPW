import { PACommand } from '..';
import PAPacket from '../../packet';
import { Sink } from '../../types/pulseaudio';
interface GetSink extends PACommand<Sink> {
    query: (requestId: number, sink: number | string) => PAPacket;
}
declare const GetSink: GetSink;
export default GetSink;
