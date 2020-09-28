import {insertionSort} from "./index";
import * as assert from 'assert';

describe('InsertionSort', () => {
    it('should order and array of number in ascending order', () => {
        const array = [3, 2, 51, 5, 1, 12];
        assert.deepStrictEqual(insertionSort(array), [1, 2, 3, 5, 12, 51]);
    });

    it('should order and array of number in descending order', () => {
        const array = [3, 2, 51, 5, 1, 12];
        assert.deepStrictEqual(insertionSort(array, true), [51, 12, 5, 3, 2, 1]);
    });
});
