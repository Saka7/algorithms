import {deepStrictEqual} from 'assert';
import {bubbleSort} from "./index";

describe('BubbleSort', function () {
    it('should sort an array in ascending order', () => {
        const array = [1, 5, 2, 3, 10, 22];
        deepStrictEqual([1, 2, 3, 5, 10, 22], bubbleSort(array));
    });
});
