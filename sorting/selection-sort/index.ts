export const selectionSort = (array: number[], desc = false): number[] => {
    for(let i = 0; i < array.length; i++) {
        let val = i;

        for (let j = i + 1; j < array.length; j++) {
            if (desc ? array[j] > array[val] : array[j] < array[val]) {
                val = j;
            }
        }
        const temp = array[i];
        array[i] = array[val];
        array[val] = temp;
    }

    return array;
};
