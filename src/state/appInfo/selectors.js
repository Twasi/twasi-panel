const isLoaded = state => state.appInfoState.appInfo.isLoaded;
const getVersion = state => state.appInfoState.appInfo.serverVersion;

export default {
  isLoaded,
  getVersion
};
