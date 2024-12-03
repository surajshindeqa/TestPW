import { ServerInfo } from '../..';
import PAPacket from '../../packet';
import Authenticate from './authenticate';
import GetServerInfo from './getServerInfo';
import Subscribe from './subscribe';
export { Authenticate, GetServerInfo, Subscribe };
export declare const parseServerInfoPacket: (packet: PAPacket, _protocol: number) => ServerInfo[];
