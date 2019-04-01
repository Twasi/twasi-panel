import actions from './actions';
import selectors from './selectors';

import { authSelectors } from '../auth';

import { getUserGraph } from '../../services/graphqlService';

const {
  updateLoaded,
  updatePlugins,
  setInstalled,
  updateLoading,
  updateActionInProgress
} = actions;

const loadData = () => (dispatch, getState) => {
  dispatch(updateLoading(true));
  /* plugins.get().then(data => {
    dispatch(updatePlugins(data.plugins));
    dispatch(updateLoading(false));
  }); */
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph(
    'plugins { isInstalled, name, author, version, description, commands, permissions }',
    jwt
  ).then(data => {
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

const installPlugin = name => (dispatch, getState) => {
  dispatch(updateActionInProgress(name, true));
  sleep(getRndInteger(1500, 2500)).then(() => {
    const state = getState();
    const jwt = authSelectors.getJwt(state);

    getUserGraph(
      `user { installPlugin(name:"${name}") { isInstalled } }`,
      jwt
    ).then(data => {
      dispatch(
        setInstalled(name, data.user.installPlugin.isInstalled)
      );
      dispatch(updateActionInProgress(name, false));
    });
    /* plugins
      .post({
        action: 'INSTALL',
        pluginName: name
      })
      .then(() => {
        dispatch(setInstalled(name, true));
      }); */
  })
};

const uninstallPlugin = name => (dispatch, getState) => {
  dispatch(updateActionInProgress(name, true));
  sleep(getRndInteger(1500, 2500)).then(() => {
    const state = getState();
    const jwt = authSelectors.getJwt(state);

    getUserGraph(
      `user { uninstallPlugin(name:"${name}") { isInstalled } }`,
      jwt
    ).then(data => {
      dispatch(
        setInstalled(name, data.user.uninstallPlugin.isInstalled)
      );
      dispatch(updateActionInProgress(name, false));
    });
    /* plugins
      .post({
        action: 'UNINSTALL',
        pluginName: name
      })
      .then(() => {
        dispatch(setInstalled(name, false));
      }); */
  })
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
  return Math.floor(Math.random() * (max - min + 1) ) + min;
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
