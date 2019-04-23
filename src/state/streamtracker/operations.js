import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateLastStream,
  updateAllStreamData,
  updateDisabled
} = actions;

const loadLastStream = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('lastStream{streamId,language,startedAt,streamType,communityIds,tagIds,data{gameId,game,title,viewerCount,timestamp}}', jwt, 'streamtracker').then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateLastStream(data.lastStream));
  });
};

const loadAllStreamData = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);

  getUserGraph('allStreamData{gameId,game,title,viewerCount,timestamp}', jwt, 'streamtracker').then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateAllStreamData(data.allStreamData));
  });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadLastStream());
    dispatch(loadAllStreamData());
  }
};

export default {
  loadLastStream,
  loadAllStreamData,
  verifyData
};
