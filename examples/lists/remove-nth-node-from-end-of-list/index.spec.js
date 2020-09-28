"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const assert_1 = require("assert");
describe('Remove nth node from end of list', () => {
    it('should return list: 1 -> 2 -> 4 -> 5 -> null', () => {
        const list = new index_1.default([1, 2, 3, 4, 5]);
        list.removeNthFromEnd(2);
        const expected = [1, 2, 4, 5];
        const actual = list.toArray();
        assert_1.deepStrictEqual(actual, expected);
    });
    it('should not delete any elements if it is out of range', () => {
        const list = new index_1.default([1, 2, 3, 4, 5]);
        list.removeNthFromEnd(5);
        const expected = [1, 2, 3, 4, 5];
        const actual = list.toArray();
        assert_1.deepStrictEqual(actual, expected);
    });
});
