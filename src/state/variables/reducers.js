import types from './types';

export const initialState = {
  isLoaded: false,
  isLoading: true,
  variables: [],
  id: '',
  name: '',
  output: '',
  isDisabled: false
};

const variablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_VARIABLES: {
      return { ...state, isLoaded: true, isDisabled: false, variables: action.variables };
    }
    case types.UPDATE_ADDVARIABLE: {
      return { ...state, isLoaded: true, isDisabled: false, name: action.name, output: action.output };
    }
    case types.UPDATE_EDITVARIABLE: {
      return { ...state, isLoaded: true, isDisabled: false, id: action.id, name: action.name, output: action.output };
    }
    case types.UPDATE_REMOVEVARIABLE: {
      return { ...state, isLoaded: true, isDisabled: false, id: action.id };
    }
    case types.UPDATE_DISABLED: {
      return { ...state, isDisabled: action.isDisabled };
    }
    case types.UPDATE_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    default:
      return state;
  }
};

export default variablesReducer;
