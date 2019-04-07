import types from './types';

const updateQuotes = quotes => ({
  type: types.UPDATE_QUOTES,
  quotes
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateQuotes,
  updateDisabled
};
