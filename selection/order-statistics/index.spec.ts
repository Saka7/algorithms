import {deepStrictEqual} from 'assert';
import {orderStatistics} from "./index";

describe('OrderStatistics', function () {
    it('Find largest element in sorted array', () => {
        const array = [1, 5, 2, 3, 10, 22];
        const k = 1;
        deepStrictEqual(22, orderStatistics(array, k));
    });

    it('Find smallest element in sorted array', () => {
        const array = [1, 5, 2, 3, 10, 22];
        const k = array.length;
        deepStrictEqual(1, orderStatistics(array, k));
    });

    it('Find k-th largest element in sorted array', () => {
        const array = [1, 5, 2, 3, 10, 22];
        const k = 2;
        deepStrictEqual(10, orderStatistics(array, k));
    });
});
