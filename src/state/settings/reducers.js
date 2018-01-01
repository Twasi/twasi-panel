import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  language: 'DE_DE',
  isLoaded: false,
  isDirty: false
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LANGUAGE: {
      return { ...state, language: action.language };
    }

    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }

    case types.UPDATE_DIRTY: {
      return { ...state, isDirty: action.isDirty };
    }

    default:
      return state;
  }
};

export default combineReducers({
  settings: settingsReducer
});
