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
import CommandDialog from './CommandDialog';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';

import NotInstalledAlert from '../NotInstalledAlert/NotInstalledAlert.jsx';

import { commandsSelectors, commandsOperations } from '../../state/commands';

class Commands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);

    this.renderCommands = this.renderCommands.bind(this);
  }

  componentDidMount() {
    const { updateCommands } = this.props;
    updateCommands();
  }

  handleClose() {
    this.setState({ open: false });
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
        <TableCell>1.337</TableCell>
        <TableCell>
          <Checkbox
            checked=""
            onChange=""
            value="access_commands"
            color="primary"
          />
        </TableCell>
        <TableCell>
          <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
            <Button
              variant="fab"
              color="primary"
              className="noshadow"
              mini
              aria-label="editCommand"
            >
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
            >
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
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.commands" /></Typography>
        </Breadcrumbs>
        {!disabled &&
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <h4 className="pageContainerTitle">
            <FormattedMessage id="commands.title" />
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updateCommands}>
                <Icon style={{ marginRight: '5px' }}>cached</Icon>
                <FormattedMessage id="common.refresh" />
              </Button>
              <Button onClick={() => this.setState({ open: true })} variant="contained" color="primary" disabled={disabled}>
                <FormattedMessage id="commands.new_command" />
              </Button>
              <CommandDialog
                open={this.state.open}
                onClose={this.handleClose}
              />
            </span>
          </h4>
          <small>
            Hier hast du die Möglichkeit deine Chatbefehle zu verwalten.
          </small>
        </Paper>
        }{!disabled &&
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell>Befehl</TableCell>
                <TableCell>Ausgabe</TableCell>
                <TableCell>Zugriff</TableCell>
                <TableCell>Uses</TableCell>
                <TableCell>Aktiviert</TableCell>
                <TableCell style={{ minWidth: '100px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderCommands()}
            </TableBody>
          </Table>
        </Paper>
        }{disabled && <NotInstalledAlert />}
      </div>
    );
  }
}

Commands.propTypes = {
  updateCommands: PropTypes.func.isRequired,
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
  verifyData: () => dispatch(commandsOperations.verifyData()),
  updateCommands: () => dispatch(commandsOperations.loadCommands())
});

export default connect(mapStateToProps, mapDispatchToProps)(Commands);
