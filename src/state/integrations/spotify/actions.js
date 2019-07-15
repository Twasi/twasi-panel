import types from './types';

const updateSpotifyAccount = spotify => ({
  type: types.UPDATE_SPOTIFYACCOUNT,
  spotify
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
  updateSpotifyAccount,
  updateDisabled,
  updateIsLoading
};
