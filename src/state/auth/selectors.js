const getJwt = state => state.authState.auth.jwt;
const getUser = state => state.authState.auth.user;
const isLoading = state => state.authState.auth.isLoading;

const isAuthenticated = state => state.authState.auth.isAuthenticated;

const getUserAvatar = state => state.authState.auth.userData.twitchAccount.avatar;

export default {
  getJwt,
  getUser,
  isLoading,
  isAuthenticated,
  getUserAvatar
};
