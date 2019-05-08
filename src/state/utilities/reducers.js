import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  isLoaded: false,
  utilities: [],
  isDisabled: false
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_UTILITIES: {
      return { ...state, isLoaded: true, isDisabled: false, utilities: action.utilities };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    default:
      return state;
  }
};

export default combineReducers({
  utilities: statusReducer
});
