import {strictEqual} from 'assert';
import HashTable from "./index";

describe('HashTable', () => {
    it('should be possible to add objects to hash table', () => {
        const hashTable = new HashTable<any>();
        hashTable.set('objectKey', { prop1: 'a', prop2: 'b' });

        const object = hashTable.get('objectKey');
        strictEqual(object.prop1, 'a');
        strictEqual(object.prop2, 'b');
    });

    it('should delete objects from hash table by key', () => {
        const hashTable = new HashTable<string>();
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');
        hashTable.delete('key1');

        strictEqual(hashTable.has('key1'), false);
    });
});
