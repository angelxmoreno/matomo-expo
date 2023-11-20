import MemoryQueueStorage from "../../src/MemoryQueueStorage";
import {Entry} from "../../src/QueueStorage";

const createEntries = (numEntries: number = 1): Entry[] => {
    const entries: Entry[] = []
    for (let i = 0; i < numEntries; i++) {
        entries.push({
            prop1: 'value' + i,
            prop2: i,
        })
    }

    return entries;
}
describe('MemoryQueueStorage', function () {
    let storage: MemoryQueueStorage;
    const setSize = 2;
    const setLimit = setSize * 2;

    beforeEach(function () {
        storage = new MemoryQueueStorage({setSize, setLimit});
    });

    describe('implements `QueueStorage`', function () {
        it('adds an entry to the queue', function () {
            const entry1 = createEntries(1)[0];
            expect(storage.collection.length).toBe(0);
            storage.add(entry1)
            expect(storage.collection.length).toBe(1);
            expect(storage.collection.pop()).toBe(entry1);
        });

        it('retrieves and removes entries from the queue', async function () {
            expect(storage.collection.length).toBe(0);
            const entries = createEntries(setLimit + 1)
            const expectedEntries = entries.slice(setLimit * -1, setSize + 1);

            entries.forEach(entry => storage.add(entry))
            expect(storage.collection.length).toBe(setLimit);

            const retrievedEntries = await storage.get();
            expect(retrievedEntries.length).toBe(setSize);
            expect(storage.collection.length).toBe(setLimit - setSize);
            expect(retrievedEntries).toMatchObject(expectedEntries);
        });
    })
})
