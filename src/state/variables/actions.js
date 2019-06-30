import types from './types';

const updateVariables = variables => ({
  type: types.UPDATE_VARIABLES,
  variables
});

const updateAddVariable = (name, output) => ({
  type: types.UPDATE_ADDVARIABLE,
  name,
  output
});

const updateEditVariable = (id, name, output) => ({
  type: types.UPDATE_EDITVARIABLE,
  id,
  name,
  output
});

const updateRemoveVariable = id => ({
  type: types.UPDATE_REMOVEVARIABLE,
  id
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateVariables,
  updateAddVariable,
  updateEditVariable,
  updateRemoveVariable,
  updateDisabled
};
