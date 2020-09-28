export const bubbleSort = (array: number[]): number[] => {
    let anyChangesBeenMade = false;

    do {
        anyChangesBeenMade = false;
        for(let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i+1]) {
                [array[i], array[i+1]] = [array[i+1], array[i]];
                anyChangesBeenMade = true;
            }
        }
    } while (anyChangesBeenMade);

    return array;
};
