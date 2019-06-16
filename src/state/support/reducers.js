import types from './types';

export const initialState = {
  isLoaded: false,
  myTickets: [],
  adminTickets: []
};

const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }

    case types.UPDATE_MY_TICKETS: {
      return { ...state, myTickets: action.myTickets };
    }

    case types.UPDATE_ADMIN_TICKETS: {
      return { ...state, adminTickets: action.adminTickets };
    }

    default:
      return state;
  }
};

export default supportReducer;
