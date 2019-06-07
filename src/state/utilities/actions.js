import types from './types';

const updateUtilities = utilities => ({
  type: types.UPDATE_UTILITIES,
  utilities
});

const updateTitleGame = (newTitle, newGame) => ({
  type: types.UPDATE_TITLEGAME,
  newTitle,
  newGame
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateUtilities,
  updateTitleGame,
  updateDisabled
};
