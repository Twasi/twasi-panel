import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateStatus = status => ({
  type: types.UPDATE_STATUS,
  status
});

const updateEvents = events => ({
  type: types.UPDATE_EVENTS,
  events
});

const updateBotLanguage = languageCode => ({
  type: types.UPDATE_BOTLANGUAGE,
  languageCode
});

const updateStarting = starting => ({
  type: types.UPDATE_STARTING,
  starting
});

const updateStopping = stopping => ({
  type: types.UPDATE_STOPPING,
  stopping
});

export default {
  updateLoaded,
  updateStatus,
  updateEvents,
  updateBotLanguage,
  updateStarting,
  updateStopping
};
