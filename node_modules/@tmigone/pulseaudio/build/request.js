"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PARequest {
    constructor(_id, _query) {
        this.timeout = 3500;
        this.id = _id;
        this.query = _query;
        this.promise = Promise.race([
            new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            }),
            new Promise((_resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('PARequest timed out.'));
                }, this.timeout);
            })
        ]);
    }
}
exports.default = PARequest;
//# sourceMappingURL=request.js.map