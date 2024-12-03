import { PACommand } from '..';
import PAPacket from '../../packet';
import { Status } from '../../types/pulseaudio';
interface MoveSourceOutput extends PACommand<Status> {
    query: (requestId: number, sourceOutput: number, destSource: number) => PAPacket;
}
declare const MoveSourceOutput: MoveSourceOutput;
export default MoveSourceOutput;
