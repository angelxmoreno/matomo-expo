import QueueStorage, {Entry} from "./QueueStorage";
import MemoryQueueStorage from "./MemoryQueueStorage";
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError} from "axios";

export interface UserInfo {
    uid?: string | number;
    lang?: string;
    ua?:string;
    res?:string;
}

export interface TrackerArgs {
    siteId: string | number;
    urlBase: string;
    userInfo?: UserInfo;
    storage?: QueueStorage;
    client?: AxiosInstance;
}

export interface BuildRequestReport {
    requestParams: Record<string, any>,
    didSend: boolean,
    response: undefined | AxiosResponse
}

export default class Tracker {
    protected siteId: string | number;
    protected urlBase: string;
    protected userInfo: UserInfo = {};
    protected storage: QueueStorage;
    client: AxiosInstance;

    constructor({siteId, urlBase, userInfo, storage, client}: TrackerArgs) {
        this.siteId = siteId;
        this.urlBase = urlBase;
        this.storage = storage || new MemoryQueueStorage({setSize: 20, setLimit: 100})
        this.userInfo = {
            ...this.userInfo,
            ...userInfo,
        }

        this.client = client || axios.create()
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

    protected async buildRequest(params: Record<string, string>): Promise<BuildRequestReport> {
        const requestParams = {
            ...this.userInfo,
            ...params,
            idsite: this.siteId,
            rec: 1,
            apiv: 1,
            ...this.getLocalTime(),
            send_image: 0,
            debug:1,
        }

        this.storage.add(requestParams);
        const report: BuildRequestReport = {
            requestParams,
            didSend: false,
            response: undefined
        }
        if (await this.isOnline()) {
            const requests = await this.storage.get()
            report.didSend = true;
            report.response = await this.sendBulkRequests(requests);
        }
        return report;
    }

    protected async sendBulkRequests(requestParams: Entry[]): Promise<AxiosResponse | undefined> {
        const requests = requestParams
            .map(entry => new URLSearchParams(entry as Record<string, string>))
            .map(searchParam => searchParam.toString())
            .map(searchString => '?' + searchString);

        console.log({requests})
        const axiosRequest: AxiosRequestConfig = {
            baseURL: this.urlBase,
            url: '/matomo.php',
            method: 'POST',
            data: {requests}
        }

        try {
            return this.client.request(axiosRequest)
        } catch (e) {
            if (isAxiosError(e)) {
                const error: AxiosError = e;
                console.log('error.response?.data', error.response?.data)
            } else {
                console.log('e.message', (e as Error).message)

            }
        }
    }

    trackAppStart() {
        return this.buildRequest({action_name: 'App / start'});
    }
}