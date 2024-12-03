export interface Iterator<T> extends IterableIterator<T> {
    nextValue: () => any;
    done: boolean;
    length: number;
    index: number;
}
export declare function createIterator(array: any[]): Iterator<any>;
