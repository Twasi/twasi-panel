import types from './types';

export const initialState = {
  isLoaded: false,
  isLoading: true,
  isActionSuccess: false,
  plugins: [],
  filter: {
    query: ''
  }
};

const pluginsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }

    case types.UPDATE_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }

    case types.UPDATE_PLUGINS: {
      return {
        ...state,
        plugins: action.plugins
      };
    }

    case types.UPDATE_QUERY: {
      return {
        ...state,
        filter: {
          ...state.filter,
          query: action.query
        }
      };
    }

    case types.SET_INSTALLED: {
      const newPlugins = state.plugins.map(plugin => {
        if (plugin.id === action.id) {
          return {
            ...plugin,
            isInstalled: action.isInstalled
          };
        }
        return plugin;
      });

      return {
        ...state,
        plugins: newPlugins
      };
    }

    case types.UPDATE_ACTION_IN_PROGRESS: {
      const newPlugins = state.plugins.map(plugin => {
        if (plugin.id === action.id) {
          return {
            ...plugin,
            actionInProgress: action.isLoading
          };
        }
        return plugin;
      });

      return {
        ...state,
        plugins: newPlugins
      };
    }

    case types.UPDATE_ACTIONSUCCESS: {
      return { ...state, isActionSuccess: action.isActionSuccess };
    }

    default:
      return state;
  }
};

export default pluginsReducer;
