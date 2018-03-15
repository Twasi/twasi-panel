import { combineReducers } from 'redux';
import types from './types';

const initialState = {
  user: null,
  jwt: null,
  isLoading: true,
  userData: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER: {
      return { ...state, user: action.user };
    }

    case types.UPDATE_IS_LOADING: {
      return { ...state, isLoading: action.loading };
    }

    case types.UPDATE_JWT: {
      return { ...state, jwt: action.jwt };
    }

    case types.UPDATE_USER_DATA: {
      return { ...state, userData: action.data };
    }

    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer
});
