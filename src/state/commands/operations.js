import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateCommands,
  updateSingleCommand,
  updateAddCommand,
  updateEditCommand,
  updateDelCommand,
  updateDisabled
} = actions;

const loadCommands = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('commands{id,name,content,uses,cooldown}', jwt, 'commands').then(data => {
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

  getUserGraph(`create(name: "${name}", content: "${content}", cooldown: ${cooldown}){id}`, jwt, 'commands').then(
    data => {
      dispatch(updateAddCommand(data.commands));
    }
  );
};

const editCommand = (name, content, cooldown) => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph(`update(name: "${name}", content: "${content}", cooldown: ${cooldown}){id}`, jwt, 'commands').then(
    data => {
      dispatch(updateEditCommand(data.commands));
    }
  );
};

const delCommand = (id) => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph(`delete(id: "${id}"){id}`, jwt, 'commands').then(
    data => {
      dispatch(updateDelCommand(data.commands));
    }
  );
};

const loadSingleCommand = (id) => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph(`single(id: "${id}"){id}`, jwt, 'commands').then(
    data => {
      dispatch(updateSingleCommand(data.commands));
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
  loadSingleCommand,
  addCommand,
  editCommand,
  delCommand,
  verifyData
};
