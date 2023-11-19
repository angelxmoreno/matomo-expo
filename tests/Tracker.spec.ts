import MockAdapter from 'axios-mock-adapter';
import Tracker, {TrackerArgs, UserInfo} from "../src/Tracker";
import axios from "axios";
import {expect} from "chai";

describe('Tracker', function () {
    let stub: MockAdapter;

    const userInfo: UserInfo = {
        uid: 123
    }

    const trackerArgs: TrackerArgs = {
        siteId: 0,
        urlBase: 'https://matomo.example.com'
    }
    stub = new MockAdapter(axios);

    stub.onAny().reply((config) => {
        return [
            200,
            {
                config
            }
        ]
    });

    const tracker = new Tracker({
        ...trackerArgs,
        client: axios
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
        })
    })
})