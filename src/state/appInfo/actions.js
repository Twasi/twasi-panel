import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateConnected = isConnected => ({
  type: types.UPDATE_CONNECTED,
  isConnected
});

const updateVersion = version => ({
  type: types.UPDATE_SERVERVERSION,
  version
});

export default {
  updateLoaded,
  updateConnected,
  updateVersion
};
