import types from './types';

const updateThemes = themes => ({
  type: types.UPDATE_THEMES,
  themes
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
  updatePagination,
  updateLoading,
  updateLoaded,
  updateActionSuccess
};
