const getJwt = state => state.auth.jwt;
const getUser = state => state.auth.user;
const isLoading = state => state.auth.isLoading;

const isAuthenticated = state => state.auth.isAuthenticated;

const getUserAvatar = state => state.auth.userData.twitchAccount.avatar;
const getUserBanner = state => state.auth.userData.banner;

const isUserUpdating = state => state.auth.isUserUpdating;

export default {
  getJwt,
  getUser,
  isLoading,
  isAuthenticated,
  getUserAvatar,
  isUserUpdating,
  getUserBanner
};
