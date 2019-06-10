import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateCommands,
  updateAddCommand,
  updateDisabled
} = actions;

const loadCommands = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('commands{id,name,content,uses}', jwt, 'commands').then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateCommands(data.commands));
  });
};

const addCommand = (name, content, cooldown) => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);
  getUserGraph(`commands{create(name: "${name}", content: "${content}", cooldown: ${cooldown})}`, jwt, 'commands').then(
    data => {
      dispatch(updateAddCommand(data.commands));
    }
  );
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadCommands());
  }
};

export default {
  loadCommands,
  addCommand,
  verifyData
};
