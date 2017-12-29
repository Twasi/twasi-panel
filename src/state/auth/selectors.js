const getJwt = state => state.authState.auth.jwt;
const getUser = state => state.authState.auth.user;
const isLoading = state => state.authState.auth.isLoading;

const isAuthenticated = state => state.authState.auth.user !== null;

export default {
  getJwt,
  getUser,
  isLoading,
  isAuthenticated
};
