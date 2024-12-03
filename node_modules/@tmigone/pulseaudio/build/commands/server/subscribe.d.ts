import { PACommand } from '..';
import PAPacket from '../../packet';
import { SubscribeInfo } from '../../types/pulseaudio';
interface Subscribe extends PACommand<SubscribeInfo> {
    query: (requestId: number) => PAPacket;
}
declare const Subscribe: Subscribe;
export default Subscribe;
