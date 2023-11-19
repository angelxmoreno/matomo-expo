import Tracker from "./Tracker";
import Constants from 'expo-constants';
import {Dimensions} from 'react-native';
import * as Crypto from "expo-crypto";
export default class TrackerEnhanced extends Tracker {

    protected getScreenResolution(): string {
        const window = Dimensions.get('window');
        return `${window.width}x${window.height}`
    }

    protected async getRandomValue(): Promise<string> {
        const bytes = Crypto.getRandomBytes(8);
        const values = Crypto.getRandomValues(bytes)

        return [...values]
            .map(n => n.toString(16))
            .join('')
    }

    protected async buildRequest(params: Record<string, string>) {
        const enhancedParams:Record<string, any> = {
            ...params,
            _id: Constants.sessionId,
            res: this.getScreenResolution(),
            ua: await Constants.getWebViewUserAgentAsync(),
            rand: await this.getRandomValue(),
        }
        await super.buildRequest(enhancedParams);
    }
}