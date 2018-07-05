import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updatePlugins = plugins => ({
  type: types.UPDATE_PLUGINS,
  plugins
});

const updateActionInProgress = (pluginName, isLoading) => ({
  type: types.UPDATE_ACTION_IN_PROGRESS,
  pluginName,
  isLoading
});

const setInstalled = (name, isInstalled) => ({
  type: types.SET_INSTALLED,
  name,
  isInstalled
});

const updateLoading = isLoading => ({
  type: types.UPDATE_LOADING,
  isLoading
});

const updateQuery = query => ({
  type: types.UPDATE_QUERY,
  query
});

export default {
  updateLoaded,
  updateLoading,
  updatePlugins,
  setInstalled,
  updateQuery,
  updateActionInProgress
};
