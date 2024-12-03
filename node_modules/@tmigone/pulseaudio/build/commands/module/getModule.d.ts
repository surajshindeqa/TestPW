import { PACommand } from '..';
import PAPacket from '../../packet';
import { Module } from '../../types/pulseaudio';
interface GetModule extends PACommand<Module> {
    query: (requestId: number, module: number | string) => PAPacket;
}
declare const GetModule: GetModule;
export default GetModule;
