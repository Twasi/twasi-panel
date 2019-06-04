import actions from './actions';

import { authSelectors, authOperations } from '../auth';
import { appInfoOperations } from '../appInfo';
import { getUserGraph } from '../../services/graphqlService';

const { updateImpersonating } = actions;

const impersonateUser = userName => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  if (jwt === null) {
    return;
  }

  getUserGraph(`admin{impersonate(twitchname: "${userName}")}`, jwt).then(
    data => {
      // dispatch(updateImpersonating(userName, data.admin.impersonate))
      dispatch({ type: 'RESET', jwt: data.admin.impersonate });
      dispatch(authOperations.authenticate(data.admin.impersonate));

      window.originalJwt = jwt;

      getUserGraph('user{id,twitchAccount{twitchid,name,avatar,email}}', data.admin.impersonate).then(data => {
        dispatch(authOperations.updateUserData(data.user));
      });
    }
  );
};

const resetImpersonation = () => (dispatch, getState) => {
  dispatch({ type: 'RESET', jwt: window.originalJwt });
  dispatch(authOperations.authenticate(window.originalJwt));

  getUserGraph('user{id,twitchAccount{twitchid,name,avatar,email}}', window.originalJwt).then(data => {
    dispatch(authOperations.updateUserData(data.user));
    dispatch(appInfoOperations.loadUserStatus());
  });

  window.originalJwt = null;
};

export default {
  impersonateUser,
  resetImpersonation
};
