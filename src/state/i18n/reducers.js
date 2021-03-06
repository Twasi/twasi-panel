import types from './types';

export const initialState = {
  language: 'DE_DE'
};

const i18nReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LANGUAGE: {
      return { ...state, language: action.language };
    }

    case types.UPDATE_TRANSLATIONS: {
      return { ...state, translations: action.translations };
    }

    default:
      return state;
  }
};

export default i18nReducer;
