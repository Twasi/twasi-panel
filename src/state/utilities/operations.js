import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateUtilities,
  updateTitleGame,
  updateDisabled
} = actions;

const loadUtilities = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('twitchAPI{retrieve{title,game,followers}}', jwt, 'utilities').then(data => {
    if (data.twitchAPI == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateUtilities(data.twitchAPI));
  });
};

const changeTitleGame = (newTitle, newGame) => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);
  getUserGraph(`twitchAPI{update{channel(newTitle: "${newTitle}", newGame: "${newGame}")}}`, jwt, 'utilities').then(
    data => {
      dispatch(updateTitleGame(data.twitchAPI));
    }
  );
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadUtilities());
  }
};

export default {
  loadUtilities,
  changeTitleGame,
  verifyData
};
