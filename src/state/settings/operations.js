import actions from './actions';
import selectors from './selectors';

import settings from '../../services/settings/settings.service';

const { updateLoaded, updateDirty, updateLanguage } = actions;

const loadData = () => dispatch =>
  settings.get().then(data => {
    dispatch(updateLanguage(data.language));
    dispatch(updateLoaded(true));
  });

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  if (!selectors.isLoaded(state)) {
    dispatch(loadData());
  }
};

const pushChanges = () => (dispatch, getState) => {
  const state = getState();

  const request = selectors.getRequest(state);

  return settings.put(request).then(answer => {
    if (answer.status) {
      dispatch(updateDirty(false));
    }
  });
};

export default {
  updateLoaded,
  updateDirty,
  updateLanguage,
  verifyData,
  loadData,
  pushChanges
};
