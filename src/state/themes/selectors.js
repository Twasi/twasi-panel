const getThemes = state => state.themes.themes;
const getPagination = state => state.themes.pagination;
const isLoaded = state => state.commands.isLoaded;
const isLoading = state => state.commands.isLoading;
const isActionSuccess = state => state.commands.isActionSuccess;

export default {
  getThemes,
  getPagination,
  isLoaded,
  isLoading,
  isActionSuccess
};
