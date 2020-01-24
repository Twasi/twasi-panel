import types from './types';

export const initialState = {
  sequences: [],
  pagination: [],
  smartlife: [],
  smartlifeScenes: [],
  sequenceInput: [],
  triggerSmartlifeScene: '',
  smartlifeUri: '',
  smartlifeDisconnect: '',
  smartlifeMaxSteps: 0,
  isDisabled: false,
  isLoading: false,
  isLoaded: false,
  isActionSuccess: false,
  homeId: '',
  sceneId: '',
  id: '',
};

const smartlifeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SEQUENCES: {
      return { ...state, isLoaded: true, isDisabled: false, sequences: action.sequences };
    }
    case types.UPDATE_DELSEQUENCE: {
      return { ...state, isLoaded: true, id: action.id };
    }
    case types.UPDATE_PAGINATION: {
      return { ...state, pagination: action.pagination };
    }
    case types.UPDATE_SMARTLIFEACCOUNT: {
      return ({ ...state, isLoaded: true, isDisabled: false, smartlife: action.smartlife});
    }
    case types.UPDATE_SMARTLIFEAUTHURI: {
      return ({ ...state, isLoaded: true, isDisabled: false, smartlifeUri: action.smartlifeUri});
    }
    case types.UPDATE_SMARTLIFESCENES: {
      return ({ ...state, isLoaded: true, isDisabled: false, smartlifeScenes: action.smartlifeScenes});
    }
    case types.UPDATE_TRIGGERSMARTLIFESCENE: {
      return ({ ...state, isLoaded: true, isDisabled: false, homeId: action.homeId, sceneId: action.sceneId});
    }
    case types.UPDATE_CREATESEQUENCE: {
      return ({ ...state, isLoaded: true, isDisabled: false, sequenceInput: action.sequenceInput});
    }
    case types.UPDATE_SMARTLIFEMAXSTEPS: {
      return ({ ...state, isLoaded: true, isDisabled: false, smartlifeMaxSteps: action.smartlifeMaxSteps});
    }
    case types.UPDATE_SMARTLIFEDISCONNECT: {
      return ({ ...state, isLoaded: true, isDisabled: false, smartlifeDisconnect: action.smartlifeDisconnect});
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    case types.UPDATE_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case types.UPDATE_LOADED: {
      return { ...state, isLoaded: action.isLoaded };
    }
    case types.UPDATE_ACTIONSUCCESS: {
      return { ...state, isActionSuccess: action.isActionSuccess };
    }
    default:
      return state;
  }
};

export default smartlifeReducer;
