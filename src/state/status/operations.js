import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateStatus,
  updateEvents,
  updateLoaded,
  updateStarting,
  updateStopping
} = actions;

const loadData = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('status{isRunning}', jwt).then(data => dispatch(updateStatus(data.status)));
};

const loadEvents = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('user{events{message,messageType,createdAt}}', jwt).then(data => dispatch(updateEvents(data.user.events)));
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadData());
  }
};

const stopBot = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('status{changeStatus(isRunning:false){isRunning}}', jwt).then(data => dispatch(updateStatus(data.status.changeStatus)));
};

const startBot = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('status{changeStatus(isRunning:true){isRunning}}', jwt).then(data => dispatch(updateStatus(data.status.changeStatus)));
};

export default {
  updateStatus,
  loadData,
  loadEvents,
  verifyData,
  stopBot,
  startBot
};
