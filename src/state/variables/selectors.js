const getVariables = state => state.variablesState.variables.variables;
const isLoaded = state => state.variablesState.variables.isLoaded;
const isDisabled = state => state.variablesState.variables.isDisabled;

export default {
  getVariables,
  isLoaded,
  isDisabled
};
