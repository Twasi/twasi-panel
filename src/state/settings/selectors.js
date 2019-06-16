const isLoaded = state => state.settings.isLoaded;
const isDirty = state => state.settings.isDirty;

const getLanguage = state => state.settings.language;

const getRequest = state => ({
  language: getLanguage(state)
});

export default {
  isLoaded,
  isDirty,
  getLanguage,
  getRequest
};
