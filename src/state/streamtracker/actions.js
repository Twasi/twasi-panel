import types from './types';

const updateStreamtracker = streamtracker => ({
  type: types.UPDATE_STREAMTRACKER,
  streamtracker
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateStreamtracker,
  updateDisabled
};
