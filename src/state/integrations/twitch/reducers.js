import types from './types';

export const initialState = {
  isLoaded: false,
  twitch: [],
  twitchUri: '',
  twitchDisconnect: '',
  isDisabled: false,
  isLoading: false,
};

const twitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TWITCHACCOUNT: {
      return ({ ...state, isLoaded: true, isDisabled: false, twitch: action.twitch});
    }
    case types.UPDATE_TWITCHAUTHURI: {
      return ({ ...state, isLoaded: true, isDisabled: false, twitchUri: action.twitchUri});
    }
    case types.UPDATE_TWITCHDISCONNECT: {
      return ({ ...state, isLoaded: true, isDisabled: false, twitchDisconnect: action.twitchDisconnect});
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

export default twitchReducer;
