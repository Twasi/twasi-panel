import storage from 'local-storage';

import actions from './actions';

import { authSelectors } from '../auth';
import { getGraph } from '../../services/graphqlService';

const { updateLoaded, updateConnected, updateVersion, updateUserStatus, updateTheme, updateBannerAsHeader, addNotification } = actions;

const loadTheme = () => dispatch => {
  const themeInStorage = storage('twasi-theme');

  if (themeInStorage !== null) {
    dispatch(updateTheme(themeInStorage));
  }
};

const loadBannerAsHeader = () => dispatch => {
  const bannerAsHeaderInStorage = storage('bannerAsHeader');

  if (bannerAsHeaderInStorage !== null) {
    dispatch(updateBannerAsHeader(bannerAsHeaderInStorage));
  }
};

const loadUserStatus = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  if (jwt === null) {
    return;
  }

  dispatch(getGraph('userStatus{status}')).then(data => dispatch(updateUserStatus(data.userStatus.status)));
};

const loadVersion = () => dispatch => {
  dispatch(getGraph('appInfo{version}')).then(data => {
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
  loadVersion,
  loadTheme,
  loadBannerAsHeader,
  updateTheme,
  updateBannerAsHeader,
  addNotification
};
