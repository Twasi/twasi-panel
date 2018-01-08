import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updatePlugins = plugins => ({
  type: types.UPDATE_PLUGINS,
  plugins
});

const setInstalled = (name, isInstalled) => ({
  type: types.SET_INSTALLED,
  name,
  isInstalled
});

export default {
  updateLoaded,
  updatePlugins,
  setInstalled
};
