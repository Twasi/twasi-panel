import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  isLoaded: false,
  commands: [],
  isDisabled: false
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_COMMANDS: {
      return { ...state, isLoaded: true, isDisabled: false, commands: action.commands };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    default:
      return state;
  }
};

export default combineReducers({
  commands: statusReducer
});
