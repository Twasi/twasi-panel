const getSmartlifeAccount = state => state.smartlife;
const getSmartlifeAuthUri = state => state.smartlife.smartlifeUri;
const getSmartlifeDisconnect = state => state.smartlife.smartlifeDisconnect;
const isLoaded = state => state.smartlifeAccount.isLoaded;
const isDisabled = state => state.smartlifeAccount.isDisabled;
const isLoading = state => state.smartlifeAccount.isDisabled;

export default {
  getSmartlifeAccount,
  getSmartlifeAuthUri,
  getSmartlifeDisconnect,
  isLoaded,
  isDisabled,
  isLoading
};
