import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  isLoaded: false,
  variables: [],
  isDisabled: false
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_VARIABLES: {
      return { ...state, isLoaded: true, isDisabled: false, variables: action.variables };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    default:
      return state;
  }
};

export default combineReducers({
  variables: statusReducer
});
