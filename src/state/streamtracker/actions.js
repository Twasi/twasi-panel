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

export default {
  updateStreamtracker,
  updateGlobalStreamtracker,
  updateDisabled
};
