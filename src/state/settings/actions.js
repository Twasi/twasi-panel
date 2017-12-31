import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateDirty = isDirty => ({
  type: types.UPDATE_DIRTY,
  isDirty
});

const updateLanguage = language => ({
  type: types.UPDATE_LANGUAGE,
  language
});

export default { updateLoaded, updateDirty, updateLanguage };
