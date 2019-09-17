import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../services/graphqlService';

const {
    updateTimer,
    updateAddTimer,
    updateDelTimer,
    updateEnableTimer,
    updateDisabled,
    updateLoaded,
    updateLoading,
    updateActionSuccess
} = actions;

const loadTimer = () => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph('listTimers{command,enabled,interval}', 'timedmessages')).then(data => {
        if (data == null) {
            dispatch(updateDisabled(true));
            return;
        }
        dispatch(updateTimer(data.listTimers));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

const addTimer = (command,interval) => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`registerTimer(command: ${JSON.stringify(command)}, interval: ${interval}){command}`, 'timedmessages')).then(
    data => {
      dispatch(updateAddTimer(data.registerTimer));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const delTimer = command => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`removeTimer(command: ${JSON.stringify(command)}){command}`, 'timedmessages')).then(
    data => {
      dispatch(updateDelTimer(data.removeTimer));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const enableTimer = (command,enabled) => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`enableTimer(command: ${JSON.stringify(command)}, enabled: ${enabled}){command}`, 'timedmessages')).then(
    data => {
      dispatch(updateEnableTimer(data.enableTimer));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const verifyData = () => (dispatch, getState) => {
    const state = getState();

    const isLoaded = selectors.isLoaded(state);

    if (!isLoaded) {
        dispatch(loadTimer());
    }
};

export default {
    loadTimer,
    addTimer,
    delTimer,
    enableTimer,
    verifyData,
    updateLoaded,
    updateLoading,
    updateActionSuccess
};
