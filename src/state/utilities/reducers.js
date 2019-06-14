import types from './types';

export const initialState = {
  isLoaded: false,
  utilities: [],
  newGame: '',
  newTitle: '',
  isDisabled: false
};

const utilitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_UTILITIES: {
      return { ...state, isLoaded: true, isDisabled: false, utilities: action.utilities };
    }
    case types.UPDATE_TITLEGAME: {
      return { ...state, isLoaded: true, newTitle: action.newTitle, newGame: action.newGame };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    default:
      return state;
  }
};

export default utilitiesReducer;
