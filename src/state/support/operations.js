import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const { updateLoaded, updateMyTickets } = actions;

const ticketQuery = 'id,owner{name,avatar},topic,state,createdAt,category,closedAt,messages{sender{name,avatar},message,createdAt,staff}}';

const loadMyTickets = () => dispatch => {
  dispatch(getGraph(`support{myTickets{${ticketQuery}}`)).then(
    data => {
      dispatch(updateMyTickets(data.support.myTickets));
      dispatch(updateLoaded(true));
    }
  );
};

const createTicket = (category, topic, message) => (dispatch, getState) => dispatch(getGraph(`support{create(topic:"${topic}",message:"${message}",category:"${category}"){${ticketQuery}}`)).then(data => {
  dispatch(updateMyTickets([...selectors.getMyTickets(getState()), data.support.create]));
});

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadMyTickets());
  }
};

export default {
  loadMyTickets,
  verifyData,
  createTicket
};
