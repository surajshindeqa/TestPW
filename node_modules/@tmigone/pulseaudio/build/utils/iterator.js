"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIterator = void 0;
function createIterator(array) {
    const iterator = array[Symbol.iterator]();
    return {
        ...iterator,
        nextValue: function () {
            if (this.done === true) {
                throw new Error('Iterator depleted!');
            }
            if (++this.index === this.length)
                this.done = true;
            return iterator.next().value;
        },
        done: false,
        index: 0,
        length: array.length
    };
}
exports.createIterator = createIterator;
//# sourceMappingURL=iterator.js.map