export const orderStatistics = (array: number[], k: number): number => {
    const n = array.length;
    let left = 0;
    let right = n - 1;

    while (left <= right) {
        const choosenPivotIndex = Math.floor(Math.random() * (right - left)) + left;
        const finalIndexOfChoosenPivot = partition(array, left, right, choosenPivotIndex);

        if (finalIndexOfChoosenPivot == n - k) {
            return array[finalIndexOfChoosenPivot];
        } else if (finalIndexOfChoosenPivot > n - k) {
            right = finalIndexOfChoosenPivot - 1;
        } else {
            left = finalIndexOfChoosenPivot + 1;
        }
    }

    return -1;
};

const partition = (array: number[], left: number, right: number, pivotIndex: number): number => {
    const pivotValue = array[pivotIndex];
    let lesserItemsTailIndex = left;
    [array[pivotIndex], array[right]] = [array[right], array[pivotIndex]];

    for (let i = left; i < right; i++) {
        if (array[i] < pivotValue) {
            [array[i], array[lesserItemsTailIndex]] = [array[lesserItemsTailIndex], array[i]];
            lesserItemsTailIndex++;
        }
    }

    [array[right], array[lesserItemsTailIndex]] = [array[lesserItemsTailIndex], array[right]];

    return lesserItemsTailIndex;
};
