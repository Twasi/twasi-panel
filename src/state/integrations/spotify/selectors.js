const getSpotifyAccount = state => state.spotify;
const getSpotifyAuthUri = state => state.spotify.spotifyUri;
const getSpotifyDisconnect = state => state.spotify.spotifyDisconnect;
const isLoaded = state => state.spotifyAccount.isLoaded;
const isDisabled = state => state.spotifyAccount.isDisabled;
const isLoading = state => state.spotifyAccount.isDisabled;

export default {
  getSpotifyAccount,
  getSpotifyAuthUri,
  getSpotifyDisconnect,
  isLoaded,
  isDisabled,
  isLoading
};
