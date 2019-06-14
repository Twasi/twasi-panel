const getQuotes = state => state.quotes.quotes;
const isLoaded = state => state.quotes.isLoaded;
const isDisabled = state => state.quotes.isDisabled;

export default {
  getQuotes,
  isLoaded,
  isDisabled
};
