import {LinkedListNode} from "../../../src/ds/linked-list/linked-list";
import LinkedList from "../../../src/ds/linked-list/linked-list";

export default class LinkedListExtended<T> extends LinkedList<T> {
    removeNthFromEnd(n: number): LinkedListNode<T | null> | null {
        const tempHead = new LinkedListNode(null, this.head);
        let slowPointer: LinkedListNode<T | null> | null = tempHead;
        let fastPointer: LinkedListNode<T | null> | null = tempHead;

        for (let i = 0; i <= n + 1; i++) {
            if (!fastPointer) break;
            fastPointer = fastPointer!.next;
        }

        while(fastPointer !== null) {
            slowPointer = slowPointer!.next;
            fastPointer = fastPointer.next;
        }

        slowPointer!.next = slowPointer!.next!.next;

        return tempHead.next;
    };
}

