const isLoaded = state => state.support.isLoaded;
const isLoading = state => state.support.isLoading;
const getMyTickets = state => state.support.myTickets;
const getPagination = state => state.support.pagination;
const isAdmin = state => state.support.isAdmin;

export default {
  isLoaded,
  isLoading,
  getMyTickets,
  getPagination,
  isAdmin
};
