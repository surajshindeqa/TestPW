import { PACommand } from '..';
import PAPacket from '../../packet';
import { ClientInfo } from '../../types/pulseaudio';
interface SetClientName extends PACommand<ClientInfo> {
    query: (requestId: number, name?: string) => PAPacket;
}
declare const SetClientName: SetClientName;
export default SetClientName;
