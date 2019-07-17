export const insertionSort = (array: number[], desc = false): number[] => {
    for (let j = 1; j < array.length; j++) {
        let key = array[j];
        let i = j - 1;

        while(i >= 0 && (desc ? array[i] < key : array[i] > key)) {
            array[i + 1] = array[i];
            i--;
        }
        array[i + 1] = key;
    }

    return array;
};
