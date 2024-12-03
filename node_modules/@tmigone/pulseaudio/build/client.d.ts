/// <reference types="node" />
import { EventEmitter } from 'events';
import { AuthInfo, ClientInfo, Module, ServerInfo, Sink, SinkInput, Source, SourceOutput, SubscribeInfo, VolumeInfo } from './types/pulseaudio';
export interface TCPSocket {
    type: 'tcp';
    port: number;
    host: string;
}
export interface UnixSocket {
    type: 'unix';
    path: string;
}
export default class PulseAudio extends EventEmitter {
    address: TCPSocket | UnixSocket;
    cookie: Buffer;
    connected: boolean;
    protocol: number;
    private socket;
    private chunks;
    private requests;
    private lastRequestId;
    constructor(address: string, cookie?: string);
    connect(): Promise<AuthInfo>;
    disconnect(): void;
    setClientName(clientName?: string): Promise<ClientInfo>;
    private authenticate;
    subscribe(): Promise<SubscribeInfo>;
    getServerInfo(): Promise<ServerInfo>;
    getSink(sink: number | string): Promise<Sink>;
    getSinkList(): Promise<Sink[]>;
    setSinkVolume(sink: number | string, volume: number): Promise<VolumeInfo>;
    getSinkInputList(): Promise<Sink[]>;
    getSinkInput(sinkInput: number | string): Promise<SinkInput>;
    moveSinkInput(sinkInput: number, sink: number): Promise<any>;
    getSource(source: number | string): Promise<Source>;
    getSourceList(): Promise<Source[]>;
    setSourceVolume(source: number | string, volume: number): Promise<Source>;
    getSourceOutput(sourceOutput: number | string): Promise<SourceOutput>;
    getSourceOutputList(): Promise<SourceOutput[]>;
    moveSourceOutput(sourceOutput: number, source: number): Promise<SourceOutput>;
    getModule(module: number): Promise<Module>;
    getModuleList(): Promise<Module[]>;
    loadModule(name: string, argument: string): Promise<Module>;
    unloadModule(module: number): Promise<Module>;
    private onReadable;
    private requestId;
    private sendRequest;
    private resolveRequest;
    private rejectRequest;
    private parseReply;
    private parseEvent;
    private parseAddress;
    private parseCookie;
}
