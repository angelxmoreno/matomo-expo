export type Entry = Record<string, string | number | boolean | null>
export default interface QueueStorage {
    setSize: number;
    add: (entry: Entry) => void | Promise<void>;
    get: () => Entry[] | Promise<Entry[]>;
}