import types from './types';

export const initialState = {
  isLoaded: false,
  myTickets: [],
  isAdmin: false
};

const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }

    case types.UPDATE_ADMIN: {
      return { ...state, isAdmin: action.isAdmin };
    }

    case types.UPDATE_MY_TICKETS: {
      return { ...state, myTickets: action.myTickets.sort((a, b) => b.createdAt - a.createdAt) };
    }

    default:
      return state;
  }
};

export default supportReducer;
