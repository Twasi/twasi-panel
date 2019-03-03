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
import TimersDialog from './TimersDialog';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const timers = [{name: '!hosts', output: 'Zeigt die Liste der Kanäle, die deinen Kanal derzeit hosten.', interval: '10'}];

class Timers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  renderCommands() {

    return timers.map(timer => (
      <TableRow>
        <TableCell>
          <b>{timer.name}</b>
        </TableCell>
        <TableCell
          style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '200px' }}
        >
          {timer.output}
        </TableCell>
        <TableCell>{timer.interval} Minuten</TableCell>
        <TableCell>
          <Chip
            label="Aktiviert"
            color="primary"
          />
        </TableCell>
        <TableCell>
          <Tooltip title="Bearbeiten" placement="top">
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
          <Tooltip title="Löschen" placement="top">
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
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.timers" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <h4 className="pageContainerTitle">
            <FormattedMessage id="timers.title" />
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updateCommands}>
                Aktualisieren
              </Button>
              <Button onClick={() => this.setState({ open: true })} variant="contained" color="primary">
                <FormattedMessage id="timers.new_timer" />
              </Button>
              <TimersDialog
                open={this.state.open}
                onClose={this.handleClose}
              />
            </span>
          </h4>
          <small>
            Hier hast du die Möglichkeit deine Timer zu verwalten.
          </small>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell>Timer</TableCell>
                  <TableCell>Ausgabe</TableCell>
                  <TableCell>Interval</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell style={{ minWidth: '100px' }}>Aktionen</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderCommands()}
              </TableBody>
            </Table>
        </Paper>
      </div>
    );
  }
}


export default Timers;
