import types from './types';

const updateVariables = variables => ({
  type: types.UPDATE_VARIABLES,
  variables
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateVariables,
  updateDisabled
};
