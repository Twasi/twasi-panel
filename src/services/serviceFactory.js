import userInfo from './userInfo';

import botInfoService from './bot/infoService';

const serviceFactory = jwt => () => ({
  userInfo: userInfo(jwt),
  bot: {
    info: botInfoService(jwt)
  }
});

export default serviceFactory;
