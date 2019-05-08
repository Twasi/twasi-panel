const getUtilities = state => state.utilitiesState.utilities.utilities;
const isLoaded = state => state.utilitiesState.utilities.isLoaded;
const isDisabled = state => state.utilitiesState.utilities.isDisabled;

export default {
  getUtilities,
  isLoaded,
  isDisabled
};
