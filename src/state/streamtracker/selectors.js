const getStreamtracker = state => state.streamtracker.streamtracker;
const getGlobalStreamtracker = state => state.streamtracker.globalstreamtracker;
const getUsers = state => state.streamtracker.users;
const getAllStreams = state => state.streamtracker.allstreams;
const getStreamById = state => state.streamtracker.streamId;
const isLoaded = state => state.streamtracker.isLoaded;
const isLoading = state => state.streamtracker.isLoading;
const noStreamData = state => state.streamtracker.noStreamData;
const isGlobalLoading = state => state.streamtracker.isGlobalLoading;
const isDisabled = state => state.streamtracker.isDisabled;

export default {
  getStreamtracker,
  getGlobalStreamtracker,
  getUsers,
  getAllStreams,
  getStreamById,
  isLoaded,
  isLoading,
  noStreamData,
  isGlobalLoading,
  isDisabled
};
