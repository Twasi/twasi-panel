import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth';
import i18n from './i18n';
import appInfo from './appInfo';
import status from './status';
import settings from './settings';
import plugins from './plugins';
import commands from './commands';
import variables from './variables';
import quotes from './quotes';

import { initialState as i18nInitialState } from './i18n/reducers';

let store = null;

const configureStore = (translations = {}) => {
  if (store) {
    return store;
  }

  const reducers = {
    authState: auth,
    i18nState: i18n,
    appInfoState: appInfo,
    statusState: status,
    settingsState: settings,
    pluginsState: plugins,
    commandsState: commands,
    variablesState: variables,
    quotesState: quotes
  };

  const initialState = {
    i18nState: {
      i18n: { translations, ...i18nInitialState }
    }
  };

  const rootReducer = combineReducers(reducers);

  const enhancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  store = createStore(rootReducer, initialState, enhancer);
  return store;
};

export const getState = () => {
  if (store) {
    return store.getState();
  }

  return {};
};

export default configureStore;
