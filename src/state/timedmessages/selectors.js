const getTimer = state => state.timedmessages.timer;
const isLoaded = state => state.timedmessages.isLoaded;
const isDisabled = state => state.timedmessages.isDisabled;
const isLoading = state => state.timedmessages.isLoading;
const isActionSuccess = state => state.timedmessages.isActionSuccess;

export default {
  getTimer,
  isLoaded,
  isDisabled,
  isLoading,
  isActionSuccess
};
