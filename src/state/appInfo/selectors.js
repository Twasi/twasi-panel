const isLoaded = state => state.appInfo.isLoaded;
const getVersion = state => state.appInfo.serverVersion;
const getUserStatus = state => state.appInfo.userStatus;
const getTheme = state => state.appInfo.theme;
const getNotifications = state => state.appInfo.notifications;

export default {
  isLoaded,
  getVersion,
  getUserStatus,
  getTheme,
  getNotifications
};
