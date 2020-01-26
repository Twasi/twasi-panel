import types from './types';

const updateSequences = sequences => ({
  type: types.UPDATE_SEQUENCES,
  sequences
});

const updateDelSequence = (id) => ({
  type: types.UPDATE_DELSEQUENCE,
  id
});

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

const updatePlaySequence = (id) => ({
  type: types.UPDATE_PLAYSEQUENCE,
  id
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

const updatePagination = pagination => ({
  type: types.UPDATE_PAGINATION,
  pagination
});

export default {
  updateSequences,
  updateDelSequence,
  updateCreateSequence,
  updatePlaySequence,
  updateSmartlifeAccount,
  updateSmartlifeAuthUri,
  updateSmartlifeScenes,
  updateTriggerSmartlifeScene,
  updateSmartlifeMaxSteps,
  updatePagination,
  updateDisabled,
  updateLoading,
  updateLoaded,
  updateActionSuccess
};
