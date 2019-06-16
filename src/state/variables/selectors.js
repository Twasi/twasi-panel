const getVariables = state => state.variables.variables;
const isLoaded = state => state.variables.isLoaded;
const isDisabled = state => state.variables.isDisabled;

export default {
  getVariables,
  isLoaded,
  isDisabled
};
