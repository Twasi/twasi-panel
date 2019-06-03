const getStreamtracker = state => state.streamtrackerState.streamtracker.streamtracker;
const getGlobalStreamtracker = state => state.streamtrackerState.globalstreamtracker.globalstreamtracker;
const isLoaded = state => state.streamtrackerState.streamtracker.isLoaded;
const isDisabled = state => state.streamtrackerState.streamtracker.isDisabled;

export default {
  getStreamtracker,
  getGlobalStreamtracker,
  isLoaded,
  isDisabled
};
