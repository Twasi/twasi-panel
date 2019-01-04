const getCommands = state => state.commandsState.commands.commands;
const isLoaded = state => state.commandsState.commands.isLoaded;
const isDisabled = state => state.commandsState.commands.isDisabled;

export default {
  getCommands,
  isLoaded,
  isDisabled
};
