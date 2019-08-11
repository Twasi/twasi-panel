import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updatePlugins = plugins => ({
  type: types.UPDATE_PLUGINS,
  plugins
});

const updateActionInProgress = (id, isLoading) => ({
  type: types.UPDATE_ACTION_IN_PROGRESS,
  id,
  isLoading
});

const setInstalled = (id, isInstalled) => ({
  type: types.SET_INSTALLED,
  id,
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

const updateActionSuccess = isActionSuccess => ({
  type: types.UPDATE_ACTIONSUCCESS,
  isActionSuccess
});

export default {
  updateLoaded,
  updateLoading,
  updatePlugins,
  setInstalled,
  updateQuery,
  updateActionInProgress,
  updateActionSuccess
};
