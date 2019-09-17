import {deepStrictEqual} from 'assert';
import {quickSort} from "./index";

describe('QuickSort', function () {
    it('should sort an array in ascending order', () => {
        const array = [1, 5, 2, 3, 10, 22];
        deepStrictEqual([1, 2, 3, 5, 10, 22], quickSort(array));
    });
});
