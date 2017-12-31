const getStatus = state => state.statusState.status.status;
const getEvents = state => state.statusState.status.events;
const isLoaded = state => state.statusState.status.isLoaded;

const isStarting = state => state.statusState.status.isStarting;
const isStopping = state => state.statusState.status.isStopping;

export default {
  getStatus,
  getEvents,
  isLoaded,
  isStarting,
  isStopping
};
