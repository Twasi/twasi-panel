import jwtDecode from 'jwt-decode';

import actions from './actions';

const { updateUserData } = actions;

const authenticate = jwt => dispatch => {
  const user = jwtDecode(jwt);

  dispatch(actions.updateJwt(jwt));
  dispatch(actions.updateUser(user));
  dispatch(actions.isLoading(false));
  dispatch(actions.isAuthenticated(true));
};

const reloadData = () => (dispatch, getState) => {

};

export default {
  authenticate,
  updateUserData,
  updateIsAuthenticated: actions.isAuthenticated,
  updateIsLoading: actions.isLoading
};
