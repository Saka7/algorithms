export default class BloomFilter<T extends object|string> {
    public size: number;
    public storage: boolean[];

    constructor(size = 100) {
        this.size = size;
        this.storage = [];

        for (let storageCellIndex = 0; storageCellIndex < size; storageCellIndex++) {
            this.storage.push(false);
        }
    }

    insert(item: T) {
        const hashValues = this.getHashValues(item);
        hashValues.forEach(val => this.storage[val] = true);
    }

    mayContain(item: T): boolean {
        const hashValues = this.getHashValues(item);

        for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
            if (!this.storage[hashValues[hashIndex]]) {
                return false;
            }
        }

        return true;
    }

    hash1(item: T): number {
        let hash = 0;
        const itemStrValue = item.toString();

        for (let charIndex = 0; charIndex < itemStrValue.length; charIndex++) {
            const char = itemStrValue.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char;
            hash &= hash;
            hash = Math.abs(hash);
        }

        return hash % this.size;
    }

    hash2(item: T): number {
        let hash = 5381;
        const itemStrValue = item.toString();

        for (let charIndex = 0; charIndex < itemStrValue.length; charIndex++) {
            const char = itemStrValue.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char;
        }

        return Math.abs(hash % this.size);
    }

    hash3(item: T): number {
        let hash = 0;
        const itemStrValue = item.toString();

        for (let charIndex = 0; charIndex < itemStrValue.length; charIndex++) {
            const char = itemStrValue.charCodeAt(charIndex);
            hash = (hash << 5) - hash;
            hash += char;
            hash &= hash;
        }

        return Math.abs(hash % this.size);
    }

    getHashValues(item: T): [number, number, number] {
        return [
            this.hash1(item),
            this.hash2(item),
            this.hash3(item),
        ];
    }
}
