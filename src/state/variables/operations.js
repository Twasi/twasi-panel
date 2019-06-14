import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateVariables,
  updateDisabled
} = actions;

const loadVariables = () => dispatch => {
  dispatch(getGraph('allVariables{id,name,output}', 'customvariables')).then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateVariables(data.allVariables));
  });
};

const verifyData = () => (dispatch, getState) => {
  const state = getState();

  const isLoaded = selectors.isLoaded(state);

  if (!isLoaded) {
    dispatch(loadVariables());
  }
};

export default {
  loadVariables,
  verifyData
};
