const getUtilities = state => state.utilities.utilities;
const isLoaded = state => state.utilities.isLoaded;
const isDisabled = state => state.utilities.isDisabled;

export default {
  getUtilities,
  isLoaded,
  isDisabled
};
