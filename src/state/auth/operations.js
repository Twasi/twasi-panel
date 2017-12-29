import jwtDecode from 'jwt-decode';

import actions from './actions';

const authenticate = jwt => dispatch => {
  const user = jwtDecode(jwt);

  dispatch(actions.updateJwt(jwt));
  dispatch(actions.updateUser(user));
  dispatch(actions.isLoading(false));
};

export default {
  authenticate
};
