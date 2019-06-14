import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateLoaded,
  updatePlugins,
  setInstalled,
  updateLoading,
  updateActionInProgress
} = actions;

const loadData = () => dispatch => {
  dispatch(updateLoading(true));

  dispatch(getGraph('plugins { isInstalled, name, author, version, description, commands, permissions, id }')).then(data => {
    dispatch(
      updatePlugins(
        data.plugins.map(p => ({ ...p, actionInProgress: false }))
      )
    );
    dispatch(updateLoading(false));
    dispatch(updateLoaded(true));
  });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadData());
  }
};

const installPlugin = id => dispatch => {
  dispatch(updateActionInProgress(id, true));
  sleep(getRndInteger(500, 1000)).then(() => {

    dispatch(getGraph(`user { installPlugin(name:"${id}") { isInstalled } }`)).then(data => {
      dispatch(
        setInstalled(id, data.user.installPlugin.isInstalled)
      );
      dispatch(updateActionInProgress(id, false));
    });
  });
};

const uninstallPlugin = id => dispatch => {
  dispatch(updateActionInProgress(id, true));
  sleep(getRndInteger(500, 1000)).then(() => {

    dispatch(getGraph(`user { uninstallPlugin(name:"${id}") { isInstalled } }`)).then(data => {
      dispatch(
        setInstalled(id, data.user.uninstallPlugin.isInstalled)
      );
      dispatch(updateActionInProgress(id, false));
    });
  });
};

/* const updateQuery = debounce(
  name => dispatch => {
    dispatch(actions.updateQuery(name));
    plugins.get(0, name).then(data => {
      dispatch(updatePlugins(data.plugins));
    });
  },
  1000
); */

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
