import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

import { authSelectors } from '../auth';

const { updateLoaded, updateMyTickets, updateAdmin } = actions;

const ticketQuery = 'id,owner{name,avatar},topic,state,createdAt,category,closedAt,messages{sender{name,avatar},message,createdAt,staff}}';

const loadMyTickets = () => (dispatch, getState) => {
  const state = getState();
  const isAdmin = authSelectors.getUser(state).rank === 'TEAM';
  const subObject = isAdmin ? 'adminTickets' : 'myTickets';

  dispatch(updateAdmin(isAdmin));

  dispatch(getGraph(`support{${subObject}{${ticketQuery}}`)).then(
    data => {
      dispatch(updateMyTickets(data.support[subObject]));
      dispatch(updateLoaded(true));
    }
  );
};

const createTicket = (category, topic, message) => (dispatch, getState) => dispatch(getGraph(`support{create(topic:"${topic}",message:"${message}",category:"${category}"){${ticketQuery}}`)).then(data => {
  dispatch(updateMyTickets([...selectors.getMyTickets(getState()), data.support.create]));
});

const replyToTicket = (id, close, isAdminContext, message) => (dispatch, getState) => dispatch(getGraph(`support{reply(id:"${id}",close:${close},isAdminContext:${isAdminContext},message:"${message}"){${ticketQuery}}`)).then(data => {
  dispatch(updateMyTickets([...selectors.getMyTickets(getState()).filter(t => t.id !== id), data.support.reply]));
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
  createTicket,
  replyToTicket
};
