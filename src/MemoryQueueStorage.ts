import QueueStorage, {Entry} from "./QueueStorage";

const DEFAULT_SET_SIZE = 20;
const DEFAULT_SET_LIMIT = 20;

type MemoryQueueStorageParams = {
    setSize?: number;
    setLimit?: number;
}
export default class MemoryQueueStorage implements QueueStorage {
    setSize: number;
    setLimit: number;
    collection: Entry[] = [];

    constructor(params:MemoryQueueStorageParams) {
        this.setSize = params.setSize || DEFAULT_SET_SIZE;
        this.setLimit = params.setLimit || DEFAULT_SET_LIMIT;
    }

    add(entry: Entry): void | Promise<void> {
        this.collection.push(entry)
        this.collection = this.collection.slice(this.setLimit * -1)
    }

    get(): Entry[] | Promise<Entry[]> {
        const set = this.collection.slice(0, this.setSize);
        this.collection = this.collection.slice(this.setSize)
        return set;
    }

}