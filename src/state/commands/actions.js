import types from './types';

const updateCommands = commands => ({
  type: types.UPDATE_COMMANDS,
  commands
});

const updateSingleCommand = (id) => ({
  type: types.UPDATE_SINGLECOMMAND,
  id
});

const updateAddCommand = (name, content, cooldown) => ({
  type: types.UPDATE_ADDCOMMAND,
  name,
  content,
  cooldown
});

const updateEditCommand = (id, name, content, cooldown) => ({
  type: types.UPDATE_EDITCOMMAND,
  id,
  name,
  content,
  cooldown
});

const updateDelCommand = (id) => ({
  type: types.UPDATE_DELCOMMAND,
  id
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

const updateIsLoading = isLoading => ({
  type: types.UPDATE_IS_LOADING,
  isLoading
});

export default {
  updateCommands,
  updateSingleCommand,
  updateAddCommand,
  updateEditCommand,
  updateDelCommand,
  updateDisabled,
  updateIsLoading
};
