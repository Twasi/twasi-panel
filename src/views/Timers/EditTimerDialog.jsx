import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import { Row, Col } from 'react-grid-system';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage, injectIntl } from 'react-intl';

import './_style.css';

import { timerSelectors, timerOperations } from '../../state/timedmessages';

class Timer extends React.Component {

  state = {
    timerEnabled: true,
    labelWidth: 45,
    interval: 1,
  };

  componentDidMount() {
    const { updateTimer, timerObject } = this.props;
    updateTimer();
    this.setState({
      timerEnabled: timerObject.enabled,
      interval: timerObject.interval/60,
    });
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleChange = (event, interval) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ interval });
  };

  handleEditTimer = (command,enabled,newCommand,newInterval) => {
    this.props.editTimer(command,enabled,newCommand,newInterval);
  };

  handleSetTimerActive = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  getIntervalInSeconds() {
    let iv = this.state.interval;
    iv = iv*60;
    return iv;
  }

  getCooldown() {
    let iv = this.state.interval;

    if (iv <= 60) {
      if (iv === 0) {
        return '1 Minute';
      } else if (iv === 60) {
        iv = 1;
        return `${iv} Stunde`;
      }
      if (iv > 1) {
        return `${iv} Minuten`;
      }
      return `${iv} Minute`;
    }
    return 'Fehler';
  }

  render() {
    const { onClose, timerObject, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              Timer {timerObject.command} bearbeiten
            </h4>
            <small>
              <FormattedMessage id="timers.edit_timer.subheadline" />
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <Typography style={{ paddingTop: '8px', paddingLeft: '12px', fontSize: '0.775rem' }}>Interval: {this.getCooldown()}</Typography>
              <Slider
                style={{ padding: '22px 0px' }}
                aria-labelledby="label"
                value={this.state.interval}
                min={1}
                max={60}
                step={1}
                onChange={this.handleChange}
              />
              <Typography style={{ paddingLeft: '12px', fontSize: '0.775rem' }}>
                <FormattedMessage id="timers.new_timer.interval.subtitle" />
              </Typography>
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <Row>
                <Col style={{ textAlign: 'left' }} sm={6}>
                  <Typography style={{ padding: '7px' }}>
                    <small><FormattedMessage id="timers.edit_timer.activate" /></small>
                  </Typography>
                </Col>
                <Col style={{ textAlign: 'right' }} sm={6}>
                  <Switch checked={this.state.timerEnabled} onChange={this.handleSetTimerActive('timerEnabled')} color="primary" />
                </Col>
              </Row>
            </CardContent>
          </Card>
          <Button
            fullWidth
            style={{ marginTop: '15px' }}
            variant="contained"
            color="primary"
            onClick={() => {
                this.handleEditTimer(timerObject.command, this.state.timerEnabled, timerObject.command, this.getIntervalInSeconds())
            }}>
            <FormattedMessage id="timers.new_timer.savetimer" />
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

Timer.propTypes = {
  onClose: PropTypes.func,
};

const mapStateToProps = state => ({
  timers: timerSelectors.getTimer(state),
  isActionSuccess: timerSelectors.isActionSuccess(state)
});

const mapDispatchToProps = dispatch => ({
  updateTimer: () => dispatch(timerOperations.loadTimer()),
  editTimer: (command,enabled,newCommand,newInterval) => dispatch(timerOperations.editTimer(command,enabled,newCommand,newInterval))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Timer));
