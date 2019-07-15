import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../../services/graphqlService';

const {
    updateSpotifyAccount,
    updateSpotifyAuthUri,
    updateSpotifyDisconnect,
    updateDisabled,
    updateIsLoading
} = actions;

const loadSpotifyAccount = () => dispatch => {
    dispatch(getGraph('account{premium,userName},authenticationUri', 'spotifyintegration')).then(data => {
        //console.log("spotify: " + data.authenticationUri + " " + data.account)
        dispatch(updateSpotifyAccount(data.account))
    });
}

const loadSpotifyAuthUri = () => dispatch => {
    dispatch(getGraph('authenticationUri', 'spotifyintegration')).then(data => {
        //console.log("spotify: " + data.authenticationUri + " " + data.account)
        dispatch(updateSpotifyAuthUri(data.authenticationUri))
    });
}

const loadSpotifyDisconnect = () => dispatch => {
    dispatch(getGraph('account{logout}', 'spotifyintegration'))
}


const verifyData = () => (dispatch, getState) => {
    const state = getState();

    const isLoaded = selectors.isLoaded(state);

    if (!isLoaded) {
        dispatch(loadSpotifyAccount());
    }
};

export default {
    loadSpotifyAccount,
    loadSpotifyAuthUri,
    loadSpotifyDisconnect,
    verifyData
};
