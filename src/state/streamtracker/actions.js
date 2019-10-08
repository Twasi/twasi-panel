import types from './types';

const updateStreamtracker = streamtracker => ({
  type: types.UPDATE_STREAMTRACKER,
  streamtracker
});

const updateGlobalStreamtracker = globalstreamtracker => ({
  type: types.UPDATE_GLOBALSTREAMTRACKER,
  globalstreamtracker
});

const updateUsers = users => ({
  type: types.UPDATE_USERS,
  users
});

const updateAllStreams = allstreams => ({
  type: types.UPDATE_ALLSTREAMS,
  allstreams
});

const updateStreamById = streamId => ({
  type: types.UPDATE_STREAMBYID,
  streamId
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

const updateNoStreamData = noStreamData => ({
  type: types.UPDATE_NOSTREAMDATA,
  noStreamData
});

const updateGlobalLoading = isGlobalLoading => ({
  type: types.UPDATE_GLOBALLOADING,
  isGlobalLoading
});

const updateStreamByIDLoading = isStreamByIDLoading => ({
  type: types.UPDATE_STREAMBYIDLOADING,
  isStreamByIDLoading
});

export default {
  updateStreamtracker,
  updateGlobalStreamtracker,
  updateUsers,
  updateAllStreams,
  updateStreamById,
  updateDisabled,
  updateLoaded,
  updateLoading,
  updateNoStreamData,
  updateGlobalLoading,
  updateStreamByIDLoading
};
