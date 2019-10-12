const getStatus = state => state.status.status;
const getEvents = state => state.status.events;
const getBotLanguage = state => state.status.languageCode;
const isLoaded = state => state.status.isLoaded;

const isStarting = state => state.status.isStarting;
const isStopping = state => state.status.isStopping;

export default {
  getStatus,
  getEvents,
  getBotLanguage,
  isLoaded,
  isStarting,
  isStopping
};
