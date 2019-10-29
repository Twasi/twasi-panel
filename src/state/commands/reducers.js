import types from './types';

export const initialState = {
  isLoaded: false,
  isActionSuccess: false,
  commands: [],
  pluginCommands: [],
  accessLevels: [],
  name: '',
  content: '',
  id: '',
  cooldown: 0,
  uses: 0,
  pagination: [],
  isDisabled: false,
  isLoading: true
};

const commandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_COMMANDS: {
      return { ...state, isLoaded: true, isDisabled: false, commands: action.commands };
    }
    case types.UPDATE_PAGINATION: {
      return { ...state, pagination: action.pagination };
    }
    case types.UPDATE_PLUGINCOMMANDS: {
      return { ...state, isLoaded: true, isDisabled: false, pluginCommands: action.pluginCommands };
    }
    case types.UPDATE_ACCESSLEVELS: {
      return { ...state, isLoaded: true, isDisabled: false, accessLevels: action.accessLevels };
    }
    case types.UPDATE_SINGLECOMMAND: {
      return { ...state, isLoaded: true, isDisabled: false, id: action.id };
    }
    case types.UPDATE_ADDCOMMAND: {
      return { ...state, isLoaded: true, name: action.name, content: action.content, cooldown: action.cooldown };
    }
    case types.UPDATE_EDITCOMMAND: {
      return { ...state, isLoaded: true, id: action.id, name: action.name, content: action.content, cooldown: action.cooldown, uses: action.uses };
    }
    case types.UPDATE_DELCOMMAND: {
      return { ...state, isLoaded: true, id: action.id };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    case types.UPDATE_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }
    case types.UPDATE_ACTIONSUCCESS: {
      return { ...state, isActionSuccess: action.isActionSuccess };
    }
    default:
      return state;
  }
};

export default commandsReducer;
