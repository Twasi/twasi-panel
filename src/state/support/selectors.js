const isLoaded = state => state.support.isLoaded;
const getMyTickets = state => state.support.myTickets;
const isAdmin = state => state.support.isAdmin;

export default {
  isLoaded,
  getMyTickets,
  isAdmin
};
