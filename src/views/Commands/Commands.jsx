import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';

import CommandAddDialog from './CommandAddDialog';
import CommandEditDialog from './CommandEditDialog';
import NotInstalledAlert from '../NotInstalledAlert/NotInstalledAlert.jsx';

import { commandsSelectors, commandsOperations } from '../../state/commands';

class Commands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddCommandDialog: false,
      openEditCommandDialog: false,
      openNotification: false,
      notification: ''
    };
  }

  componentDidMount() {
    const { updateCommands } = this.props;
    updateCommands();
  }

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
    setTimeout(function() {
        this.props.updateCommands()
    }.bind(this), 100)
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

  renderCommands() {
    const { commands } = this.props;

    return commands.map(command => (
      <TableRow>
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
            label="Jeder"
            color="primary"
          />
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>{command.uses}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{this.getCooldown(command.cooldown)}</TableCell>
        <TableCell>
          <Checkbox
            checked=""
            onChange=""
            value="access_commands"
            color="primary"
          />
        </TableCell>
        <TableCell>
          <Tooltip title={<FormattedMessage id="common.edit" />} placement="top">
            <Button
              variant="fab"
              color="primary"
              className="noshadow"
              mini
              aria-label="editCommand"
              onClick={() => {
                  this.setState({ openEditCommandDialog: true })
              }}>
              <Icon style={{ color: '#ffffff' }}>edit</Icon>
            </Button>
          </Tooltip>{' '}
          <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
            <Button
              variant="fab"
              color="secondary"
              className="noshadow"
              mini
              aria-label="deleteCommand"
              onClick={() => {
                  this.props.delCommand(command.id);
                  this.handleOpenNotification(command.name)
              }}>
              <Icon style={{ color: '#ffffff' }}>delete</Icon>
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { disabled } = this.props;
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.commands" /></Typography>
        </Breadcrumbs>
        {!disabled &&
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography>
            <h3 className="pageContainerTitle">
              <FormattedMessage id="commands.title" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updateCommands}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ openAddCommandDialog: true })} variant="contained" color="primary" disabled={disabled}>
                  <FormattedMessage id="commands.new_command" />
                </Button>
              </span>
            </h3>
            <small>
              <FormattedMessage id="commands.subtitle" />
            </small>
          </Typography>
        </Paper>
        }{!disabled &&
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell><FormattedMessage id="commands.table.command" /></TableCell>
                <TableCell><FormattedMessage id="commands.table.output" /></TableCell>
                <TableCell><FormattedMessage id="commands.table.access" /></TableCell>
                <TableCell style={{ textAlign: 'center' }}><FormattedMessage id="commands.table.uses" /></TableCell>
                <TableCell style={{ textAlign: 'center' }}><FormattedMessage id="commands.table.cooldown" /></TableCell>
                <TableCell><FormattedMessage id="commands.table.active" /></TableCell>
                <TableCell style={{ minWidth: '100px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderCommands()}
            </TableBody>
          </Table>
          <CommandAddDialog
            open={this.state.openAddCommandDialog}
            onClose={this.handleCloseAddCommandDialog}
          />
          <CommandEditDialog
            open={this.state.openEditCommandDialog}
            onClose={this.handleCloseEditCommandDialog}
          />
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
        </Paper>
        }{disabled && <NotInstalledAlert />}
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
  isLoaded: commandsSelectors.isLoaded(state),
  disabled: commandsSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateCommands: () => dispatch(commandsOperations.loadCommands()),
  delCommand: (id) => dispatch(commandsOperations.delCommand(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Commands);
