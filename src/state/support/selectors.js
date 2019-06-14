const isLoaded = state => state.support.isLoaded;
const getMyTickets = state => state.support.myTickets;
const getAdminTickets = state => state.support.adminTickets;

export default {
  isLoaded,
  getMyTickets,
  getAdminTickets
};
