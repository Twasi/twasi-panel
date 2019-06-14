import types from './types';

export const initialState = {
  isLoaded: false,
  commands: [],
  name: '',
  content: '',
  id: '',
  cooldown: 0,
  isDisabled: false,
  isLoading: false
};

const commandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_COMMANDS: {
      return { ...state, isLoaded: true, isDisabled: false, commands: action.commands };
    }
    case types.UPDATE_SINGLECOMMAND: {
      return { ...state, isLoaded: true, isDisabled: false, id: action.id };
    }
    case types.UPDATE_ADDCOMMAND: {
      return { ...state, isLoaded: true, name: action.name, content: action.content, cooldown: action.cooldown };
    }
    case types.UPDATE_EDITCOMMAND: {
      return { ...state, isLoaded: true, name: action.name, content: action.content, cooldown: action.cooldown };
    }
    case types.UPDATE_DELCOMMAND: {
      return { ...state, isLoaded: true, id: action.id };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    case types.UPDATE_IS_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    default:
      return state;
  }
};

export default commandsReducer;
