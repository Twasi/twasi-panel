import types from './types';

export const initialState = {
  themes: [],
  installedthemes: [],
  pagination: [],
  isDisabled: false,
  isLoading: true,
  isLoaded: false,
  isActionSuccess: false,
  name: '',
  themedata: {},
  themeresponse: [],
  installTheme: '',
  uninstallTheme: '',
  id: ''
};

const themesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_THEMES: {
      return { ...state, themes: action.themes };
    }
    case types.UPDATE_APPROVE: {
      return { ...state, id: action.id };
    }
    case types.UPDATE_INSTALLEDTHEMES: {
      return { ...state, installedthemes: action.installedthemes };
    }
    case types.UPDATE_THEMERESPONSE: {
      return { ...state, themeresponse: action.themeresponse };
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

    case types.SET_INSTALLED: {
      const newThemes = state.themes.map(theme => {
        if (theme.id === action.id) {
          return {
            ...theme,
            installed: action.installed
          };
        }
        return theme;
      });

      return {
        ...state,
        themes: newThemes
      };
    }

    case types.UPDATE_ACTION_IN_PROGRESS: {
      const newThemes = state.themes.map(theme => {
        if (theme.id === action.id) {
          return {
            ...theme,
            actionInProgress: action.isLoading
          };
        }
        return theme;
      });
      return {
        ...state,
        themes: newThemes
      };
    }

    default:
      return state;
  }
};

export default themesReducer;
