import actions from './actions';
import selectors from './selectors';

const {
  updateStatus,
  updateEvents,
  updateLoaded,
  updateStarting,
  updateStopping
} = actions;

const loadData = () => dispatch => {};

const loadEvents = () => () => {
  /* events.get().then(data => {
    dispatch(updateEvents(data.messages));
  }); */
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
