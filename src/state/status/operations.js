import actions from './actions';
import selectors from './selectors';
import botInfo from '../../services/bot/botInfo.service';
import changeStatus from '../../services/bot/changeStatus.service';
import events from '../../services/user/events.service';

const {
  updateStatus,
  updateEvents,
  updateLoaded,
  updateStarting,
  updateStopping
} = actions;

const loadData = () => dispatch =>
  botInfo.get().then(data => {
    dispatch(updateStatus(data));
    dispatch(updateLoaded(true));
    return Promise.resolve(data);
  });

const loadEvents = () => dispatch => {
  events.get().then(data => {
    dispatch(updateEvents(data.messages));
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
  changeStatus
    .post('stop')
    .then(() =>
      dispatch(loadData()).then(() => dispatch(updateStopping(false)))
    );
};

const startBot = () => dispatch => {
  dispatch(updateStarting(true));
  changeStatus
    .post('start')
    .then(() =>
      dispatch(loadData()).then(() => dispatch(updateStarting(false)))
    );
};

export default {
  updateStatus,
  loadData,
  loadEvents,
  verifyData,
  stopBot,
  startBot
};
