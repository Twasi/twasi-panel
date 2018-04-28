const isLoaded = state => state.appInfoState.appInfo.isLoaded;
const getVersion = state => state.appInfoState.appInfo.serverVersion;
const getUserStatus = state => state.appInfoState.appInfo.userStatus;

export default {
  isLoaded,
  getVersion,
  getUserStatus
};
