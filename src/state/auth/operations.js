import jwtDecode from 'jwt-decode';

import actions from './actions';

import { getGraph } from '../../services/graphqlService';

const { updateUserData, updateIsUserUpdating } = actions;

const authenticate = jwt => dispatch => {
  const user = jwtDecode(jwt);

  dispatch(actions.updateJwt(jwt));
  dispatch(actions.updateUser(user));
  dispatch(actions.isLoading(false));
  dispatch(actions.isAuthenticated(true));
};

const updateUser = () => dispatch => {
  dispatch(updateIsUserUpdating(true));

  dispatch(getGraph('user { twitchAccount { update { name } } }')).then(data => {
    // dispatch(updateUserData(data));
    // dispatch()
  }).finally(() => {
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
