import * as assert from 'assert';

import {selectionSort} from "./index";

describe('selectionSort', () => {
    it('should return sorted array', () => {
        const array = [4, 2, 1, 51, 5];
        assert.deepStrictEqual(selectionSort(array), [1, 2, 4, 5, 51]);
    });

    it('should return sorted array in descending order', () => {
        const array = [4, 2, 1, 51, 5];
        assert.deepStrictEqual(selectionSort(array, true), [51, 5, 4, 2, 1]);
    });
});
