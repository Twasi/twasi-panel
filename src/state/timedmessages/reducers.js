import types from './types';

export const initialState = {
  timer: [],
  command: "",
  interval: 0,
  enabled: false,
  isLoaded: false,
  isDisabled: false,
  isLoading: true,
  isActionSuccess: false
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TIMER: {
      return { ...state, isLoaded: true, isDisabled: false, timer: action.timer };
    }
    case types.UPDATE_ADDTIMER: {
      return { ...state, isLoaded: true, command: action.command, interval: action.interval, enabled: action.enabled };
    }
    case types.UPDATE_DELTIMER: {
      return { ...state, isLoaded: true, command: action.command };
    }
    case types.UPDATE_ENABLETIMER: {
      return { ...state, isLoaded: true, command: action.command, enabled: action.enabled };
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

export default timerReducer;
