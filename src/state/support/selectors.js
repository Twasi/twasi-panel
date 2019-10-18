const isLoaded = state => state.support.isLoaded;
const getMyTickets = state => state.support.myTickets;
const getPagination = state => state.support.pagination;
const isAdmin = state => state.support.isAdmin;

export default {
  isLoaded,
  getMyTickets,
  getPagination,
  isAdmin
};
