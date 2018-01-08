import actions from './actions';
import selectors from './selectors';

import plugins from '../../services/plugins/plugins.service';

const { updateLoaded, updatePlugins, setInstalled } = actions;

const loadData = () => dispatch => {
  plugins.get().then(data => {
    dispatch(updatePlugins(data.plugins));
  });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadData());
  }
};

const installPlugin = name => dispatch => {
  plugins
    .post({
      action: 'INSTALL',
      pluginName: name
    })
    .then(() => {
      dispatch(setInstalled(name, true));
    });
};

const uninstallPlugin = name => dispatch => {
  plugins
    .post({
      action: 'UNINSTALL',
      pluginName: name
    })
    .then(() => {
      dispatch(setInstalled(name, false));
    });
};

export default {
  verifyData,
  loadData,
  updateLoaded,
  updatePlugins,
  installPlugin,
  uninstallPlugin
};
