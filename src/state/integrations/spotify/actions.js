import types from './types';

const updateSpotifyAccount = spotify => ({
  type: types.UPDATE_SPOTIFYACCOUNT,
  spotify
});

const updateSpotifyAuthUri = spotifyUri => ({
  type: types.UPDATE_SPOTIFYAUTHURI,
  spotifyUri
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
  updateSpotifyAuthUri,
  updateDisabled,
  updateIsLoading
};
