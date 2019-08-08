const getTwitchAccount = state => state.twitch;
const getTwitchAuthUri = state => state.twitch.twitchUri;
const getTwitchDisconnect = state => state.twitch.twitchDisconnect;
const isLoaded = state => state.twitchAccount.isLoaded;
const isDisabled = state => state.twitchAccount.isDisabled;
const isLoading = state => state.twitchAccount.isDisabled;

export default {
  getTwitchAccount,
  getTwitchAuthUri,
  getTwitchDisconnect,
  isLoaded,
  isDisabled,
  isLoading
};
