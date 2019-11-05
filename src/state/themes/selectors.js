const getThemes = state => state.themes.themes;
const addTheme = state => state.themes.addTheme;
const getPagination = state => state.themes.pagination;
const isLoaded = state => state.commands.isLoaded;
const isLoading = state => state.commands.isLoading;
const isActionSuccess = state => state.commands.isActionSuccess;

export default {
  getThemes,
  addTheme,
  getPagination,
  isLoaded,
  isLoading,
  isActionSuccess
};
