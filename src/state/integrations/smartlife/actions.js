import types from './types';

const updateSmartlifeAccount = smartlife => ({
  type: types.UPDATE_SMARTLIFEACCOUNT,
  smartlife
});

const updateSmartlifeAuthUri = smartlifeUri => ({
  type: types.UPDATE_SMARTLIFEAUTHURI,
  smartlifeUri
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

const updateIsLoading = isLoading => ({
  type: types.UPDATE_IS_LOADING,
  isLoading
});

export default {
  updateSmartlifeAccount,
  updateSmartlifeAuthUri,
  updateDisabled,
  updateIsLoading
};
