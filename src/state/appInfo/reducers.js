import types from './types';

export const initialState = {
  isLoaded: false,
  isConnected: false,
  serverVersion: 'DISCONNECTED',
  userStatus: 'LOADING',
  theme: 'twasi-darkblue',
  bannerAsHeader: false,
  comicsans: false,
  notifications: [],
  lastNotificationId: 0
};

const appInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }

    case types.UPDATE_CONNECTED: {
      return { ...state, isConnected: action.isConnected };
    }

    case types.UPDATE_SERVERVERSION: {
      return { ...state, serverVersion: action.version };
    }

    case types.UPDATE_USER_STATUS: {
      return { ...state, userStatus: action.userStatus };
    }

    case types.UPDATE_THEME: {
      return { ...state, theme: action.theme };
    }

    case types.UPDATE_BANNERASHEADER: {
      return { ...state, bannerAsHeader: action.bannerAsHeader };
    }

    case types.UPDATE_COMICSANS: {
      return { ...state, comicsans: action.comicsans };
    }

    case types.ADD_NOTIFICATION: {
      return { ...state, notifications: [...state.notifications, {...action.notification, id: state.lastNotificationId + 1}], lastNotificationId: state.lastNotificationId + 1}
    }

    default:
      return state;
  }
};

export default appInfoReducer;
