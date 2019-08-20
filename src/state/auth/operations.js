import jwtDecode from 'jwt-decode';

import actions from './actions';

import { getGraph } from '../../services/graphqlService';
import { appInfoOperations } from '../appInfo';

const { updateUserData, updateIsUserUpdating } = actions;

const updateUser = () => dispatch => {
  dispatch(updateIsUserUpdating(true));

  dispatch(getGraph('user{id,twitchAccount{update{name,avatar,email,twitchid,displayName}}}')).then(data => {
    // dispatch(updateUserData(data));
    // dispatch()
  }).finally(() => {
    dispatch(updateIsUserUpdating(false));
  });
};

const loadUser = () => dispatch => {
  dispatch(getGraph('user{id,twitchAccount{twitchid,name,avatar,email},banner}')).then(data => {
    dispatch(updateUserData(data.user));
    dispatch(appInfoOperations.loadVersion());
  });
};

const checkSetup = () => dispatch => {
  dispatch(getGraph('isSetUp', 'setup')).then(data => {
    dispatch(actions.updateIsSetUp(data.isSetUp));
  });
};

const authenticate = jwt => dispatch => {
  const user = jwtDecode(jwt);

  dispatch(actions.updateJwt(jwt));
  dispatch(actions.updateUser(user));
  dispatch(actions.isLoading(false));
  dispatch(actions.isAuthenticated(true));

  dispatch(loadUser());
};

export default {
  authenticate,
  updateUserData,
  updateUser,
  updateIsAuthenticated: actions.isAuthenticated,
  updateIsLoading: actions.isLoading,
  updateIsSetUp: actions.updateIsSetUp,
  loadUser,
  checkSetup
};
