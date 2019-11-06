const getThemes = state => state.themes.themes;
const getThemeResponse = state => state.themes.themeresponse;
const addTheme = state => state.themes.addTheme;
const getPagination = state => state.themes.pagination;
const isLoaded = state => state.themes.isLoaded;
const isLoading = state => state.themes.isLoading;
const isActionSuccess = state => state.themes.isActionSuccess;

export default {
  getThemes,
  addTheme,
  getThemeResponse,
  getPagination,
  isLoaded,
  isLoading,
  isActionSuccess
};
