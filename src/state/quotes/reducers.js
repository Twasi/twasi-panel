import types from './types';

export const initialState = {
  isLoaded: false,
  quotes: [],
  isDisabled: false
};

const quotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_QUOTES: {
      return { ...state, isLoaded: true, isDisabled: false, quotes: action.quotes };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    default:
      return state;
  }
};

export default quotesReducer;
