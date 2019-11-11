import types from './types';

const initialState = {
  user: {
    displayName: ''
  },
  isUserUpdating: false,
  isAuthenticated: false,
  jwt: null,
  isLoading: false,
  isSetUp: false,
  isActionSuccessAuth: false,
  userData: {
    id: '',
    banner: '',
    twitchAccount: {
      avatar: ''
    }
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER: {
      return { ...state, user: action.user };
    }

    case types.UPDATE_IS_LOADING: {
      return { ...state, isLoading: action.loading };
    }

    case types.UPDATE_IS_AUTHENTICATED: {
      return { ...state, isAuthenticated: action.authenticated };
    }

    case types.UPDATE_JWT: {
      return { ...state, jwt: action.jwt };
    }

    case types.UPDATE_USER_DATA: {
      return { ...state, userData: action.data };
    }

    case types.UPDATE_IS_USER_UPDATING: {
      return { ...state, isUserUpdating: action.isUserUpdating };
    }

    case types.UPDATE_IS_SET_UP: {
      return { ...state, isSetUp: action.isSetUp };
    }

    case types.UPDATE_ACTIONSUCCESSAUTH: {
      return { ...state, isActionSuccessAuth: action.isActionSuccessAuth };
    }

    default:
      return state;
  }
};

export default authReducer;
