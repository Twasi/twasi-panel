import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  isImpersonating: false,
  jwt: "",
  user: "",
  originalJwt: ""
};

const appInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_IMPERSONATING: {
      if (action.jwt !== null && action.jwt !== "") {
        console.log("[IMPERSONATE] Ready to clear state!");
      }

      return { ...state, isImpersonating: true, jwt: action.jwt, user: action.userName };
    }

    default:
      return state;
  }
};

export default combineReducers({
  appInfo: appInfoReducer
});
