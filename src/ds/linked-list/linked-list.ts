export class LinkedListNode<T> {
    public value: T;
    public next: LinkedListNode<T> | null;

    constructor(value: T, next: LinkedListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback: (t: T) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}

export default class LinkedList<T> {
    public head: LinkedListNode<T> | null;
    public tail: LinkedListNode<T> | null;

    constructor(values: T[]) {
        this.head = null;
        this.tail = null;

        if (values.length) {
            this.appendAll(values);
        }
    }

    append(value: T) {
        const newNode = new LinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail!.next = newNode;
        this.tail = newNode;

        return this;
    }

    appendAll(values: T[]): LinkedList<T>{
        values.forEach(v => this.append(v));
        return this;
    }

    prepend(value: T): LinkedList<T> {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    prependAll(values: T[]): LinkedList<T> {
        values.forEach(this.prepend);
        return this;
    }

    delete(value: T) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;

        while (this.head && this.head.value === value) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        if (this.tail!.value === value) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    find({value = undefined, callback = undefined}: {
        value?: T,
        callback?: (t: T) => any
    }): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        let currentNode: LinkedListNode<T> | null = this.head;

        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    deleteTail() {
        const deletedTail = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        let currentNode = this.head;
        while (currentNode!.next) {
            if (!currentNode!.next.next) {
                currentNode!.next = null;
            } else {
                currentNode = currentNode!.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    toNodesArray(): LinkedListNode<T>[] {
        const nodes: LinkedListNode<T>[] = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toArray(): T[] {
        const values: Array<T> = [];

        let currentNode = this.head;
        while (currentNode) {
            values.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return values;
    }

    toString(callback: (t: T) => string): string {
        return this.toNodesArray().map(node => node.toString(callback)).toString();
    }
}
