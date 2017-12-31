const isLoaded = state => state.settingsState.settings.isLoaded;
const isDirty = state => state.settingsState.settings.isDirty;

const getLanguage = state => state.settingsState.settings.language;

export default {
  isLoaded,
  isDirty,
  getLanguage
};

