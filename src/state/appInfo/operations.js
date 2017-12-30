import actions from './actions';
import selectors from './selectors';
import versionInfo from '../../services/versionInfo.service';

const { updateLoaded, updateConnected, updateVersion } = actions;

const loadData = () => dispatch => {
  versionInfo.get().then(data => {
    dispatch(updateVersion(data.version));
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
  updateConnected,
  updateVersion
};
