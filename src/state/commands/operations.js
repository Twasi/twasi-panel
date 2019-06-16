import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../services/graphqlService';

const {
    updateCommands,
    updateSingleCommand,
    updateAddCommand,
    updateEditCommand,
    updateDelCommand,
    updateIsLoading,
    updateDisabled
} = actions;

const loadCommands = () => dispatch => {
    dispatch(updateIsLoading(true));

    dispatch(getGraph('commands{id,name,content,uses,cooldown}', 'commands')).then(data => {
        if (data == null) {
            dispatch(updateDisabled(true));
            return;
        }
        dispatch(updateCommands(data.commands));
    }).finally(() => {
        dispatch(updateIsLoading(false))
    });
};

const addCommand = (name, content, cooldown) => dispatch => {
    dispatch(getGraph(`create(name: "${name}", content: "${content}", cooldown: ${cooldown}){id}`, 'commands')).then(
        data => {
            dispatch(updateAddCommand(data.commands));
        }
    );
};

const editCommand = (name, content, cooldown) => dispatch => {
    dispatch(getGraph(`update(name: "${name}", content: "${content}", cooldown: ${cooldown}){id}`, 'commands')).then(
        data => {
            dispatch(updateEditCommand(data.commands));
        }
    );
};

const delCommand = id => dispatch => {
    dispatch(getGraph(`delete(id: "${id}"){id}`, 'commands')).then(
        data => {
            dispatch(updateDelCommand(data.commands));
        }
    );
};

const loadSingleCommand = id => dispatch => {
    dispatch(getGraph(`single(id: "${id}"){id}`, 'commands')).then(
        data => {
            dispatch(updateSingleCommand(data.commands));
        }
    );
};

const verifyData = () => (dispatch, getState) => {
    const state = getState();

    const isLoaded = selectors.isLoaded(state);

    if (!isLoaded) {
        dispatch(loadCommands());
    }
};

export default {
    loadCommands,
    loadSingleCommand,
    addCommand,
    editCommand,
    delCommand,
    verifyData
};
