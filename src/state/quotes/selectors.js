const getQuotes = state => state.quotesState.quotes.quotes;
const isLoaded = state => state.quotesState.quotes.isLoaded;
const isDisabled = state => state.quotesState.quotes.isDisabled;

export default {
  getQuotes,
  isLoaded,
  isDisabled
};
