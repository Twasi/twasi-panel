import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
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
import streamtracker from './streamtracker';
import impersonate from './impersonate';
import utilities from './utilities';
import support from './support';
import spotify from './integrations/spotify';
import twitch from './integrations/twitch';
import smartlife from './integrations/smartlife';
import timedmessages from './timedmessages';
import themes from './themes';

import {initialState as i18nInitialState} from './i18n/reducers';

let store = null;

const configureStore = (translations = {}) => {
    if (store) {
        return store;
    }

    const reducers = {
        auth,
        i18n,
        appInfo,
        status,
        settings,
        plugins,
        commands,
        variables,
        quotes,
        streamtracker,
        impersonate,
        utilities,
        support,
        spotify,
        twitch,
        timedmessages,
        themes,
        smartlife
    };

    const initialState = {
        i18n: {translations, ...i18nInitialState}
    };

    const appReducer = combineReducers(reducers);

    const rootReducer = (state, action) => {
        if (action.type === 'RESET') {
            state = initialState;
        }

        return appReducer(state, action);
    };

    const enhancer = compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
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
