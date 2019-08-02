import types from './types';

export const initialState = {
  isLoaded: false,
  isLoading: true,
  isGlobalLoading: true,
  noStreamData: true,
  streamtracker: [],
  globalstreamtracker: [],
  isDisabled: false
};

const streamtrackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_STREAMTRACKER: {
      return { ...state, isLoaded: true, isDisabled: false, noStreamData: true, streamtracker: action.streamtracker };
    }
    case types.UPDATE_GLOBALSTREAMTRACKER: {
      return { ...state, isLoaded: true, isDisabled: false, globalstreamtracker: action.globalstreamtracker };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }
    case types.UPDATE_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case types.UPDATE_NOSTREAMDATA: {
      return { ...state, noStreamData: action.noStreamData };
    }
    case types.UPDATE_GLOBALLOADING: {
      return { ...state, isGlobalLoading: action.isGlobalLoading };
    }
    default:
      return state;
  }
};

export default streamtrackerReducer;
