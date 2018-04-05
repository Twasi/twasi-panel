import debounce from 'lodash/debounce';

import actions from './actions';
import selectors from './selectors';

const { updateLoaded, updatePlugins, setInstalled, updateLoading } = actions;

const loadData = () => dispatch => {
  dispatch(updateLoading(true));
  /* plugins.get().then(data => {
    dispatch(updatePlugins(data.plugins));
    dispatch(updateLoading(false));
  }); */
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadData());
  }
};

const installPlugin = name => dispatch => {
  /* plugins
    .post({
      action: 'INSTALL',
      pluginName: name
    })
    .then(() => {
      dispatch(setInstalled(name, true));
    }); */
};

const uninstallPlugin = name => dispatch => {
  /* plugins
    .post({
      action: 'UNINSTALL',
      pluginName: name
    })
    .then(() => {
      dispatch(setInstalled(name, false));
    }); */
};

/* const updateQuery = debounce(
  name => dispatch => {
    dispatch(actions.updateQuery(name));
    plugins.get(0, name).then(data => {
      dispatch(updatePlugins(data.plugins));
    });
  },
  1000
);*/

const updateQuery = () => {};

export default {
  verifyData,
  loadData,
  updateLoaded,
  updatePlugins,
  installPlugin,
  uninstallPlugin,
  updateQuery
};
