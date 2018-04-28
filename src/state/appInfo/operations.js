import actions from './actions';

import { authSelectors } from '../auth';
import { getUserGraph } from '../../services/graphqlService';

const { updateLoaded, updateConnected, updateVersion, updateUserStatus } = actions;

const loadUserStatus = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('userStatus{status}', jwt).then(data => dispatch(updateUserStatus(data.data.viewer.userStatus.status)));
};

const loadVersion = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('appInfo{version}', jwt).then(data => {
    dispatch(updateVersion(data.data.viewer.appInfo.version));
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
