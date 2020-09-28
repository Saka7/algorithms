export default class Heap<T> {
    public heapContainer: T[];
    public type: 'min' | 'max' = 'min';

    constructor() {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }

        this.heapContainer = [];
    }

    getLeftChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 1;
    }

    getRightChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 2;
    }

    getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    hasParent(childIndex: number): boolean {
        return this.getParentIndex(childIndex) >= 0;
    }

    hasLeftChild(parentIndex: number): boolean {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    hasRightChild(parentIndex: number): boolean {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    leftChild(parentIndex: number): T {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    rightChild(parentIndex: number): T {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    parent(childIndex: number): T {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    swap(indexOne: number, indexTwo: number) {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    peek(): T | null {
        if (this.heapContainer.length === 0) {
            return null;
        }

        return this.heapContainer[0];
    }

    poll(): T | null | undefined {
        if (this.heapContainer.length === 0) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];

        this.heapContainer[0] = this.heapContainer.pop() as T;
        this.bubbleDown();

        return item;
    }

    add(item: T): Heap<T> {
        this.heapContainer.push(item);
        this.bubbleUp();
        return this;
    }

    remove(item: T): Heap<T> {
        const numberOfItemsToRemove = this.find(item).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
            const indexToRemove = this.find(item).pop() as number;
            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop();
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop() as T;
                const parentItem = this.parent(indexToRemove);
                if (
                    this.hasLeftChild(indexToRemove)
                    && (
                        !parentItem
                        || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
                    )
                ) {
                    this.bubbleUp(indexToRemove);
                } else {
                    this.bubbleDown(indexToRemove);
                }
            }
        }
        return this;
    }

    find(item: T): number[] {
        const foundItemIndices = [];

        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
            if (this.type === 'min' ? item < this.heapContainer[itemIndex] : item >= this.heapContainer[itemIndex]) {
                foundItemIndices.push(itemIndex);
            }
        }

        return foundItemIndices;
    }

    isEmpty(): boolean {
        return !this.heapContainer.length;
    }

    toString(): string {
        return this.heapContainer.toString();
    }

    bubbleUp(customStartIndex?: number) {
        let currentIndex = customStartIndex || this.heapContainer.length - 1;

        while (
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
            ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    bubbleDown(customStartIndex = 0) {
        let currentIndex = customStartIndex;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex)
                && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex],
            )) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean {
        return this.type === 'min' ? firstElement > secondElement : secondElement > firstElement;
    }
}
