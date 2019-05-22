import types from './types';

const updateLanguage = language => ({
  type: types.UPDATE_LANGUAGE,
  language
});

export default {
  updateLanguage
};
