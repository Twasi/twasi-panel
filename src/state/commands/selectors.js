const getCommands = state => state.commands.commands;
const getPagination = state => state.commands.pagination;
const getPluginCommands = state => state.commands.pluginCommands;
const getAccessLevels = state => state.commands.accessLevels;
const isLoaded = state => state.commands.isLoaded;
const isDisabled = state => state.commands.isDisabled;
const isLoading = state => state.commands.isLoading;
const isActionSuccess = state => state.commands.isActionSuccess;

export default {
  getAccessLevels,
  getCommands,
  getPagination,
  getPluginCommands,
  isLoaded,
  isDisabled,
  isLoading,
  isActionSuccess
};
