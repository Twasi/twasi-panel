import types from './types';

const updateSmartlifeAccount = smartlife => ({
  type: types.UPDATE_SMARTLIFEACCOUNT,
  smartlife
});

const updateSmartlifeAuthUri = smartlifeUri => ({
  type: types.UPDATE_SMARTLIFEAUTHURI,
  smartlifeUri
});

const updateSmartlifeScenes = smartlifeScenes => ({
  type: types.UPDATE_SMARTLIFESCENES,
  smartlifeScenes
});

const updateTriggerSmartlifeScene = (homeId, sceneId) => ({
  type: types.UPDATE_TRIGGERSMARTLIFESCENE,
  homeId,
  sceneId
});

const updateCreateSequence = (sequenceInput) => ({
  type: types.UPDATE_CREATESEQUENCE,
  sequenceInput
});

const updateSmartlifeMaxSteps = smartlifeMaxSteps => ({
  type: types.UPDATE_SMARTLIFEMAXSTEPS,
  smartlifeMaxSteps
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

const updateLoading = isLoading => ({
  type: types.UPDATE_LOADING,
  isLoading
});

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateActionSuccess = isActionSuccess => ({
  type: types.UPDATE_ACTIONSUCCESS,
  isActionSuccess
});

export default {
  updateCreateSequence,
  updateSmartlifeAccount,
  updateSmartlifeAuthUri,
  updateSmartlifeScenes,
  updateTriggerSmartlifeScene,
  updateSmartlifeMaxSteps,
  updateDisabled,
  updateLoading,
  updateLoaded,
  updateActionSuccess
};
