import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateStreamtracker,
  updateDisabled
} = actions;

const loadStreamtracker = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('lastStream{streamId,language,startedAt,streamType,communityIds,tagIds,data{gameId,game,title,viewerCount,timestamp}}', jwt, 'streamtracker').then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateStreamtracker(data.lastStream));
  });
  getUserGraph('allStreamData{gameId,game,title,viewerCount,timestamp}', jwt, 'streamtracker').then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateStreamtracker(data.allStreamData));
  });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadStreamtracker());
  }
};

export default {
  loadStreamtracker,
  verifyData
};
