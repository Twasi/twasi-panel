import types from './types';

export const initialState = {
  themes: [],
  pagination: [],
  isDisabled: false,
  isLoading: true,
  isLoaded: false,
  isActionSuccess: false,
  name: '',
  themedata: {}
};

const themesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_THEMES: {
      return { ...state, isLoaded: true, isDisabled: false, themes: action.themes };
    }
    case types.UPDATE_ADDTHEME: {
      return { ...state, isLoaded: true, name: action.name, themedata: action.themedata };
    }
    case types.UPDATE_PAGINATION: {
      return { ...state, pagination: action.pagination };
    }
    case types.UPDATE_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }
    case types.UPDATE_ACTIONSUCCESS: {
      return { ...state, isActionSuccess: action.isActionSuccess };
    }
    default:
      return state;
  }
};

export default themesReducer;
