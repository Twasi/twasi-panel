import actions from './actions';
import selectors from './selectors';

import {getGraph} from '../../services/graphqlService';

const {
    updateAccessLevels,
    updateCommands,
    updatePagination,
    updatePluginCommands,
    updateSingleCommand,
    updateAddCommand,
    updateEditCommand,
    updateDelCommand,
    updateDisabled,
    updateLoaded,
    updateLoading,
    updateActionSuccess
} = actions;

const loadAccessLevels = () => dispatch => {
    dispatch(getGraph('accessLevels{name,value}', 'commands')).then(data => {
        dispatch(updateAccessLevels(data.accessLevels));
    })
};

const loadCommands = page => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`commands{content(page: ${page}){id,name,content,uses,cooldown,accessLevel{name,value}},itemsPerPage,total,pages}`, 'commands')).then(data => {
        if (data == null) {
            dispatch(updateDisabled(true));
            return;
        }
        dispatch(updateCommands(data.commands.content));
        dispatch(updatePagination(data.commands));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

const loadPluginCommands = () => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph('user{pluginCommands{commandName,listed,providingPlugin,timer}}', 'panel')).then(data => {
        if (data == null) {
            dispatch(updateDisabled(true));
            return;
        }
        dispatch(updatePluginCommands(data.user.pluginCommands));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

const addCommand = (name, content, cooldown, accessLevel) => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`create(name: ${JSON.stringify(name)}, content: ${JSON.stringify(content)}, cooldown: ${cooldown}, accessLevel: "${accessLevel}"){id}`, 'commands')).then(
    data => {
      dispatch(updateAddCommand(data.commands));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const editCommand = (id, name, content, cooldown, accessLevel, uses) => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`update(id: "${id}", name: ${JSON.stringify(name)}, content: ${JSON.stringify(content)}, cooldown: ${cooldown}, accessLevel: "${accessLevel}", uses: ${uses}){id}`, 'commands')).then(
    data => {
      dispatch(updateEditCommand(data.commands));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const delCommand = id => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`delete(id: "${id}"){id}`, 'commands')).then(
    data => {
      dispatch(updateDelCommand(data.commands));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const loadSingleCommand = id => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`single(id: "${id}"){id}`, 'commands')).then(
    data => {
      dispatch(updateSingleCommand(data.commands));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
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
    loadPluginCommands,
    loadAccessLevels,
    loadSingleCommand,
    addCommand,
    editCommand,
    delCommand,
    verifyData,
    updateLoaded,
    updateLoading,
    updatePagination,
    updateActionSuccess
};
