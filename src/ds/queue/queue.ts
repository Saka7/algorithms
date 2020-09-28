import LinkedList from '../linked-list/linked-list';

export default class Queue<T> {
    public linkedList: LinkedList<T>;

    constructor() {
        this.linkedList = new LinkedList<T>();
    }

    isEmpty(): boolean {
        return !this.linkedList.head;
    }

    peek(): T | null {
        if (!this.linkedList.head) {
            return null;
        }

        return this.linkedList.head.value;
    }

    enqueue(value: T) {
        this.linkedList.append(value);
    }

    dequeue(): T | null {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    toString(callback: (t: T) => string): string {
        return this.linkedList.toString(callback);
    }
}
