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

  getUserGraph('status{isRunning}', jwt).then(data => dispatch(updateStatus(data.data.viewer.status)));
};

const loadEvents = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('user{events{message,messageType,createdAt}}', jwt).then(data => dispatch(updateEvents(data.data.viewer.user.events)));
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadData());
  }
};

const stopBot = () => {};

const startBot = () => {};

export default {
  updateStatus,
  loadData,
  loadEvents,
  verifyData,
  stopBot,
  startBot
};
