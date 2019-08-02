import types from './types';

const updateLoaded = isLoaded => ({
  type: types.UPDATE_LOADED,
  isLoaded
});

const updateMyTickets = myTickets => ({
  type: types.UPDATE_MY_TICKETS,
  myTickets
});

const updateAdmin = isAdmin => ({
  type: types.UPDATE_ADMIN,
  isAdmin
});

export default {
  updateLoaded,
  updateMyTickets,
  updateAdmin
};
