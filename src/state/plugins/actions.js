import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updatePlugins = plugins => ({
  type: types.UPDATE_PLUGINS,
  plugins
});

export default {
  updateLoaded,
  updatePlugins
};
