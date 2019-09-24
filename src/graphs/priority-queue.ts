import Heap from "./heap";

export default class PriorityQueue<T> extends Heap<T> {
    public priorities: Map<T, number>;

    constructor() {
        super();
        this.priorities = new Map();
    }

    add(item: T, priority: number | null | undefined = 0): PriorityQueue<T> {
        this.priorities.set(item, priority!);
        super.add(item);
        return this;
    }

    remove(item: T): PriorityQueue<T> {
        super.remove(item);
        this.priorities.delete(item);
        return this;
    }

    changePriority(item: T, priority: number): PriorityQueue<T> {
        this.remove(item);
        this.add(item, priority);
        return this;
    }

    findByValue(item: T): number[] {
        return this.find(item);
    }

    hasValue(item: T): boolean {
        return this.findByValue(item).length > 0;
    }
}
