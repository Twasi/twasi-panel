import actions from './actions';
import selectors from './selectors';

import { getUserGraph } from '../../services/graphqlService';
import { authSelectors } from '../auth';

const {
  updateStreamtracker,
  updateGlobalStreamtracker,
  updateDisabled
} = actions;

const loadStreamtracker = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);
  getUserGraph('lastStream{streamId,language,startedAt,streamType,communityIds,tagIds,data{gameId,game,title,viewerCount,timestamp,chatMessages},topChatters{twitchId,displayName,messages,commands}}', jwt, 'streamtracker').then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateStreamtracker(data.lastStream));
  });
};
const loadGlobalStreamtracker = () => (dispatch, getState) => {
  const state = getState();
  const jwt = authSelectors.getJwt(state);
  getUserGraph('globalStats{totalTrackedViewers,totalTrackedStreams,totalTrackedMessages}', jwt, 'streamtracker').then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateGlobalStreamtracker(data.globalStats));
  });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadStreamtracker());
    dispatch(loadGlobalStreamtracker());
  }
};

export default {
  loadStreamtracker,
  loadGlobalStreamtracker,
  verifyData
};
