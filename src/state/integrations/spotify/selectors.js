const getSpotifyAccount = state => state.spotify;
const isLoaded = state => state.spotifyAccount.isLoaded;
const isDisabled = state => state.spotifyAccount.isDisabled;
const isLoading = state => state.spotifyAccount.isDisabled;

export default {
  getSpotifyAccount,
  isLoaded,
  isDisabled,
  isLoading
};
