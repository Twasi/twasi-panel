const getSequences = state => state.smartlife.sequences;
const getSmartlifeAccount = state => state.smartlife;
const getPagination = state => state.smartlife.pagination;
const getSmartlifeAuthUri = state => state.smartlife.smartlifeUri;
const getSmartlifeScenes = state => state.smartlife.smartlifeScenes;
const getSmartlifeMaxSteps = state => state.smartlife.smartlifeMaxSteps;
const getSmartlifeDisconnect = state => state.smartlife.smartlifeDisconnect;
const isLoaded = state => state.smartlife.isLoaded;
const isDisabled = state => state.smartlife.isDisabled;
const isLoading = state => state.smartlife.isLoading;
const isActionSuccess = state => state.smartlife.isActionSuccess;

export default {
  getSequences,
  getSmartlifeAccount,
  getSmartlifeAuthUri,
  getSmartlifeScenes,
  getSmartlifeMaxSteps,
  getSmartlifeDisconnect,
  getPagination,
  isLoaded,
  isDisabled,
  isLoading,
  isActionSuccess
};
