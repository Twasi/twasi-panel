import types from './types';

const updateLastStream = laststream => ({
  type: types.UPDATE_LASTSTREAM,
  laststream
});

const updateAllStreamData = allstreamdata => ({
  type: types.UPDATE_ALLSTREAMDATA,
  allstreamdata
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateLastStream,
  updateAllStreamData,
  updateDisabled
};
