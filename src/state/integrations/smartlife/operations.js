import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../../services/graphqlService';

const {
    updateSmartlifeAccount,
    updateSmartlifeAuthUri,
    updateSmartlifeScenes,
    updateTriggerSmartlifeScene,
    updateCreateSequence,
    updateSmartlifeMaxSteps,
    updateDisabled,
    updateLoaded,
    updateLoading,
    updateActionSuccess
} = actions;

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
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`control{scenes(homeId: ${homeId}){background,name,sceneId}}`, 'smartlifeintegration')).then(data => {
      if (data == null) {
          dispatch(updateDisabled(true));
          return;
      }
      dispatch(updateSmartlifeScenes(data.control))
      dispatch(updateActionSuccess(true));
    }).finally(() => {
        dispatch(updateActionSuccess(false));
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
}

const triggerSmartlifeScene = (homeId, sceneId) => dispatch => {
    dispatch(updateLoading(true));
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`control{triggerScene(homeId: ${homeId}, sceneId: ${JSON.stringify(sceneId)}){status,translationKey}}`, 'smartlifeintegration')).then(data => {
      if (data == null) {
          dispatch(updateDisabled(true));
          return;
      }
      dispatch(updateTriggerSmartlifeScene(data.control))
      dispatch(updateActionSuccess(true));
    }).finally(() => {
        dispatch(updateActionSuccess(false));
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
}

const createSequence = (sequenceInput) => dispatch => {
    dispatch(updateLoading(true));
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`control{sceneSequences{create(newSequence: ${JSON.stringify(sequenceInput)}){created,id,name,steps{homeId,msDelay,sceneId},updated,variable}}}`, 'smartlifeintegration')).then(data => {
      if (data == null) {
          dispatch(updateDisabled(true));
          return;
      }
      dispatch(updateCreateSequence(data.control))
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
    loadSmartlifeAccount,
    loadSmartlifeAuthUri,
    loadSmartlifeScenes,
    triggerSmartlifeScene,
    loadSmartlifeDisconnect,
    loadSmartlifeMaxSteps,
    verifyData,
    updateLoaded,
    updateLoading,
    updateActionSuccess
};
