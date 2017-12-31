import actions from './actions';
import selectors from './selectors';

import plugins from '../../services/plugins/plugins.service';

const { updateLoaded, updatePlugins } = actions;

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

export default {
  verifyData,
  loadData,
  updateLoaded,
  updatePlugins
};
