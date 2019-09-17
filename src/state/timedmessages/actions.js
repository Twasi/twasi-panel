import types from './types';

const updateTimer = timer => ({
  type: types.UPDATE_TIMER,
  timer
});

const updateAddTimer = (command, interval, enabled) => ({
  type: types.UPDATE_ADDTIMER,
  command,
  interval,
  enabled
});

const updateDelTimer = (command) => ({
  type: types.UPDATE_DELTIMER,
  command
});

const updateEditTimer = (command, enabled, newCommand, newInterval) => ({
  type: types.UPDATE_EDITTIMER,
  command,
  enabled,
  newCommand,
  newInterval
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
  updateEditTimer,
  updateEnableTimer,
  updateDisabled,
  updateLoading,
  updateLoaded,
  updateActionSuccess
};
