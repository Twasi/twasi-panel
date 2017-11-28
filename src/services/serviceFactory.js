import userInfo from './userInfo';

import botInfoService from './bot/infoService';

import userEventsService from './user/eventsService';

const serviceFactory = jwt => () => ({
  userInfo: userInfo(jwt),
  bot: {
    info: botInfoService(jwt)
  },
  user: {
    events: userEventsService(jwt)
  }
});

export default serviceFactory;
