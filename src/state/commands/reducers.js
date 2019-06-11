import { combineReducers } from 'redux';
import types from './types';

export const initialState = {
  isLoaded: false,
  commands: [],
  name: '',
  content: '',
  id: '',
  cooldown: 0,
  isDisabled: false
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_COMMANDS: {
      return { ...state, isLoaded: true, isDisabled: false, commands: action.commands };
    }
    case types.UPDATE_ADDCOMMAND: {
      return { ...state, isLoaded: true, name: action.name, content: action.content, cooldown: action.cooldown };
    }
    case types.UPDATE_DELCOMMAND: {
      return { ...state, isLoaded: true, id: action.id };
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
