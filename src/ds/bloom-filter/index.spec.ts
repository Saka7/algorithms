import {strictEqual} from 'assert';
import BloomFilter from "./index";

describe('BloomFilter', () => {
    let bloomFilter: BloomFilter<string>;

    const people = [
        'Arya Stark',
        'John Snow',
        'Tyrion Lannister',
    ];

    beforeEach(() => {
        bloomFilter = new BloomFilter<string>();
    });

    it('should insert strings correctly and return true when checking for inserted values', () => {
        people.forEach(person => bloomFilter.insert(person));
        strictEqual(bloomFilter.mayContain('Arya Stark'), true);
        strictEqual(bloomFilter.mayContain('John Snow'), true);
        strictEqual(bloomFilter.mayContain('Tyrion Lannister'), true);
        strictEqual(bloomFilter.mayContain('Daenerys Targaryen'), false);
    });
});
