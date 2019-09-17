import {mergeSort} from './index';
import {deepStrictEqual} from 'assert';

describe('MergeSort', () => {
    it('should order and array of number in ascending order', () => {
        const array = [3, 2, 51, 5, 1, 12];
        deepStrictEqual(mergeSort(array), [1, 2, 3, 5, 12, 51]);
    });
});
