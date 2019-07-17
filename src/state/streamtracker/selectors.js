const getStreamtracker = state => state.streamtracker.streamtracker;
const getGlobalStreamtracker = state => state.streamtracker.globalstreamtracker;
const isLoaded = state => state.streamtracker.isLoaded;
const isLoading = state => state.streamtracker.isLoading;
const isDisabled = state => state.streamtracker.isDisabled;

export default {
  getStreamtracker,
  getGlobalStreamtracker,
  isLoaded,
  isLoading,
  isDisabled
};
