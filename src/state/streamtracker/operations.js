import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateStreamtracker,
  updateGlobalStreamtracker,
  updateDisabled
} = actions;

const loadStreamtracker = () => dispatch => {
  dispatch(getGraph('lastStream{streamId,language,startedAt,streamType,communityIds,tagIds,newFollowers,newViews,data{gameId,game,title,viewerCount,timestamp,chatMessages,chatCommands},topChatters{twitchId,displayName,messages,commands}}', 'streamtracker')).then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateStreamtracker(data.lastStream));
  });
};

const loadGlobalStreamtracker = () => dispatch => {
  dispatch(getGraph('globalStats{totalTrackedViewers,totalTrackedStreams,totalTrackedMessages,viewTime{twitchId,displayName,minutes}}', 'streamtracker')).then(data => {
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
