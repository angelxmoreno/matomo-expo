import Tracker, {TrackerArgs, UserInfo} from "../src/Tracker";

describe('Tracker', function () {
    const userInfo: UserInfo = {
        uid: 123
    }
    const trackerArgs: TrackerArgs = {
        siteId: 0,
        urlBase: 'https://matomo.example.com'
    }
    const tracker = new Tracker(trackerArgs);

    context('Sending requests', function () {
        it('sends an app start action', function(){
            tracker.trackAppStart();
        })
    })
})