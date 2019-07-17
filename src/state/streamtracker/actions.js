import types from './types';

const updateStreamtracker = streamtracker => ({
  type: types.UPDATE_STREAMTRACKER,
  streamtracker
});

const updateGlobalStreamtracker = globalstreamtracker => ({
  type: types.UPDATE_GLOBALSTREAMTRACKER,
  globalstreamtracker
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateLoading = isLoading => ({
  type: types.UPDATE_LOADING,
  isLoading
});

export default {
  updateStreamtracker,
  updateGlobalStreamtracker,
  updateDisabled,
  updateLoaded,
  updateLoading,
};
