import MockAdapter from 'axios-mock-adapter';
import Tracker, {TrackerArgs, UserInfo} from "../../src/Tracker";
import axios from "axios";
import NetInfo, { NetInfoStateType} from '@react-native-community/netinfo';

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

    jest
        .spyOn(NetInfo, 'fetch')
        .mockImplementation(async () => ({
            isConnected: true,
            type: NetInfoStateType.unknown,
            details: null,
            isInternetReachable: null
        }));

    const tracker = new Tracker({
        ...trackerArgs,
        client: axios
    });

    describe('Sending requests', function () {
        it('sends an app start action', async function () {
            const expectedParams = {
                action_name: "App / start"
            }
            const report = await tracker.trackAppStart();
            expect(report.didSend).toBeTruthy()
            expect(report.requestParams).toMatchObject(expectedParams);
            expect(report.response?.status).toBe(200)
        })
    })
})
