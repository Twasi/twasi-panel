import types from './types';

const updateLaststream = laststream => ({
  type: types.UPDATE_LASTSTREAM,
  laststream
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateLaststream,
  updateDisabled
};
