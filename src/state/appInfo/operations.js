import actions from './actions';

import { authSelectors } from '../auth';
import { getUserGraph } from '../../services/graphqlService';

const { updateLoaded, updateConnected, updateVersion, updateUserStatus } = actions;

const loadUserStatus = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  if (jwt === null) {
    return;
  }

  getUserGraph('userStatus{status}', jwt).then(data => dispatch(updateUserStatus(data.userStatus.status)));
};

const loadVersion = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  if (jwt === null) {
    return;
  }

  getUserGraph('appInfo{version}', jwt).then(data => {
    dispatch(updateVersion(data.appInfo.version));
    dispatch(updateConnected(true));
    dispatch(updateLoaded(true));
  });
};

export default {
  updateLoaded,
  updateConnected,
  updateVersion,
  loadUserStatus,
  loadVersion
};
