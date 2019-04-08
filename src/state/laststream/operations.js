import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateLaststream,
  updateDisabled
} = actions;

const loadLaststream = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('lastStream{streamId,language,startedAt,streamType,communityIds,tagIds,data{gameId,title,viewerCount,timestamp}}', jwt, 'streamtracker').then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateLaststream(data.lastStream));
  });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadLaststream());
  }
};

export default {
  loadLaststream,
  verifyData
};
