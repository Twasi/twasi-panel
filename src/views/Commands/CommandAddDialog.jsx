import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage, injectIntl } from 'react-intl';

import { commandsSelectors, commandsOperations } from '../../state/commands';
import { variablesSelectors, variablesOperations } from '../../state/variables';

import './_style.css';

class Command extends React.Component {

  state = {
    commandName: "",
    commandContent: "",
    commandCooldown: 0,
    commandAccess: "VIEWER",
    accessLevel: 0,
    labelWidth: 115,
    cooldown: 0,
    openNotification: false,
    notification: ''
  };

  componentDidMount() {
    const { updateAccessLevels, updateVariables } = this.props;
    updateAccessLevels();
    updateVariables();
    this.textInput = React.createRef();
  }

  handleOpenNotification = commandName => {
    this.setState({
      openNotification: true,
      modalOpen: false,
      notification: 'Der Befehl "' + commandName + '" wurde erfolgreich erstellt.'
    });
  };

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleChangeAccessLevel = (event, index) => {
    this.setState({
      commandAccess: index.key,
      accessLevel: event.target.value
    });
  }

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleCommandCooldown = (event, cooldown) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ cooldown });
  };

  handleCommandNameChange = (event) => {
    this.setState({
      commandName: event.target.value
    });
  };

  handleCommandContentChange = (event) => {
    this.setState({
      commandContent: event.target.value
    });
  };

  chipFilter = (item) => {
    this.setState({
      commandContent: this.state.commandContent+item+" "
    });
    this.focusTextInput()
  }

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  clearTextInput() {
    this.setState({
      commandName: "",
      commandContent: "",
      commandAccess: "VIEWER",
      accessLevel: 0,
      commandCooldown: 0,
      cooldown: 0,
      issue: 10
    });
  }

  getCooldownString() {
    let cd = this.state.cooldown;

    if (cd <= 59) {
      if (cd === 0) {
        return this.props.intl.formatMessage({ id: "commands.cooldown.no_cooldown" });
      }
      if (cd > 1) {
        return cd + " " + this.props.intl.formatMessage({ id: "commands.cooldown.seconds" });
      }
      return cd + " " +  this.props.intl.formatMessage({ id: "commands.cooldown.second" });
    } else if (cd >= 60) {
      cd -= 59;
      if (cd === 60) {
        return "1 " +  this.props.intl.formatMessage({ id: "commands.cooldown.hour" });
      }
      if (cd > 1) {
        return cd + " " +  this.props.intl.formatMessage({ id: "commands.cooldown.minutes" });
      }
      return cd + " " +  this.props.intl.formatMessage({ id: "commands.cooldown.minute" });
    }
    return 'Error';
  }

  getSecondsFromCooldown() {
    let cd = this.state.cooldown;

    if (cd <= 59) {
      return cd;
    } else if (cd >= 60) {
      cd -= 59;
      if (cd === 60) {
        //return '1 Stunde';
        return 3600;
      }
      if (cd > 1) {
        //return `${cd} Minuten`;
        return cd * 60;
      }
      //return `${cd} Minute`;
      return cd * 60;
    }
    return 'Error';
  }

  renderVariables() {
    const { variables } = this.props;

    return variables.map(variable => (
      <Chip
        className="commandOutputChip"
        size="small"
        color="secondary"
        label={"$"+variable.name}
        onClick={ () => this.chipFilter("$"+variable.name) }/>
    ));
  }

  renderAccessLevels() {
    const { accessLevels } = this.props;
    return accessLevels.map(accessLevel => (
      <MenuItem key={accessLevel.name} value={accessLevel.value}><FormattedMessage id={"commands.new_command." + accessLevel.name} /></MenuItem>
    ));
  }

  render() {
    const { classes, onClose, ...other } = this.props;
    if (this.props.isActionSuccess) {
      this.props.updateCommands()
    }
    console.log(this.textInput)
    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
        scroll="body"
      >
        <DialogContent>
          <Typography>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="commands.new_command" />
            </h4>
            <small>
              <FormattedMessage id="commands.new_command.subheadline" />
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.command" />}
                fullWidth
                autoFocus
                inputRef={this.textInput}
                value={this.state.commandName}
                onChange={this.handleCommandNameChange}
                helperText={<FormattedMessage id="commands.new_command.command.helpertext" />}
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
            </CardContent>
          </Card>
          {/*
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.aliases" />}
                fullWidth
                placeholder="Beispiel: !chatbot, !twasi"
                helperText="Das sind Alternativen zu deinem Befehl, welche die selbe Ausgabe erzeugen. (Mit Komma trennen.)"
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          */}
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.output" />}
                fullWidth
                inputRef={this.textInput}
                value={this.state.commandContent}
                onChange={this.handleCommandContentChange}
                multiline
                rows="3"
                helperText={<FormattedMessage id="commands.new_command.output.helpertext" />}
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 1000 }}
              />
            </CardContent>
          </Card>
          <ExpansionPanel style={{ marginTop: '15px' }}>
            <ExpansionPanelSummary style={{ borderRadius: '15px 15px 0px 0px' }} expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="commands.new_command.variables" />
                </h4>
                <small>
                  <FormattedMessage id="commands.new_command.variables.helpertext" />
                </small>
              </Typography>
            </ExpansionPanelSummary>
            <Card style={{ borderRadius: '0px' }} className="pluginCard">
              <CardContent style={{ padding: '24px', borderRadius: '0px 0px 15px 15px' }}>
                <Chip
                  className="commandOutputChip"
                  size="small"
                  color="primary"
                  label="$sender"
                  onClick={ () => this.chipFilter("$sender") }
                />
                <Chip
                  className="commandOutputChip"
                  size="small"
                  color="primary"
                  label="$streamer"
                  onClick={ () => this.chipFilter("$streamer") }
                />
                <Chip
                  className="commandOutputChip"
                  size="small"
                  color="primary"
                  label="$readapi()"
                  onClick={ () => this.chipFilter("$readapi()") }
                />
                <Chip
                  className="commandOutputChip"
                  size="small"
                  color="primary"
                  label="$random()"
                  onClick={ () => this.chipFilter("$random()") }
                />
                <Chip
                  className="commandOutputChip"
                  size="small"
                  color="primary"
                  label="$args()"
                  onClick={ () => this.chipFilter("$args()") }
                />
                <Chip
                  className="commandOutputChip"
                  size="small"
                  color="primary"
                  label="$uses"
                  onClick={ () => this.chipFilter("$uses") }
                />
                <Chip
                  className="commandOutputChip"
                  size="small"
                  color="primary"
                  label="$viewtime"
                  onClick={ () => this.chipFilter("$viewtime") }
                />
                {this.renderVariables()}
              </CardContent>
            </Card>
          </ExpansionPanel>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <FormControl style={{ marginTop: '16px' }} variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="access-select"
                >
                  <FormattedMessage id="commands.new_command.access" />
                </InputLabel>
                <Select
                  value={this.state.accessLevel}
                  onChange={this.handleChangeAccessLevel}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="access"
                      id="access-select"
                    />
                  }
                >
                  {this.renderAccessLevels()}
                </Select>
                <FormHelperText><FormattedMessage id="commands.new_command.access.subtitle" /></FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <Typography style={{ paddingTop: '8px', paddingLeft: '12px', fontSize: '0.775rem' }}><FormattedMessage id="commands.new_command.cooldown" />: {this.getCooldownString()}</Typography>
              <Slider
                style={{ padding: '22px 0px' }}
                aria-labelledby="label"
                value={this.state.cooldown}
                min={0}
                max={119}
                step={1}
                onChange={this.handleCommandCooldown}
              />
              <Typography style={{ paddingLeft: '12px', fontSize: '0.775rem' }}><FormattedMessage id="commands.new_command.cooldown.helpertext" /></Typography>
            </CardContent>
          </Card>
          <Button
            disabled={!this.state.commandName.trim() || !this.state.commandContent.trim()}
            fullWidth
            style={{ marginTop: '15px' }}
            variant="contained"
            color="primary"
            onClick={() => {
                this.props.addCommand(this.state.commandName, this.state.commandContent, this.getSecondsFromCooldown(), this.state.commandAccess);
                this.handleOpenNotification(this.state.commandName)
                this.clearTextInput()
            }}>
            <FormattedMessage id="commands.new_command.savecommand" />
          </Button>
        </DialogContent>
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
      </Dialog>
    );
  }
}

Command.propTypes = {
  addCommand: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  accessLevels: commandsSelectors.getAccessLevels(state),
  variables: variablesSelectors.getVariables(state),
  isLoaded: commandsSelectors.isLoaded(state),
  disabled: commandsSelectors.isDisabled(state),
  isActionSuccess: commandsSelectors.isActionSuccess(state)
});

const mapDispatchToProps = dispatch => ({
  updateCommands: () => dispatch(commandsOperations.loadCommands()),
  updateAccessLevels: () => dispatch(commandsOperations.loadAccessLevels()),
  addCommand: (name, content, cooldown, accessLevel) => dispatch(commandsOperations.addCommand(name, content, cooldown, accessLevel)),
  verifyData: () => dispatch(commandsOperations.verifyData()),
  updateVariables: () => dispatch(variablesOperations.loadVariables())
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Command));
