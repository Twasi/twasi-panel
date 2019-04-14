import jwtDecode from 'jwt-decode';

import actions from './actions';

import { authSelectors } from '../auth';
import { getUserGraph } from '../../services/graphqlService';

const { updateUserData, updateIsUserUpdating } = actions;

const authenticate = jwt => dispatch => {
  const user = jwtDecode(jwt);

  dispatch(actions.updateJwt(jwt));
  dispatch(actions.updateUser(user));
  dispatch(actions.isLoading(false));
  dispatch(actions.isAuthenticated(true));
};

const updateUser = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  dispatch(updateIsUserUpdating(true));

  getUserGraph(
    'user { twitchAccount { update { name } } }',
    jwt
  ).then(data => {
    dispatch(updateIsUserUpdating(false));
  });
};

export default {
  authenticate,
  updateUserData,
  updateUser,
  updateIsAuthenticated: actions.isAuthenticated,
  updateIsLoading: actions.isLoading
};
