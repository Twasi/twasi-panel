const getCommands = state => state.commands.commands;
const isLoaded = state => state.commands.isLoaded;
const isDisabled = state => state.commands.isDisabled;
const isLoading = state => state.commands.isDisabled;

export default {
  getCommands,
  isLoaded,
  isDisabled,
  isLoading
};
