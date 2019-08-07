import actions from './actions';
import selectors from './selectors';

import { getGraph } from '../../services/graphqlService';

const {
  updateVariables,
  updateAddVariable,
  updateEditVariable,
  updateRemoveVariable,
  updateDisabled,
  updateLoading
} = actions;

const loadVariables = () => dispatch => {
  dispatch(updateLoading(true));
  dispatch(getGraph('allVariables{id,name,output}', 'customvariables')).then(data => {
    if (data == null) {
      dispatch(updateDisabled(true));
      return;
    }
    dispatch(updateVariables(data.allVariables));
    dispatch(updateLoading(false));
  });
};

const addVariable = (name, output) => dispatch => {
    dispatch(getGraph(`addVariable(name: "${name}", output: "${output}")`, 'customvariables')).then(
        data => {
            dispatch(updateAddVariable(data.customvariables));
        }
    );
};

const editVariable = (id, name, output) => dispatch => {
    dispatch(getGraph(`editVariable(id: "${id}",name: "${name}", output: "${output}")`, 'customvariables')).then(
        data => {
            dispatch(updateEditVariable(data.customvariables));
        }
    );
};

const removeVariable = (id) => dispatch => {
    dispatch(getGraph(`removeVariable(id: "${id}")`, 'customvariables')).then(
        data => {
            dispatch(updateRemoveVariable(data.customvariables));
        }
    );
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
  addVariable,
  editVariable,
  removeVariable,
  verifyData,
  updateLoading,
};
