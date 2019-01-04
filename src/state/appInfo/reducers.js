import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  isLoaded: false,
  isConnected: false,
  serverVersion: 'DISCONNECTED',
  userStatus: 'LOADING',
  theme: 'twasi-dark'
};

const appInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }

    case types.UPDATE_CONNECTED: {
      return { ...state, isConnected: action.isConnected };
    }

    case types.UPDATE_SERVERVERSION: {
      return { ...state, serverVersion: action.version };
    }

    case types.UPDATE_USER_STATUS: {
      return { ...state, userStatus: action.userStatus };
    }

    case types.UPDATE_THEME: {
      return { ...state, theme: action.theme };
    }

    default:
      return state;
  }
};

export default combineReducers({
  appInfo: appInfoReducer
});
