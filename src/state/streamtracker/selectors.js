const getStreamtracker = state => state.streamtrackerState.streamtracker.streamtracker;
const isLoaded = state => state.streamtrackerState.streamtracker.isLoaded;
const isDisabled = state => state.streamtrackerState.streamtracker.isDisabled;

export default {
  getStreamtracker,
  isLoaded,
  isDisabled
};
