import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  isLoaded: false,
  plugins: []
};

const pluginsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }

    case types.UPDATE_PLUGINS: {
      return {
        ...state,
        plugins: [
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins,
          ...action.plugins
        ]
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  plugins: pluginsReducer
});
