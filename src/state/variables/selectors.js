const getVariables = state => state.variables.variables;
const isLoaded = state => state.variables.isLoaded;
const isLoading = state => state.variables.isLoading;
const isDisabled = state => state.variables.isDisabled;
const isActionSuccess = state => state.variables.isActionSuccess;

export default {
  getVariables,
  isLoaded,
  isDisabled,
  isLoading,
  isActionSuccess
};
