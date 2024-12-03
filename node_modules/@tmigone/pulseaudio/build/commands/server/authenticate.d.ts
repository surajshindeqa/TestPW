/// <reference types="node" />
import { PACommand } from '..';
import PAPacket from '../../packet';
import { AuthInfo } from '../../types/pulseaudio';
interface Authenticate extends PACommand<AuthInfo> {
    query: (requestId: number, cookie: Buffer) => PAPacket;
}
declare const Authenticate: Authenticate;
export default Authenticate;
