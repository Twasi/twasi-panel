import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Tom from '../common/resources/tom.gif';

import AddTimerDialog from './AddTimerDialog';
import EditTimerDialog from './EditTimerDialog';

import { timerSelectors, timerOperations } from '../../state/timedmessages';

class Timers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openAddTimerDialog: false,
      openEditTimerDialog: false,
      editTimerDialogContent: ''
    };
  }

  componentDidMount() {
    const { updateTimer } = this.props;
    updateTimer();
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleCloseAddTimerDialog = () => {
    this.setState({ openAddTimerDialog: false });
  };

  handleCloseEditTimerDialog = () => {
    this.setState({ openEditTimerDialog: false });
  };

  getIntervalInMinutes(iv) {
    iv = iv/60
    if(iv===1){
      return "1 Minute";
    }
    if(iv===60){
      return "1 Stunde";
    }
    return iv + " Minuten";
  }

  renderTimersEmpty() {
    return (
      <Paper className="pageContainer" style={{ marginTop: '0px', paddingTop: '1px' }}>
        <Typography component={'div'} style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
          <img
            style={{ position: 'relative', height: '150px' }}
            src={Tom}
            alt="Tom"
          />
          <h3 className="pageContainerTitle">
            <FormattedMessage id="timers.no_timer.title" />
          </h3>
          <small>
            <FormattedMessage id="timers.no_timer.subtitle" />
          </small>
          <br /><br />
          <Button onClick={() => this.setState({ openAddTimerDialog: true })} variant="contained" color="primary" disabled={this.props.disabled}>
            <FormattedMessage id="timers.new_timer" />
          </Button>
        </Typography>
      </Paper>
    );
  }

  renderTimers() {
    const { timers } = this.props;
    return timers.map(timer => (
      <TableRow key={timer.name}>
        <TableCell>
          <b>{timer.command}</b>
        </TableCell>
        <TableCell>{this.getIntervalInMinutes(timer.interval)}</TableCell>
        <TableCell>
          {timer.enabled ?
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.enableTimer(timer.command, false)}
          > Aktiviert </Button> :
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.props.enableTimer(timer.command, true)}
          > Deaktiviert </Button>
          }
        </TableCell>
        <TableCell>
          <Tooltip title={<FormattedMessage id="common.edit" />} placement="top">
            <Fab
              color="primary"
              className="noshadow"
              size="small"
              aria-label="editTimer"
               onClick={() => this.setState({ openEditTimerDialog: true, editTimerDialogContent: timer })}
            >
              <Icon style={{ color: '#ffffff' }}>edit</Icon>
            </Fab>
          </Tooltip>{' '}
          <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
            <Fab
              color="secondary"
              className="noshadow"
              size="small"
              aria-label="deleteTimer"
              onClick={() => {
                  this.props.delTimer(timer.command);
              }}
            >
              <Icon style={{ color: '#ffffff' }}>delete</Icon>
            </Fab>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    if (this.props.isActionSuccess) {
      this.props.updateTimer()
    }
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.timers" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="timers.title" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updateTimer}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ openAddTimerDialog: true })} variant="contained" color="primary">
                  <FormattedMessage id="timers.new_timer" />
                </Button>
                {this.state.openAddTimerDialog &&
                  <AddTimerDialog
                    open={this.state.openAddTimerDialog}
                    onClose={this.handleCloseAddTimerDialog}
                  />
                }
                {this.state.openEditTimerDialog &&
                  <EditTimerDialog
                    open={this.state.openEditTimerDialog}
                    onClose={this.handleCloseEditTimerDialog}
                    timerObject={this.state.editTimerDialogContent}
                  />
                }
              </span>
            </h4>
            <small>
              <FormattedMessage id="timers.subtitle" />
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell><FormattedMessage id="timers.timer" /></TableCell>
                <TableCell><FormattedMessage id="timers.interval" /></TableCell>
                <TableCell><FormattedMessage id="timers.status" /></TableCell>
                <TableCell style={{ width: '120px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderTimers()}
            </TableBody>
          </Table>
        </Paper>
        {this.renderTimers().length === 0 && !this.props.isLoading && this.renderTimersEmpty()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timers: timerSelectors.getTimer(state),
  isLoaded: timerSelectors.isLoaded(state),
  isLoading: timerSelectors.isLoading(state),
  disabled: timerSelectors.isDisabled(state),
  isActionSuccess: timerSelectors.isActionSuccess(state)
});

const mapDispatchToProps = dispatch => ({
  updateTimer: () => dispatch(timerOperations.loadTimer()),
  delTimer: (command) => dispatch(timerOperations.delTimer(command)),
  enableTimer: (command, enabled) => dispatch(timerOperations.enableTimer(command, enabled))
});

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
