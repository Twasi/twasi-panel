import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

import { authSelectors } from '../auth';

const { updateLoaded, updateLoading, updateMyTickets, updatePagination, updateAdmin } = actions;

const ticketQuery = 'id,owner{name,avatar},topic,state,createdAt,category,closedAt,messages{sender{name,avatar},message,createdAt,staff}}';

const loadMyTickets = (page, open) => (dispatch, getState) => {
  dispatch(updateLoading(true));
  const state = getState();
  const isAdmin = authSelectors.getUser(state).rank === 'TEAM';
  var subObject = '';
  if(isAdmin && open) {
    subObject = 'openAdminTickets';
  } else if(isAdmin && !open) {
    subObject = 'closedAdminTickets';
  } else if(!isAdmin && open) {
    subObject = 'myOpenTickets';
  } else if(!isAdmin && !open) {
    subObject = 'myClosedTickets';
  }

  dispatch(updateAdmin(isAdmin));

  dispatch(getGraph(`support{${subObject}(page: ${JSON.stringify(page)}){content{... on SupportTicket{${ticketQuery}},itemsPerPage,total,page,pages}}`)).then(
    data => {
      dispatch(updateMyTickets(data.support[subObject].content));
      dispatch(updatePagination(data.support[subObject]));
      dispatch(updateLoaded(true));
      dispatch(updateLoading(false));
    }
  );
};

const createTicket = (category, topic, message) => (dispatch, getState) => dispatch(getGraph(`support{create(topic:${JSON.stringify(topic)},message:${JSON.stringify(message.replace(/(\r\n|\n|\r)/gm, '<br />'))},category:"${category}"){${ticketQuery}}`)).then(data => {
  dispatch(updateMyTickets([...selectors.getMyTickets(getState()), data.support.create]));
});

const replyToTicket = (id, close, isAdminContext, message) => (dispatch, getState) => dispatch(getGraph(`support{reply(id:"${id}",close:${close},isAdminContext:${isAdminContext},message:${JSON.stringify(message.replace(/(\r\n|\n|\r)/gm, '<br />'))}){${ticketQuery}}`)).then(data => {
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
