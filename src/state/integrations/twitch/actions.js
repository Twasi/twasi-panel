import types from './types';

const updateTwitchAccount = twitch => ({
  type: types.UPDATE_TWITCHACCOUNT,
  twitch
});

const updateTwitchAuthUri = twitchUri => ({
  type: types.UPDATE_TWITCHAUTHURI,
  twitchUri
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

const updateIsLoading = isLoading => ({
  type: types.UPDATE_IS_LOADING,
  isLoading
});

export default {
  updateTwitchAccount,
  updateTwitchAuthUri,
  updateDisabled,
  updateIsLoading
};
