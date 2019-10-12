import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateStatus,
  updateEvents,
  updateBotLanguage,
  updateStarting,
  updateStopping
} = actions;

const loadData = () => dispatch => {
  dispatch(getGraph('status{isRunning}')).then(data => dispatch(updateStatus(data.status)));
};

const loadEvents = () => dispatch => {
  dispatch(getGraph('user{events{message,messageType,createdAt}}')).then(data => dispatch(updateEvents(data.user.events)));
};

const loadBotLanguage = languageCode => dispatch => {
    dispatch(getGraph(`status{setLanguage(languageCode: ${JSON.stringify(languageCode)})}`, 'panel')).then(
    data => {
      dispatch(updateBotLanguage(data.status));
    });
};


const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadData());
  }
};

const stopBot = () => dispatch => {
  dispatch(updateStopping(true));
  sleep(1000).then(() => {

    dispatch(getGraph('status{changeStatus(isRunning:false){isRunning}}')).then(data => {
      dispatch(updateStatus(data.status.changeStatus));
      dispatch(updateStopping(false));
    });
  });
};

const startBot = () => dispatch => {
  dispatch(updateStarting(true));
  sleep(1000).then(() => {

    dispatch(getGraph('status{changeStatus(isRunning:true){isRunning}}')).then(data => {
      dispatch(updateStatus(data.status.changeStatus));
      dispatch(updateStarting(false));
    });
  });
};

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export default {
  updateStatus,
  loadData,
  loadEvents,
  loadBotLanguage,
  verifyData,
  stopBot,
  startBot
};
