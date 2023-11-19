import MemoryQueueStorage from "../src/MemoryQueueStorage";
import {Entry} from "../src/QueueStorage";
import {expect} from "chai";

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
            expect(storage.collection.length).to.equal(0);
            storage.add(entry1)
            expect(storage.collection.length).to.equal(1);
            expect(storage.collection.pop()).to.deep.equal(entry1);
        });

        it('retrieves and removes entries from the queue', async function () {
            expect(storage.collection.length).to.equal(0);
            const entries = createEntries(setLimit + 1)
            const expectedEntries = entries.slice(setLimit * -1, setSize + 1);

            entries.forEach(entry => storage.add(entry))
            expect(storage.collection.length).to.equal(setLimit);

            const retrievedEntries = await storage.get();
            expect(retrievedEntries.length).to.equal(setSize);
            expect(storage.collection.length).to.equal(setLimit - setSize);
            expect(retrievedEntries).to.deep.equal(expectedEntries);
        });
    })
})