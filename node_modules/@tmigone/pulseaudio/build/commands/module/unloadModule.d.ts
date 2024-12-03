import { PACommand } from '..';
import PAPacket from '../../packet';
import { Status } from '../../types/pulseaudio';
interface UnloadModule extends PACommand<Status> {
    query: (requestId: number, moduleIndex: number) => PAPacket;
}
declare const UnloadModule: UnloadModule;
export default UnloadModule;
