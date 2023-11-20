import Tracker, {TrackerArgs, UserInfo} from "../../src/Tracker";
import {expect} from "chai";
import MemoryQueueStorage from "../../src/MemoryQueueStorage";

describe('Integration#Tracker', function () {
    const userInfo: UserInfo = {
        uid: 1415,
        lang: 'en-US',
        ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        res: '375x812',
    }

    const trackerArgs: TrackerArgs = {
        siteId: 1,
        urlBase: 'http://localhost:8080/',
        userInfo,
        storage: new MemoryQueueStorage({setSize: 5, setLimit: 10})
    }

    const tracker = new Tracker({
        ...trackerArgs,
    });

    context('Sending requests', function () {
        it('sends an app start action', async function () {
            const expectedParams = {
                action_name: "App / start"
            }
            const report = await tracker.trackAppStart();
            expect(report.didSend).to.be.true;
            expect(report.requestParams).to.contain(expectedParams);
            expect(report.response?.status).to.equal(200)
            console.log({
                headers: report.response?.headers,
                data: report.response?.data,
                status: report.response?.status,
            })
        })
    })
})
