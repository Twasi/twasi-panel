import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateLoaded,
  updatePlugins,
  updatePagination,
  setInstalled,
  updateLoading,
  updateActionInProgress,
  updateActionSuccess
} = actions;

const loadData = (page) => dispatch => {
  dispatch(updateLoading(true));

  dispatch(getGraph(`availablePlugins{content(page: ${page}){isInstalled,name,author,version,description,commands,permissions,id,installations,banner},itemsPerPage,total,pages}`)).then(data => {
    dispatch(
      updatePlugins(
        data.availablePlugins.content.map(p => ({ ...p, actionInProgress: false }))
      )
    );
    dispatch(updatePagination(data.availablePlugins));
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
  dispatch(updateActionSuccess(false));
  sleep(getRndInteger(500, 1000)).then(() => {

    dispatch(getGraph(`user { installPlugin(name:"${id}") { isInstalled } }`)).then(data => {
      dispatch(
        setInstalled(id, data.user.installPlugin.isInstalled)
      );
      dispatch(updateActionInProgress(id, false));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
  });
};

const uninstallPlugin = id => dispatch => {
  dispatch(updateActionInProgress(id, true));
  dispatch(updateActionSuccess(false));
  sleep(getRndInteger(500, 1000)).then(() => {

    dispatch(getGraph(`user { uninstallPlugin(name:"${id}") { isInstalled } }`)).then(data => {
      dispatch(
        setInstalled(id, data.user.uninstallPlugin.isInstalled)
      );
      dispatch(updateActionInProgress(id, false));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
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
  updatePagination,
  installPlugin,
  uninstallPlugin,
  updateQuery,
  updateActionSuccess
};
