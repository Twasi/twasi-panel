import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../../services/graphqlService';

const {
    updateSpotifyAccount,
    updateDisabled,
    updateIsLoading
} = actions;

const loadSpotifyAccount = () => dispatch => {
    dispatch(getGraph('account{premium,userName},authenticationUri', 'spotifyintegration')).then(data => {
        //console.log("spotify: " + data.authenticationUri + " " + data.account)
        dispatch(
          updateSpotifyAccount(data.authenticationUri, data.account),
        );
    });
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
    verifyData
};
