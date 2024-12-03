import PAPacket from '../../packet';
import { Index, Module } from '../../types/pulseaudio';
import GetModule from './getModule';
import GetModuleList from './getModuleList';
import LoadModule from './loadModule';
import UnloadModule from './unloadModule';
export { GetModule, GetModuleList, LoadModule, UnloadModule };
export declare const parseModulePacket: (packet: PAPacket, _protocol: number) => Module[];
export declare const parseIndexPacket: (packet: PAPacket, _protocol: number) => Index;
