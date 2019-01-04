const isLoaded = state => state.appInfoState.appInfo.isLoaded;
const getVersion = state => state.appInfoState.appInfo.serverVersion;
const getUserStatus = state => state.appInfoState.appInfo.userStatus;
const getTheme = state => state.appInfoState.appInfo.theme;

export default {
  isLoaded,
  getVersion,
  getUserStatus,
  getTheme
};
