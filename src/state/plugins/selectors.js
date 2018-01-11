const isLoaded = state => state.pluginsState.plugins.isLoaded;
const isLoading = state => state.pluginsState.plugins.isLoading;
const getPlugins = state => state.pluginsState.plugins.plugins;

export default {
  isLoaded,
  isLoading,
  getPlugins
};
