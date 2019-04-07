import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateQuotes,
  updateDisabled
} = actions;

const loadQuotes = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('publicAll(name: "Blechkelle"){id}', jwt, 'quotes').then(data => {
    console.log(data.publicAll);
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateQuotes(data.publicAll));
  });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadQuotes());
  }
};

export default {
  loadQuotes,
  verifyData
};
