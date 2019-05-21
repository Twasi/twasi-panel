const isLoaded = state => state.commandsState.commands.isLoaded;
const getMyTickets = state => state.supportState.support.myTickets;
const getAdminTickets = state => state.supportState.support.adminTickets;

export default {
  isLoaded,
  getMyTickets,
  getAdminTickets
};
