import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
//import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';

import CommandAddDialog from './CommandAddDialog';
import CommandEditDialog from './CommandEditDialog';
import NotInstalledAlert from '../NotInstalledAlert/NotInstalledAlert.jsx';

import JohnTravolta from '../common/resources/johntravolta.gif';

import { commandsSelectors, commandsOperations } from '../../state/commands';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

class Commands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddCommandDialog: false,
      openEditCommandDialog: false,
      openNotification: false,
      notification: '',
      editDialogContent: '',
      value: 0,
      page: 1
    };
  }

  componentDidMount() {
    const { updateCommands, updatePluginCommands } = this.props;
    updateCommands(this.state.page);
    updatePluginCommands();
  }

  handleChange = (event, value) => {
    this.setState({
      value,
    });
  };

  handleCloseAddCommandDialog = () => {
    this.setState({ openAddCommandDialog: false });
  };

  handleCloseEditCommandDialog = () => {
    this.setState({ openEditCommandDialog: false });
  };

  handleOpenNotification = commandName => {
    this.setState({
      openNotification: true,
      notification: 'Der Befehl "' + commandName + '" wurde erfolgreich gelöscht.'
    });
  };

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  };

  getCooldown(seconds) {
    if (seconds <= 59) {
      if (seconds === 0) {
        return 'Kein Cooldown';
      }
      if (seconds > 1) {
        return `${seconds} Sekunden`;
      }
      return `${seconds} Sekunde`;
    } else if (seconds >= 60) {
      if (seconds === 3600) {
        return '1 Stunde';
      }
      if (seconds === 60) {
        return '1 Minute';
      }
      if (seconds > 60) {
        seconds = seconds / 60
        return `${seconds} Minuten`;
      }
    }
    return 'Fehler';
  }

  renderCommandsEmpty() {
    return (
      <Paper className="pageContainer" style={{ marginTop: '0px', paddingTop: '1px', borderRadius: '0px 0px 4px 4px' }}>
        <Typography component={'div'} style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
          <img
            style={{ position: 'relative', height: '150px' }}
            src={JohnTravolta}
            alt="JohnTravolta"
          />
          <h3 className="pageContainerTitle">
            <FormattedMessage id="commands.no_command.title" />
          </h3>
          <small>
            <FormattedMessage id="commands.no_command.subtitle" />
          </small>
          <br /><br />
          <Button onClick={() => this.setState({ openAddCommandDialog: true })} variant="contained" color="primary" disabled={this.props.disabled}>
            <FormattedMessage id="commands.new_command" />
          </Button>
        </Typography>
      </Paper>
    );
  }

  renderPagination() {
    const { pagination, updateCommands } = this.props;
    return (
      <Paper style={{ textAlign: 'center' }} className="pageContainer">
      {_.times(pagination.pages, i =>
        <Fab
          key={i+1}
          onClick={() => {
            updateCommands(i+1)
            this.setState({ page: i+1});
          }}
          style={{ marginLeft: '5px', marginRight: '5px' }}
          size="small"
          disabled={i+1 === this.state.page}
          color={i+1 === this.state.page ? "default" : "primary"}
        >
        {i+1}
        </Fab>
      )}
      </Paper>
    );
  }

  renderCommands() {
    const { commands } = this.props;
    return commands.map(command => (
      <TableRow key={command.id}>
        <TableCell>
          <b>{command.name}</b>
        </TableCell>
        <TableCell
          style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '200px' }}
        >
          {command.content}
        </TableCell>
        <TableCell>
          <Chip
            label={<FormattedMessage id={"commands.new_command." + command.accessLevel.name} />}
            color="primary"
          />
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>{command.uses}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{this.getCooldown(command.cooldown)}</TableCell>
        {/*
        <TableCell>
          <Checkbox
            checked=""
            onChange=""
            value="access_commands"
            color="primary"
          />
        </TableCell>
        */}
        <TableCell>
          <Tooltip title={<FormattedMessage id="common.edit" />} placement="top">
            <Fab
              color="primary"
              className="noshadow"
              size="small"
              aria-label="editCommand"
              onClick={() => {
                  this.setState({ openEditCommandDialog: true, editDialogContent: command })
              }}>
              <Icon className="actionButtons">edit</Icon>
            </Fab>
          </Tooltip>{' '}
          <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
            <Fab
              color="secondary"
              className="noshadow"
              size="small"
              aria-label="deleteCommand"
              onClick={() => {
                  this.props.delCommand(command.id);
                  this.handleOpenNotification(command.name)
              }}>
              <Icon className="actionButtons">delete</Icon>
            </Fab>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  }

  renderPluginCommands() {
    const { pluginCommands } = this.props;
    return pluginCommands.map(pluginCommand => (
      <TableRow key={pluginCommand.commandName}>
        <TableCell>
          <b>!{pluginCommand.commandName}</b>
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>
          <Chip
            label={pluginCommand.providingPlugin}
            color="primary"
          />
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>
          <Chip
            label={pluginCommand.timer ? <FormattedMessage id="common.yes" /> : <FormattedMessage id="common.no" />}
            color={pluginCommand.timer ? "primary" : "secondary"}
          />
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { disabled } = this.props;
    const { value } = this.state;
    if (this.props.isActionSuccess) {
      this.props.updateCommands(this.state.page)
    }
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.commands" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: '4px', padding: '0px' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
          >
            <Tab label={<FormattedMessage id="commands.title" />}/>
            <Tab label={<FormattedMessage id="commands.plugincommands.title" />}/>
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          {!disabled &&
          <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
            <Typography component={'span'}>
              <h4 className="pageContainerTitle">
                <FormattedMessage id="commands.title" />
                <span style={{ float: 'right' }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={() => {this.props.updateCommands(this.state.page)}}>
                    <Icon style={{ marginRight: '5px' }}>cached</Icon>
                    <FormattedMessage id="common.refresh" />
                  </Button>
                  <Button onClick={() => this.setState({ openAddCommandDialog: true })} variant="contained" color="primary" disabled={disabled}>
                    <FormattedMessage id="commands.new_command" />
                  </Button>
                </span>
              </h4>
              <small>
                <FormattedMessage id="commands.subtitle" />
              </small>
            </Typography>
          </Paper>
          }{!disabled && this.renderCommands(this.state.page).length !== 0 &&
          <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell><FormattedMessage id="commands.table.command" /></TableCell>
                  <TableCell><FormattedMessage id="commands.table.output" /></TableCell>
                  <TableCell><FormattedMessage id="commands.table.access" /></TableCell>
                  <TableCell style={{ textAlign: 'center' }}><FormattedMessage id="commands.table.uses" /></TableCell>
                  <TableCell style={{ textAlign: 'center' }}><FormattedMessage id="commands.table.cooldown" /></TableCell>
                  {/*<TableCell><FormattedMessage id="commands.table.active" /></TableCell>*/}
                  <TableCell style={{ width: '120px' }}><FormattedMessage id="common.actions" /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="anim">
                {this.renderCommands(this.state.page)}
              </TableBody>
            </Table>
            {this.props.pagination.pages !== 1 && this.renderPagination()}
          </Paper>
          }
          {this.state.openAddCommandDialog &&
            <CommandAddDialog
              open
              onClose={this.handleCloseAddCommandDialog}
            />
          }
          {this.state.openEditCommandDialog &&
            <CommandEditDialog
              open
              onClose={this.handleCloseEditCommandDialog}
              commandObject={this.state.editDialogContent}
            />
          }
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.openNotification}
            autoHideDuration={5000}
            onClose={this.handleCloseNotification}
            message={this.state.notification}
          />
          {disabled && <NotInstalledAlert />}
          {this.renderCommands(this.state.page).length === 0 && !this.props.isLoading && this.renderCommandsEmpty()}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
            <Typography component={'span'}>
              <h4 className="pageContainerTitle">
                <FormattedMessage id="commands.plugincommands.title" />
                <span style={{ float: 'right' }}>
                  <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updatePluginCommands}>
                    <Icon style={{ marginRight: '5px' }}>cached</Icon>
                    <FormattedMessage id="common.refresh" />
                  </Button>
                </span>
              </h4>
              <small>
                <FormattedMessage id="commands.plugincommands.subtitle" />
              </small>
            </Typography>
          </Paper>
          <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell><FormattedMessage id="commands.table.command" /></TableCell>
                  <TableCell style={{ textAlign: 'center' }}><FormattedMessage id="commands.table.plugin" /></TableCell>
                  <TableCell style={{ textAlign: 'center' }}><FormattedMessage id="commands.table.usable_as_timer" /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="anim">
                {this.renderPluginCommands()}
              </TableBody>
            </Table>
          </Paper>
        </TabPanel>
      </div>
    );
  }
}

Commands.propTypes = {
  updateCommands: PropTypes.func.isRequired,
  delCommand: PropTypes.func.isRequired,
  commands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  commands: commandsSelectors.getCommands(state),
  pagination: commandsSelectors.getPagination(state),
  pluginCommands: commandsSelectors.getPluginCommands(state),
  isLoaded: commandsSelectors.isLoaded(state),
  isLoading: commandsSelectors.isLoading(state),
  isActionSuccess: commandsSelectors.isActionSuccess(state),
  disabled: commandsSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateCommands: page => dispatch(commandsOperations.loadCommands(page)),
  updatePluginCommands: () => dispatch(commandsOperations.loadPluginCommands()),
  delCommand: (id) => dispatch(commandsOperations.delCommand(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Commands);
