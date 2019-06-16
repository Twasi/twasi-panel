import actions from './actions';
import selectors from './selectors';

import { authSelectors } from '../auth';
import { getUserGraph } from '../../services/graphqlService';

const { updateLoaded, updateMyTickets } = actions;

const loadMyTickets = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  if (jwt === null) {
    return;
  }

  getUserGraph('support{myTickets{id,owner{name,avatar},topic,state,createdAt,category,closedAt,messages{sender{name,avatar},message,createdAt,staff}}}', jwt).then(
    data => {
      dispatch(updateMyTickets(data.support.myTickets));
      dispatch(updateLoaded(true));
    }
  );
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadMyTickets());
  }
};

export default {
  loadMyTickets,
  verifyData
};
