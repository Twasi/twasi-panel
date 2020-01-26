import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../../services/graphqlService';

const {
    updateSequences,
    updateDelSequence,
    updateSmartlifeAccount,
    updateSmartlifeAuthUri,
    updateSmartlifeScenes,
    updateTriggerSmartlifeScene,
    updateCreateSequence,
    updateSmartlifeMaxSteps,
    updatePagination,
    updateDisabled,
    updateLoaded,
    updateLoading,
    updateActionSuccess
} = actions;

function stringify(obj_from_json){
    if(typeof obj_from_json !== "object" || Array.isArray(obj_from_json)){
        // not an object, stringify using native function
        return JSON.stringify(obj_from_json);
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    let props = Object
        .keys(obj_from_json)
        .map(key => `${key}:${stringify(obj_from_json[key])}`)
        .join(",");
    return `{${props}}`;
}

const loadSequences = page => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`control{sceneSequences{list{content(page: ${page}){created,id,name,steps{homeId,msDelay,sceneId},updated,variable},itemsPerPage,pages,total}}}`, 'smartlifeintegration')).then(data => {
        if (data == null) {
            dispatch(updateDisabled(true));
            return;
        }
        dispatch(updateSequences(data.control.sceneSequences.list.content));
        dispatch(updatePagination(data.control.sceneSequences.list));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

const delSequence = id => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`control{sceneSequences{delete(id: "${id}"){status,translationKey}}}`, 'smartlifeintegration')).then(
    data => {
      dispatch(updateDelSequence(data.control.sceneSequences));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const loadSmartlifeAccount = () => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph('control{devices{activeTime,category,createTime,id,ip,name,online,productId,status{code,value},sub,timeZone,uid,updateTime},homes{homeId,name}}', 'smartlifeintegration')).then(data => {
      if (data == null) {
          dispatch(updateDisabled(true));
          return;
      }
      dispatch(updateSmartlifeAccount(data.control))
    });
}

const loadSmartlifeMaxSteps = () => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph('maxSequenceSteps', 'smartlifeintegration')).then(data => {
      if (data == null) {
          dispatch(updateDisabled(true));
          return;
      }
      dispatch(updateSmartlifeMaxSteps(data.maxSequenceSteps))
    });
}

const loadSmartlifeScenes = (homeId) => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`control{scenes(homeId: ${homeId}){background,name,sceneId}}`, 'smartlifeintegration')).then(data => {
      if (data == null) {
          dispatch(updateDisabled(true));
          return;
      }
      dispatch(updateSmartlifeScenes(data.control))
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
}

const triggerSmartlifeScene = (homeId, sceneId) => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`control{triggerScene(homeId: ${homeId}, sceneId: ${JSON.stringify(sceneId)}){status,translationKey}}`, 'smartlifeintegration')).then(data => {
      if (data == null) {
          dispatch(updateDisabled(true));
          return;
      }
      dispatch(updateTriggerSmartlifeScene(data.control))
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
}

const createSequence = (sequenceInput) => dispatch => {
    dispatch(updateLoading(true));
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`control{sceneSequences{create(newSequence: ${stringify(sequenceInput).replace(/"([^(")"]+)":/g,"$1:")}){created,id,name,steps{homeId,msDelay,sceneId},updated,variable}}}`, 'smartlifeintegration')).then(data => {
      dispatch(updateCreateSequence(data.control.sceneSequences.create))
      dispatch(updateActionSuccess(true));
    }).finally(() => {
        dispatch(updateActionSuccess(false));
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
}

const loadSmartlifeAuthUri = () => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph('authenticationUri', 'smartlifeintegration')).then(data => {
      if (data == null) {
          dispatch(updateDisabled(true));
          return;
      }
      dispatch(updateSmartlifeAuthUri(data.authenticationUri))
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
}

const loadSmartlifeDisconnect = () => dispatch => {
    dispatch(getGraph('disconnect{status,translationKey}', 'smartlifeintegration'))
}


const verifyData = () => (dispatch, getState) => {
    const state = getState();

    const isLoaded = selectors.isLoaded(state);

    if (!isLoaded) {
        dispatch(loadSmartlifeAccount());
    }
};

export default {
    createSequence,
    delSequence,
    loadSequences,
    loadSmartlifeAccount,
    loadSmartlifeAuthUri,
    loadSmartlifeScenes,
    triggerSmartlifeScene,
    loadSmartlifeDisconnect,
    loadSmartlifeMaxSteps,
    updatePagination,
    verifyData,
    updateLoaded,
    updateLoading,
    updateActionSuccess
};
