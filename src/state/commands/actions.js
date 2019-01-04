import types from './types';

const updateCommands = commands => ({
  type: types.UPDATE_COMMANDS,
  commands
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateCommands,
  updateDisabled
};
