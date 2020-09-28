"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_1 = require("../../../src/ds/linked-list/linked-list");
const linked_list_2 = require("../../../src/ds/linked-list/linked-list");
class LinkedListExtended extends linked_list_2.default {
    removeNthFromEnd(n) {
        const tempHead = new linked_list_1.LinkedListNode(null, this.head);
        let slowPointer = tempHead;
        let fastPointer = tempHead;
        for (let i = 0; i <= n + 1; i++) {
            if (!fastPointer)
                break;
            fastPointer = fastPointer.next;
        }
        while (fastPointer !== null) {
            slowPointer = slowPointer.next;
            fastPointer = fastPointer.next;
        }
        slowPointer.next = slowPointer.next.next;
        return tempHead.next;
    }
    ;
}
exports.default = LinkedListExtended;
