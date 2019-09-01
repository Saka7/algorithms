export const quickSort = (
    array: number[],
    inputLowIndex = 0,
    inputHighIndex = array.length - 1,
    recursiveCall = false
): number[] => {
    const arr = recursiveCall ? array : [...array];

    if (inputLowIndex < inputHighIndex) {
        const partitionIndex = partition(arr, inputLowIndex, inputHighIndex);
        const RECURSIVE_CALL = true;
        quickSort(arr, inputLowIndex, partitionIndex - 1, RECURSIVE_CALL);
        quickSort(arr, partitionIndex + 1, inputHighIndex, RECURSIVE_CALL);
    }

    return arr;
};

const partition = (array: number[], lowIndex: number, highIndex: number) => {
    const pivot = array[highIndex];
    let partitionIndex = lowIndex;
    for (let currentIndex = lowIndex; currentIndex < highIndex; currentIndex++) {
        if (array[currentIndex] <= pivot) {
            [array[partitionIndex], array[currentIndex]] = [array[currentIndex], array[partitionIndex]];
            partitionIndex++;
        }
    }

    [array[partitionIndex], array[highIndex]] = [array[highIndex], array[partitionIndex]];
    return partitionIndex;
};
