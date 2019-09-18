import LinkedList from './linked-list';

export default class Stack<T> {
    public linkedList: LinkedList<T>;

    constructor() {
        this.linkedList = new LinkedList<T>();
    }

    isEmpty(): boolean {
        return !this.linkedList.head;
    }

    peek(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.head!.value;
    }

    push(value: T) {
        this.linkedList.prepend(value);
    }

    pop(): T | null {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    toArray(): T[] {
        return this.linkedList
            .toArray()
            .map(linkedListNode => linkedListNode.value);
    }

    toString(callback: (t: T) => string): string {
        return this.linkedList.toString(callback);
    }
}
