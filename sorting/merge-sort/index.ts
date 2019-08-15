export const mergeSort = (array: number[]): number[] => {
    if (array.length <= 1) {
        return array;
    }

    const middleIndex = Math.floor(array.length / 2);
    const leftArray = array.slice(0, middleIndex);
    const rightArray = array.slice(middleIndex, array.length);

    const leftSortedArray = mergeSort(leftArray);
    const rightSortedArray = mergeSort(rightArray);

    return mergeSortedArrays(leftSortedArray, rightSortedArray);
};

const mergeSortedArrays = (leftArray: number[], rightArray: number[]): number[] => {
    let sortedArray: number[] = [];

    while (leftArray.length && rightArray.length) {
        let minimumElement: number | undefined;

        if (leftArray[0] < rightArray[0]) {
            minimumElement = leftArray.shift();
        } else {
            minimumElement = rightArray.shift();
        }

        sortedArray.push(minimumElement as number);
    }

    if (leftArray.length) {
        sortedArray = sortedArray.concat(leftArray);
    }

    if (rightArray.length) {
        sortedArray = sortedArray.concat(rightArray);
    }

    return sortedArray;
};
