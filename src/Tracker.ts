import QueueStorage, {Entry} from "./QueueStorage";
import MemoryQueueStorage from "./MemoryQueueStorage";
import {AxiosRequestConfig} from "axios";

export interface UserInfo {
    uid?: string | number;
    lang?: string;
}

export interface TrackerArgs {
    siteId: string | number;
    urlBase: string;
    userInfo?: UserInfo;
    storage?: QueueStorage;
}

export default class Tracker {
    protected siteId: string | number;
    protected urlBase: string;
    protected userInfo: UserInfo = {};
    protected storage: QueueStorage;

    constructor({siteId, urlBase, userInfo, storage}: TrackerArgs) {
        this.siteId = siteId;
        this.urlBase = urlBase;
        this.storage = storage || new MemoryQueueStorage({setSize: 20, setLimit: 100})
        this.userInfo = {
            ...this.userInfo,
            ...userInfo,
        }
    }

    protected getLocalTime(): { h: number, m: number, s: number, cdt: number } {
        const time = new Date();
        return {
            h: time.getHours(),
            m: time.getMinutes(),
            s: time.getSeconds(),
            cdt: time.getTime()
        }
    }

    protected async isOnline(): Promise<boolean> {
        return true;
    }

    protected async buildRequest(params: Record<string, string>) {
        const requestParams = {
            ...params,
            idsite: this.siteId,
            rec: 1,
            apiv: 1,
            ...this.getLocalTime(),
            send_image: 0
        }

        this.storage.add(requestParams);

        if (await this.isOnline()) {
            const requests = await this.storage.get()
            await this.sendBulkRequests(requests);
        }
    }

    protected async sendBulkRequests(requestParams: Entry[]): Promise<void> {
        const requests = requestParams
            .map(entry => new URLSearchParams(entry as Record<string, string>))
            .map(searchParam => searchParam.toString());

        const axiosRequest: AxiosRequestConfig = {
            baseURL: this.urlBase,
            url: '/matomo/php',
            method: 'POST',
            data: {}
        }
    }

    trackAppStart() {
        return this.buildRequest({action_name: 'App / start'});
    }
}