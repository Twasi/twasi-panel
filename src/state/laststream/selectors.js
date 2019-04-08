const getLaststream = state => state.laststreamState.laststream.laststream;
const isLoaded = state => state.laststreamState.laststream.isLoaded;
const isDisabled = state => state.laststreamState.laststream.isDisabled;

export default {
  getLaststream,
  isLoaded,
  isDisabled
};
