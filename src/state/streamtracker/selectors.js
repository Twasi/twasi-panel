const getLastStream = state => state.streamtrackerState.laststream.laststream;
const getAllStreamData = state => state.streamtrackerState.allstreamdata.allstreamdata;
const isLoaded = state => state.streamtrackerState.laststream.isLoaded;
const isDisabled = state => state.streamtrackerState.laststream.isDisabled;

export default {
  getLastStream,
  getAllStreamData,
  isLoaded,
  isDisabled
};
