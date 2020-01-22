const getSmartlifeAccount = state => state.smartlife;
const getSmartlifeAuthUri = state => state.smartlife.smartlifeUri;
const getSmartlifeScenes = state => state.smartlife.smartlifeScenes;
const getSmartlifeDisconnect = state => state.smartlife.smartlifeDisconnect;
const isLoaded = state => state.smartlifeAccount.isLoaded;
const isDisabled = state => state.smartlifeAccount.isDisabled;
const isLoading = state => state.smartlifeAccount.isDisabled;

export default {
  getSmartlifeAccount,
  getSmartlifeAuthUri,
  getSmartlifeScenes,
  getSmartlifeDisconnect,
  isLoaded,
  isDisabled,
  isLoading
};
