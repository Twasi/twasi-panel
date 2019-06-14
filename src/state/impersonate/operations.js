import { authSelectors, authOperations } from '../auth';
import { appInfoOperations } from "../appInfo";
import { getGraph, getRawGraph } from '../../services/graphqlService';

const impersonateUser = userName => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  if (jwt === null) {
    return;
  }

  dispatch(getGraph(`admin{impersonate(twitchname: "${userName}")}`)).then(
    data => {
      // dispatch(updateImpersonating(userName, data.admin.impersonate))
      dispatch({ type: 'RESET', jwt: data.admin.impersonate });
      dispatch(authOperations.authenticate(data.admin.impersonate));

      window.originalJwt = jwt;

      getRawGraph('query{panel(token:"' + data.admin.impersonate + '"){user{id,twitchAccount{twitchid,name,avatar,email}}}}', data.admin.impersonate).then(data => {
        dispatch(authOperations.updateUserData(data.data.panel.user));
      });
    }
  );
};

const resetImpersonation = () => dispatch => {
  dispatch({ type: 'RESET', jwt: window.originalJwt });
  dispatch(authOperations.authenticate(window.originalJwt));

  getRawGraph('query{panel(token:"' + window.originalJwt + '"){user{id,twitchAccount{twitchid,name,avatar,email}}}}').then(data => {
    dispatch(authOperations.updateUserData(data.data.panel.user));
    dispatch(appInfoOperations.loadUserStatus());
  });

  window.originalJwt = null;
};

export default {
  impersonateUser,
  resetImpersonation
};
