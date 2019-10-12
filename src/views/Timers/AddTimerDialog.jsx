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
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { Row, Col } from 'react-grid-system';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage, injectIntl } from 'react-intl';

import './_style.css';

import { commandsSelectors, commandsOperations } from '../../state/commands';
import { timerSelectors, timerOperations } from '../../state/timedmessages';

class Timer extends React.Component {

  state = {
    commandName: "",
    timerEnabled: true,
    labelWidth: 45,
    interval: 1,
  };

  componentDidMount() {
    const { updateCommands, updateTimer, updatePluginCommands } = this.props;
    updateCommands();
    updateTimer();
    updatePluginCommands();
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

  handleChangeCommand = (event, index) => {
    this.setState({
      commandName: index.key
    });
  }

  handleAddTimer = (command, interval, enabled) => {
    this.props.addTimer(command, interval, enabled);
    this.clearStates();
  };

  handleSetTimerActive = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  clearStates() {
    this.setState({
      commandName: "",
      interval: 1,
      timerEnabled: true
    });
  }

  renderCommands() {
    const { commands, timers } = this.props;
    var usedCommands = [];
    timers.forEach(function(timer) {
      usedCommands.push(timer.command)
    })
    return commands.map(command => (
        !usedCommands.includes(command.name) &&
        <MenuItem key={command.name} value={command.name}>
          <Grid container>
            <Grid item xs={6}>
              {command.name}
            </Grid>
            <Grid item xs={6}>
              <Chip size="small" style={{ float: 'right' }} label="Eigener Befehl"/>
            </Grid>
          </Grid>
        </MenuItem>
    ));
  }

  renderPluginCommands() {
    const { pluginCommands, timers } = this.props;
    var usedCommands = [];
    timers.forEach(function(timer) {
      usedCommands.push(timer.command)
    })
    return pluginCommands.map(pluginCommand => (
        !usedCommands.includes("!"+pluginCommand.commandName) && pluginCommand.timer &&
        <MenuItem key={"!"+pluginCommand.commandName} value={"!"+pluginCommand.commandName}>
          <Grid container>
            <Grid item xs={6}>
              {"!"+pluginCommand.commandName}
            </Grid>
            <Grid item xs={6}>
              <Chip color="primary" size="small" style={{ float: 'right' }} label={pluginCommand.providingPlugin}/>
            </Grid>
          </Grid>
        </MenuItem>
    ));
  }

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
    const { onClose, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="timers.new_timer" />
            </h4>
            <small>
              <FormattedMessage id="timers.new_timer.subheadline" />
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <FormControl style={{ marginTop: '16px' }} variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="access-select"
                >
                  <FormattedMessage id="timers.new_timer.command" />
                </InputLabel>
                <Select
                  value={this.state.commandName}
                  onChange={this.handleChangeCommand}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="access"
                      id="access-select"
                    />
                  }
                >
                  {this.renderCommands()}
                  {this.renderPluginCommands()}
                </Select>
                <FormHelperText><FormattedMessage id="timers.new_timer.command.subtitle" /></FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
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
                    <small><FormattedMessage id="timers.new_timer.activate" /></small>
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
            disabled={this.state.commandName === ""}
            onClick={() => {
                this.handleAddTimer(this.state.commandName, this.getIntervalInSeconds(), this.state.timerEnabled)
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
  commands: commandsSelectors.getCommands(state),
  pluginCommands: commandsSelectors.getPluginCommands(state),
  timers: timerSelectors.getTimer(state),
  isActionSuccess: timerSelectors.isActionSuccess(state)
});

const mapDispatchToProps = dispatch => ({
  updateCommands: () => dispatch(commandsOperations.loadCommands()),
  updatePluginCommands: () => dispatch(commandsOperations.loadPluginCommands()),
  updateTimer: () => dispatch(timerOperations.loadTimer()),
  addTimer: (command,interval,enabled) => dispatch(timerOperations.addTimer(command,interval,enabled))
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Timer));
