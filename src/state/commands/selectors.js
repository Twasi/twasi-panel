const getCommands = state => state.commands.commands;
const getPluginCommands = state => state.commands.pluginCommands;
const getAccessLevels = state => state.commands.accessLevels;
const isLoaded = state => state.commands.isLoaded;
const isDisabled = state => state.commands.isDisabled;
const isLoading = state => state.commands.isLoading;
const isActionSuccess = state => state.commands.isActionSuccess;

export default {
  getAccessLevels,
  getCommands,
  getPluginCommands,
  isLoaded,
  isDisabled,
  isLoading,
  isActionSuccess
};
