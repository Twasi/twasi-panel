import types from './types';

const updateUtilities = utilities => ({
  type: types.UPDATE_UTILITIES,
  utilities
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateUtilities,
  updateDisabled
};
