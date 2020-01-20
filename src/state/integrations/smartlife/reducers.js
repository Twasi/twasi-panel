import types from './types';

export const initialState = {
  isLoaded: false,
  smartlife: [],
  smartlifeUri: '',
  smartlifeDisconnect: '',
  isDisabled: false,
  isLoading: false,
};

const smartlifeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SMARTLIFEACCOUNT: {
      return ({ ...state, isLoaded: true, isDisabled: false, smartlife: action.smartlife});
    }
    case types.UPDATE_SMARTLIFEAUTHURI: {
      return ({ ...state, isLoaded: true, isDisabled: false, smartlifeUri: action.smartlifeUri});
    }
    case types.UPDATE_SMARTLIFEDISCONNECT: {
      return ({ ...state, isLoaded: true, isDisabled: false, smartlifeDisconnect: action.smartlifeDisconnect});
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

export default smartlifeReducer;
