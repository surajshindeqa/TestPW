import { PACommand } from '..';
import PAPacket from '../../packet';
import { ServerInfo } from '../../types/pulseaudio';
interface GetServerInfo extends PACommand<ServerInfo> {
    query: (requestId: number) => PAPacket;
}
declare const GetServerInfo: GetServerInfo;
export default GetServerInfo;
