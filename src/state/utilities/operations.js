import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateUtilities,
  updateTitleGame,
  updateDisabled
} = actions;

const loadUtilities = () => dispatch => {
  dispatch(getGraph('twitchAPI{retrieve{title,game,followers}}', 'utilities')).then(data => {
    if (data.twitchAPI == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateUtilities(data.twitchAPI));
  });
};

const changeTitleGame = (newTitle, newGame) => dispatch => {
  dispatch(getGraph(`twitchAPI{update{channel(newTitle: "${newTitle}", newGame: "${newGame}")}}`, 'utilities')).then(
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
