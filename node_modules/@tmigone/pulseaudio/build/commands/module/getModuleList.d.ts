import { PACommand } from '..';
import PAPacket from '../../packet';
import { Module } from '../../types/pulseaudio';
interface GetModuleList extends PACommand<Module[]> {
    query: (requestId: number) => PAPacket;
}
declare const GetModuleList: GetModuleList;
export default GetModuleList;
