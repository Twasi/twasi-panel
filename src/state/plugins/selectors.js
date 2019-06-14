const isLoaded = state => state.plugins.isLoaded;
const isLoading = state => state.plugins.isLoading;
const getPlugins = state => state.plugins.plugins;

export default {
  isLoaded,
  isLoading,
  getPlugins
};
