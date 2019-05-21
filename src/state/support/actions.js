import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateMyTickets = myTickets => ({
  type: types.UPDATE_MY_TICKETS,
  myTickets
});

const updateAdminTickets = adminTickets => ({
  type: types.UPDATE_ADMIN_TICKETS,
  adminTickets
});

export default {
  updateLoaded,
  updateMyTickets,
  updateAdminTickets
};
