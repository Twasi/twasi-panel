import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../../services/graphqlService';

const {
    updateTwitchAccount,
    updateTwitchAuthUri
} = actions;

const loadTwitchAccount = () => dispatch => {
    dispatch(getGraph('account{premium,userName},authenticationUri', 'spotifyintegration')).then(data => {
        //console.log("spotify: " + data.authenticationUri + " " + data.account)
        dispatch(updateTwitchAccount(data.account))
    });
}

const loadTwitchAuthUri = () => dispatch => {
    dispatch(getGraph('authenticationUri', 'spotifyintegration')).then(data => {
        //console.log("spotify: " + data.authenticationUri + " " + data.account)
        dispatch(updateTwitchAuthUri(data.authenticationUri))
    });
}

const loadTwitchDisconnect = () => dispatch => {
    dispatch(getGraph('account{logout}', 'spotifyintegration'))
}


const verifyData = () => (dispatch, getState) => {
    const state = getState();

    const isLoaded = selectors.isLoaded(state);

    if (!isLoaded) {
        dispatch(loadTwitchAccount());
    }
};

export default {
    loadTwitchAccount,
    loadTwitchAuthUri,
    loadTwitchDisconnect,
    verifyData
};
