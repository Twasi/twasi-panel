const getThemes = state => state.themes.themes;
const getMyThemes = state => state.themes.mythemes;
const getInstalledThemes = state => state.themes.installedthemes;
const getThemeResponse = state => state.themes.themeresponse;
const addTheme = state => state.themes.addTheme;
const getPagination = state => state.themes.pagination;
const isLoaded = state => state.themes.isLoaded;
const isLoading = state => state.themes.isLoading;
const isActionSuccess = state => state.themes.isActionSuccess;

export default {
  getThemes,
  getMyThemes,
  getInstalledThemes,
  addTheme,
  getThemeResponse,
  getPagination,
  isLoaded,
  isLoading,
  isActionSuccess
};
