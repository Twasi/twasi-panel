import userInfo from './userInfo';

import versionInfoService from './versionInfoService';

import botInfoService from './bot/infoService';
import botStopService from './bot/stopService';
import botStartService from './bot/startService';

import userEventsService from './user/eventsService';

import pluginsGetService from './plugins/getService';

const serviceFactory = jwt => () => ({
  userInfo: userInfo(jwt),
  versionInfo: versionInfoService(jwt),
  bot: {
    info: botInfoService(jwt),
    stop: botStopService(jwt),
    start: botStartService(jwt)
  },
  user: {
    events: userEventsService(jwt)
  },
  plugins: {
    get: pluginsGetService(jwt)
  }
});

export default serviceFactory;
