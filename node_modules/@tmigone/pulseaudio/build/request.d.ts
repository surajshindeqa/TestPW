import PAPacket from './packet';
export default class PARequest {
    id: number;
    query: PAPacket;
    reply: PAPacket;
    timeout: number;
    promise: Promise<any>;
    resolve: (value?: any) => any;
    reject: (value?: any) => any;
    constructor(_id: number, _query: PAPacket);
}
