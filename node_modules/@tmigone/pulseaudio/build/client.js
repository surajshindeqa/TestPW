"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const fs_1 = require("fs");
const net_1 = require("net");
const packet_1 = require("./packet");
const request_1 = require("./request");
const protocol_1 = require("./protocol");
const error_1 = require("./error");
const client_1 = require("./commands/client");
const sink_1 = require("./commands/sink");
const server_1 = require("./commands/server");
const sinkInput_1 = require("./commands/sinkInput");
const module_1 = require("./commands/module");
const source_1 = require("./commands/source");
const sourceOutput_1 = require("./commands/sourceOutput");
class PulseAudio extends events_1.EventEmitter {
    constructor(address, cookie) {
        super();
        this.cookie = Buffer.allocUnsafe(256);
        this.connected = false;
        this.protocol = 0;
        this.chunks = [];
        this.requests = [];
        this.lastRequestId = 0;
        this.parseAddress(address);
        if (cookie !== undefined)
            this.parseCookie(cookie);
    }
    async connect() {
        return await new Promise((resolve, reject) => {
            this.socket = new net_1.Socket();
            if (this.address.type === 'tcp') {
                this.socket.connect(this.address.port, this.address.host);
            }
            else {
                this.socket.connect(this.address.path);
            }
            this.socket.on('connect', async () => {
                this.connected = true;
                const reply = await this.authenticate();
                this.protocol = reply.protocol;
                if (this.address.type === 'tcp') {
                    console.log(`Connected to PulseAudio at tcp://${this.address.host}:${this.address.port} using protocol v${this.protocol}`);
                }
                else {
                    console.log(`Connected to PulseAudio at unix://${this.address.path} using protocol v${this.protocol}`);
                }
                if (reply.protocol < protocol_1.PA_PROTOCOL_MINIMUM_VERSION) {
                    this.disconnect();
                    reject(new Error(`Server protocol version is too low, please update to ${protocol_1.PA_PROTOCOL_MINIMUM_VERSION} or higher.`));
                }
                resolve(reply);
            });
            this.socket.on('readable', this.onReadable.bind(this));
            this.socket.on('error', reject);
        });
    }
    disconnect() {
        this.socket.removeAllListeners();
        this.socket.end();
    }
    async setClientName(clientName = 'paclient') {
        const query = client_1.SetClientName.query(this.requestId(), clientName);
        return await this.sendRequest(query);
    }
    async authenticate() {
        const query = server_1.Authenticate.query(this.requestId(), this.cookie);
        return await this.sendRequest(query);
    }
    async subscribe() {
        const query = server_1.Subscribe.query(this.requestId());
        return await this.sendRequest(query);
    }
    async getServerInfo() {
        const query = server_1.GetServerInfo.query(this.requestId());
        return await this.sendRequest(query);
    }
    async getSink(sink) {
        const query = sink_1.GetSink.query(this.requestId(), sink);
        return await this.sendRequest(query);
    }
    async getSinkList() {
        const query = sink_1.GetSinkList.query(this.requestId());
        return await this.sendRequest(query);
    }
    async setSinkVolume(sink, volume) {
        const query = sink_1.SetSinkVolume.query(this.requestId(), sink, { channels: 2, volumes: [volume, volume] });
        return await this.sendRequest(query);
    }
    async getSinkInputList() {
        const query = sinkInput_1.GetSinkInputList.query(this.requestId());
        return await this.sendRequest(query);
    }
    async getSinkInput(sinkInput) {
        const query = sinkInput_1.GetSinkInput.query(this.requestId(), sinkInput);
        return await this.sendRequest(query);
    }
    async moveSinkInput(sinkInput, sink) {
        const query = sinkInput_1.MoveSinkInput.query(this.requestId(), sinkInput, sink);
        return await this.sendRequest(query);
    }
    async getSource(source) {
        const query = source_1.GetSource.query(this.requestId(), source);
        return await this.sendRequest(query);
    }
    async getSourceList() {
        const query = source_1.GetSourceList.query(this.requestId());
        return await this.sendRequest(query);
    }
    async setSourceVolume(source, volume) {
        const query = source_1.SetSourceVolume.query(this.requestId(), source, { channels: 2, volumes: [volume, volume] });
        return await this.sendRequest(query);
    }
    async getSourceOutput(sourceOutput) {
        const query = sourceOutput_1.GetSourceOutput.query(this.requestId(), sourceOutput);
        return await this.sendRequest(query);
    }
    async getSourceOutputList() {
        const query = sourceOutput_1.GetSourceOutputList.query(this.requestId());
        return await this.sendRequest(query);
    }
    async moveSourceOutput(sourceOutput, source) {
        const query = sourceOutput_1.MoveSourceOutput.query(this.requestId(), sourceOutput, source);
        return await this.sendRequest(query);
    }
    async getModule(module) {
        const query = module_1.GetModule.query(this.requestId(), module);
        return await this.sendRequest(query);
    }
    async getModuleList() {
        const query = module_1.GetModuleList.query(this.requestId());
        return await this.sendRequest(query);
    }
    async loadModule(name, argument) {
        const query = module_1.LoadModule.query(this.requestId(), name, argument);
        return await this.sendRequest(query);
    }
    async unloadModule(module) {
        const query = module_1.UnloadModule.query(this.requestId(), module);
        return await this.sendRequest(query);
    }
    onReadable() {
        if (this.socket.readableLength < 10) {
            console.log('Malformed packet!');
            const malformed = this.socket.read(this.socket.readableLength);
            console.log(malformed);
            return;
        }
        const chunk = this.socket.read(this.socket.readableLength);
        if (packet_1.default.isChunkHeader(chunk) && this.chunks.length > 0) {
            console.log('WARNING: discarding chunks, this might be a bug...');
            this.chunks = [];
        }
        this.chunks.push(chunk);
        while (packet_1.default.isValidPacket(this.chunks)) {
            const packet = new packet_1.default(Buffer.concat(this.chunks));
            this.resolveRequest(packet);
            this.chunks = packet_1.default.getChunksSize(this.chunks) === packet.packet.length ? [] : [Buffer.concat(this.chunks).subarray(packet.packet.length)];
        }
    }
    requestId() {
        this.lastRequestId = (this.lastRequestId + 1) & protocol_1.PA_MAX_REQUEST_ID;
        return this.lastRequestId;
    }
    async sendRequest(query) {
        const request = new request_1.default(this.lastRequestId, query);
        this.requests.push(request);
        if (!this.connected && query.command.value !== 8..toString().charCodeAt(0)) {
            return this.rejectRequest(request, new Error('No connection to PulseAudio.'));
        }
        this.socket.write(request.query.write());
        return await request.promise;
    }
    resolveRequest(reply) {
        let request;
        let event;
        switch (reply.command.value) {
            case 0:
                request = this.requests.find(r => r.id === reply.requestId.value);
                request === null || request === void 0 ? void 0 : request.resolve({ success: false, error: error_1.PAError[reply.tags[0].value] });
                this.requests = this.requests.filter(r => r.id !== reply.requestId.value);
                break;
            case 2:
                request = this.requests.find(r => r.id === reply.requestId.value);
                request === null || request === void 0 ? void 0 : request.resolve(this.parseReply(reply, request.query.command));
                this.requests = this.requests.filter(r => r.id !== reply.requestId.value);
                break;
            case 66:
                event = this.parseEvent(reply);
                this.emit(event.category, event);
                this.emit('all', event);
                break;
            default:
                throw new Error(`Reply type ${reply.command.value} not supported. Please report issue.`);
        }
    }
    rejectRequest(request, error) {
        request.reject(error);
        this.requests = this.requests.filter(r => r.id !== request.id);
    }
    parseReply(reply, query) {
        let retObj = {};
        switch (query.value) {
            case 8:
                retObj = server_1.Authenticate.reply(reply, this.protocol);
                break;
            case 20:
                retObj = server_1.GetServerInfo.reply(reply, this.protocol);
                break;
            case 35:
                retObj = server_1.Subscribe.reply(reply, this.protocol);
                break;
            case 9:
                retObj = client_1.SetClientName.reply(reply, this.protocol);
                break;
            case 22:
                retObj = sink_1.GetSinkList.reply(reply, this.protocol);
                break;
            case 21:
                retObj = sink_1.GetSink.reply(reply, this.protocol);
                break;
            case 36:
                retObj = sink_1.SetSinkVolume.reply(reply, this.protocol);
                break;
            case 29:
                retObj = sinkInput_1.GetSinkInput.reply(reply, this.protocol);
                break;
            case 30:
                retObj = sinkInput_1.GetSinkInputList.reply(reply, this.protocol);
                break;
            case 67:
                retObj = sinkInput_1.MoveSinkInput.reply(reply, this.protocol);
                break;
            case 23:
                retObj = source_1.GetSource.reply(reply, this.protocol);
                break;
            case 24:
                retObj = source_1.GetSourceList.reply(reply, this.protocol);
                break;
            case 38:
                retObj = source_1.SetSourceVolume.reply(reply, this.protocol);
                break;
            case 31:
                retObj = sourceOutput_1.GetSourceOutput.reply(reply, this.protocol);
                break;
            case 32:
                retObj = sourceOutput_1.GetSourceOutputList.reply(reply, this.protocol);
                break;
            case 68:
                retObj = sourceOutput_1.MoveSourceOutput.reply(reply, this.protocol);
                break;
            case 25:
                retObj = module_1.GetModule.reply(reply, this.protocol);
                break;
            case 26:
                retObj = module_1.GetModuleList.reply(reply, this.protocol);
                break;
            case 51:
                retObj = module_1.LoadModule.reply(reply, this.protocol);
                break;
            case 52:
                retObj = module_1.UnloadModule.reply(reply, this.protocol);
                break;
            default:
                throw new Error(`Command ${query.value} not supported. Please report issue.`);
        }
        return retObj;
    }
    parseEvent(packet) {
        const details = packet.tags[0].value;
        const index = packet.tags[1].value;
        let category = '';
        switch (details & 15) {
            case 0:
                category = 'sink';
                break;
            case 1:
                category = 'source';
                break;
            case 2:
                category = 'sinkInput';
                break;
            case 3:
                category = 'sourceOutput';
                break;
            case 4:
                category = 'module';
                break;
            case 5:
                category = 'client';
                break;
            case 6:
                category = 'sampleCache';
                break;
            case 7:
                category = 'server';
                break;
            case 8:
                category = 'autoload';
                break;
            case 9:
                category = 'card';
                break;
            default:
                throw new Error(`Details type ${details} not supported. Please report issue.`);
        }
        let type = '';
        switch (details & 48) {
            case 0:
                type = 'new';
                break;
            case 16:
                type = 'change';
                break;
            case 32:
                type = 'remove';
                break;
            default:
                throw new Error(`Event type ${details} not supported. Please report issue.`);
        }
        return {
            index,
            category,
            type
        };
    }
    parseAddress(address) {
        var _a, _b;
        if (address.startsWith('tcp:')) {
            const split = address.split(':');
            this.address = {
                type: 'tcp',
                port: parseInt((_a = split[2]) !== null && _a !== void 0 ? _a : '4317'),
                host: split[1]
            };
        }
        else if (address.startsWith('unix:')) {
            const split = address.split(':');
            this.address = {
                type: 'unix',
                path: split[1]
            };
        }
        else if (address.includes(':')) {
            const split = address.split(':');
            this.address = {
                type: 'tcp',
                port: parseInt((_b = split[1]) !== null && _b !== void 0 ? _b : '4317'),
                host: split[0]
            };
        }
        else {
            throw new Error('Unrecognized server address format. Please use "tcp:host:port", "unix:/path/to/socket" or "host:port".');
        }
    }
    parseCookie(cookiePath) {
        try {
            this.cookie = Buffer.from((0, fs_1.readFileSync)(cookiePath, 'hex'), 'hex');
        }
        catch (error) {
            console.log('Error reading cookie file, might not be able to authenticate.');
            console.log(error);
        }
    }
}
exports.default = PulseAudio;
//# sourceMappingURL=client.js.map