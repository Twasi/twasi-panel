import types from './types';

const updateTimer = timer => ({
  type: types.UPDATE_TIMER,
  timer
});

const updateAddTimer = (command, interval) => ({
  type: types.UPDATE_ADDTIMER,
  command,
  interval
});

const updateDelTimer = (command) => ({
  type: types.UPDATE_DELTIMER,
  command
});

const updateEnableTimer = (command, enabled) => ({
  type: types.UPDATE_ENABLETIMER,
  command,
  enabled
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

const updateLoading = isLoading => ({
  type: types.UPDATE_LOADING,
  isLoading
});

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateActionSuccess = isActionSuccess => ({
  type: types.UPDATE_ACTIONSUCCESS,
  isActionSuccess
});

export default {
  updateTimer,
  updateAddTimer,
  updateDelTimer,
  updateEnableTimer,
  updateDisabled,
  updateLoading,
  updateLoaded,
  updateActionSuccess
};
