import actions from './actions';
import selectors from './selectors';

const { updateLoaded, updateDirty, updateLanguage } = actions;

const loadData = () => () => {};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  if (!selectors.isLoaded(state)) {
    dispatch(loadData());
  }
};

const pushChanges = () => () => {};

export default {
  updateLoaded,
  updateDirty,
  updateLanguage,
  verifyData,
  loadData,
  pushChanges
};
