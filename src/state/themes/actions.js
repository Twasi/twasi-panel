import types from './types';

const updateThemes = themes => ({
  type: types.UPDATE_THEMES,
  themes
});

const updateInstalledThemes = installedthemes => ({
  type: types.UPDATE_INSTALLEDTHEMES,
  installedthemes
});

const updateThemeResponse = themeresponse => ({
  type: types.UPDATE_THEMERESPONSE,
  themeresponse
});

const updateAddTheme = (name, themedata) => ({
  type: types.UPDATE_ADDTHEME,
  name,
  themedata
});

const updateActionInProgress = (id, isLoading) => ({
  type: types.UPDATE_ACTION_IN_PROGRESS,
  id,
  isLoading
});

const setInstalled = (id, isInstalled) => ({
  type: types.SET_INSTALLED,
  id,
  isInstalled
});

const updatePagination = pagination => ({
  type: types.UPDATE_PAGINATION,
  pagination
});

const updateLoading = isLoading => ({
  type: types.UPDATE_LOADING,
  isLoading
});

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateActionSuccess = isActionSuccess => ({
  type: types.UPDATE_ACTIONSUCCESS,
  isActionSuccess
});

export default {
  updateThemes,
  updateInstalledThemes,
  setInstalled,
  updateThemeResponse,
  updateAddTheme,
  updatePagination,
  updateLoading,
  updateLoaded,
  updateActionSuccess,
  updateActionInProgress
};
