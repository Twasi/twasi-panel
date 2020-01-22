import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../../services/graphqlService';

const {
    updateSmartlifeAccount,
    updateSmartlifeAuthUri,
    updateSmartlifeScenes
} = actions;

const loadSmartlifeAccount = () => dispatch => {
    dispatch(getGraph('control{devices{activeTime,category,createTime,id,ip,name,online,productId,status{code,value},sub,timeZone,uid,updateTime},homes{homeId,name}}', 'smartlifeintegration')).then(data => {
        dispatch(updateSmartlifeAccount(data.control))
    });
}

const loadSmartlifeScenes = (homeId) => dispatch => {
    dispatch(getGraph(`control{scenes(homeId: ${homeId}){background,name,sceneId}}`, 'smartlifeintegration')).then(data => {
        dispatch(updateSmartlifeScenes(data.control))
    });
}

const loadSmartlifeAuthUri = () => dispatch => {
    dispatch(getGraph('authenticationUri', 'smartlifeintegration')).then(data => {
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
    loadSmartlifeScenes,
    loadSmartlifeDisconnect,
    verifyData
};
