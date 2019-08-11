const isLoaded = state => state.plugins.isLoaded;
const isLoading = state => state.plugins.isLoading;
const getPlugins = state => state.plugins.plugins;
const isActionSuccess = state => state.plugins.isActionSuccess;

export default {
  isLoaded,
  isLoading,
  getPlugins,
  isActionSuccess
};
