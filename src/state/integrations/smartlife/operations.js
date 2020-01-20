import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../../services/graphqlService';

const {
    updateSmartlifeAccount,
    updateSmartlifeAuthUri
} = actions;

const loadSmartlifeAccount = () => dispatch => {
    dispatch(getGraph('control{devices{active_time,category,create_time,id,ip,name,online,product_id,status{code,value},sub,time_zone,uid,update_time}', 'smartlifeintegration')).then(data => {
        //console.log("spotify: " + data.authenticationUri + " " + data.account)
        dispatch(updateSmartlifeAccount(data.control))
    });
}

const loadSmartlifeAuthUri = () => dispatch => {
    dispatch(getGraph('authenticationUri', 'smartlifeintegration')).then(data => {
        //console.log("spotify: " + data.authenticationUri + " " + data.account)
        dispatch(updateSmartlifeAuthUri(data.authenticationUri))
    });
}

const loadSmartlifeDisconnect = () => dispatch => {
    dispatch(getGraph('account{logout}', 'smartlifeintegration'))
}


const verifyData = () => (dispatch, getState) => {
    const state = getState();

    const isLoaded = selectors.isLoaded(state);

    if (!isLoaded) {
        dispatch(loadSmartlifeAccount());
    }
};

export default {
    loadSmartlifeAccount,
    loadSmartlifeAuthUri,
    loadSmartlifeDisconnect,
    verifyData
};
