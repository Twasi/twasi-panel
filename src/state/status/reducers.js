import types from './types';

export const initialState = {
  isLoaded: false,
  status: {},
  events: [],
  languageCode: "",
  isStarting: false,
  isStopping: false
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }

    case types.UPDATE_STATUS: {
      return { ...state, status: action.status };
    }

    case types.UPDATE_EVENTS: {
      return { ...state, events: action.events };
    }

    case types.UPDATE_BOTLANGUAGE: {
      return { ...state, events: action.languageCode };
    }

    case types.UPDATE_STARTING: {
      return { ...state, isStarting: action.starting };
    }

    case types.UPDATE_STOPPING: {
      return { ...state, isStopping: action.stopping };
    }

    default:
      return state;
  }
};

export default statusReducer;
