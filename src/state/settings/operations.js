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

/* const pushChanges = () => (dispatch, getState) => {
  const state = getState();

  // const request = selectors.getRequest(state);

  /* return settings.put(request).then(answer => {
    if (answer.status) {
      dispatch(updateDirty(false));
    }
  });
}; */
const pushChanges = () => () => {};

export default {
  updateLoaded,
  updateDirty,
  updateLanguage,
  verifyData,
  loadData,
  pushChanges
};
