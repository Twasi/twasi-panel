import types from './types';

const updateJwt = jwt => ({
  type: types.UPDATE_JWT,
  jwt
});

const updateUser = user => ({
  type: types.UPDATE_USER,
  user
});

const isLoading = loading => ({
  type: types.UPDATE_IS_LOADING,
  loading
});

export default {
  updateJwt,
  updateUser,
  isLoading
};
