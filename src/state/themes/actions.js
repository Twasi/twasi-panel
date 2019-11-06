import types from './types';

const updateThemes = themes => ({
  type: types.UPDATE_THEMES,
  themes
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
  updateThemeResponse,
  updateAddTheme,
  updatePagination,
  updateLoading,
  updateLoaded,
  updateActionSuccess
};
