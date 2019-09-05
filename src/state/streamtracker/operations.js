import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateStreamtracker,
  updateGlobalStreamtracker,
  updateUsers,
  updateDisabled,
  updateLoading,
  updateLoaded,
  updateNoStreamData,
  updateGlobalLoading
} = actions;

const loadStreamtracker = () => dispatch => {
  dispatch(updateLoading(true));
  dispatch(getGraph('lastStream{streamId,language,startedAt,streamType,communityIds,tagIds,newFollowers,newViews,data{gameId,game,title,viewerCount,timestamp,chatMessages,chatCommands},topChatters{twitchId,displayName,messages,commands}}', 'streamtracker')).then(data => {
    if (data.lastStream == null) {
      dispatch(updateLoading(false));
      dispatch(updateNoStreamData(true));
      dispatch(updateLoaded(true));
      return;
    }
    dispatch(updateStreamtracker(data.lastStream));
    dispatch(updateLoading(false));
    dispatch(updateNoStreamData(false));
    dispatch(updateLoaded(true));
  });
};

const loadGlobalStreamtracker = () => dispatch => {
  dispatch(updateGlobalLoading(true));
  dispatch(getGraph('globalStats{totalTrackedViewers,totalTrackedStreams,totalTrackedMessages,viewTime{minutes}}', 'streamtracker')).then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateGlobalStreamtracker(data.globalStats));
    dispatch(updateGlobalLoading(false));
  });
};

const loadUsers = () => dispatch => {
  dispatch(getGraph('liveBotUsers{viewerCount,channelData{BroadcasterLanguage,BroadcasterSoftware,BroadcasterType,Description,DisplayName,Followers,Game,Id,Language,Logo,Mature,Name,Partner,ProfileBanner,ProfileBannerBackground,ProfileBannerBackgroundColor,Status,Url,VideoBanner,Views}}', 'streamtracker')).then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateUsers(data.liveBotUsers));
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
  loadUsers,
  verifyData,
  updateLoaded,
  updateLoading,
  updateNoStreamData,
  updateGlobalLoading
};
