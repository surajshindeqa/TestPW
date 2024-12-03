import { PACommand } from '..';
import PAPacket from '../../packet';
import { Status } from '../../types/pulseaudio';
interface MoveSinkInput extends PACommand<Status> {
    query: (requestId: number, sinkInput: number, destSink: number) => PAPacket;
}
declare const MoveSinkInput: MoveSinkInput;
export default MoveSinkInput;
