import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const { updateLoaded, updateMyTickets } = actions;

const loadMyTickets = () => dispatch => {
  dispatch(getGraph('support{myTickets{id,owner{name,avatar},topic,state,messages{sender{name,avatar},message,createdAt,staff}}}')).then(
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
