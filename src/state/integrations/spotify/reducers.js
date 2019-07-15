import types from './types';

export const initialState = {
  isLoaded: false,
  spotify: [],
  spotifyUri: '',
  isDisabled: false,
  isLoading: false
};

const spotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SPOTIFYACCOUNT: {
      return ({ ...state, isLoaded: true, isDisabled: false, spotify: action.spotify});
    }
    case types.UPDATE_SPOTIFYAUTHURI: {
      return ({ ...state, isLoaded: true, isDisabled: false, spotifyUri: action.spotifyUri});
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

export default spotifyReducer;
