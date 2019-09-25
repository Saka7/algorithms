import LinkedList from "../graphs/linked-list";

export default class HashTable<V> {
    public buckets: LinkedList<{[key: string]: V}>[];
    public keys: {[key: string]: number};

    constructor(hashTableSize = 2048) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
        this.keys = {};
    }

    hash(key: string) {
        const hash = Array.from(key).reduce(
            (hashAccumulator: number, keySymbol: string) => (hashAccumulator + keySymbol.charCodeAt(0)),
            0,
        );

        return hash % this.buckets.length;
    }

    set(key: string, value: V) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key as any});

        if (!node) {
            bucketLinkedList.append({ key: key as any, value });
        } else {
            node.value.value = value;
        }
    }

    delete(key: string) {
        const keyHash = this.hash(key);
        delete this.keys[key];
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key as any});

        if (node) {
            return bucketLinkedList.delete(node.value);
        }

        return null;
    }

    get(key: string): V | undefined {
        const bucketLinkedList = this.buckets[this.hash(key)];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key as any});

        return node ? node.value.value : undefined;
    }

    has(key: string): boolean {
        return Object.hasOwnProperty.call(this.keys, key);
    }
}
