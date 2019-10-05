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
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage, injectIntl } from 'react-intl';

import { commandsSelectors, commandsOperations } from '../../state/commands';
import { variablesSelectors } from '../../state/variables';

import './_style.css';

class Command extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      commandName: "",
      commandContent: "",
      commandCooldown: 0,
      commandUses: 0,
      commandAccess: "",
      accessLevel: 0,
      accessLevelString: "",
      labelWidth: 115,
      cooldown: 0,
      openNotification: false,
      notification: ''
    };
  }

  componentDidMount() {
    const { commandObject, updateAccessLevels } = this.props;
    updateAccessLevels();
    this.setState({
      commandName: commandObject.name,
      commandContent: commandObject.content,
      commandCooldown: commandObject.cooldown,
      commandUses: commandObject.uses,
      commandAccessLevel: commandObject.accessLevel.value,
      commandAccessLevelName: commandObject.accessLevel.name,
      cooldown: this.getSliderValueByMilliseconds(commandObject.cooldown)
    });
  }

  handleOpenNotification = commandName => {
    this.setState({
      openNotification: true,
      modalOpen: false,
      notification: 'Der Befehl "' + commandName + '" wurde erfolgreich bearbeitet.'
    });
  };

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleChangeAccessLevel = (event, index) => {
    this.setState({
      commandAccessLevel: event.target.value,
      commandAccessLevelName: index.key
    });
  }

  handleCommandCooldown = (event, cooldown) => {
    this.setState({ cooldown: cooldown });
  };

  handleCommandNameChange = (event) => {
    if(event.target.value.length <= 50) {
      this.setState({
        commandName: event.target.value
      });
    }
  };

  handleCommandUsesChange = (event) => {
    if(!isNaN((event.target.value))) {
      this.setState({
        commandUses: event.target.value
      });
    }
  };

  handleCommandContentChange = (event) => {
    if(event.target.value.length <= 1000) {
      this.setState({
        commandContent: event.target.value
      });
    }
  };

  handleEditCommand = (id, name, content, cooldown, access, uses) => {
    this.props.editCommand(id, name, content, cooldown, access, uses);
    this.props.onClose(this.props.selectedValue);
  };

  getSliderValueByMilliseconds(ms) {
    let minutes = 0;
    if (ms <= 60) {
      return ms;
    } else if (ms > 60) {
        minutes = 60 + (ms/60);
        return minutes-1;
    }
  }

  getCooldownString(cd) {
    if (cd <= 59) {
      if (cd === 0) {
        return this.props.intl.formatMessage({ id: "commands.cooldown.no_cooldown" });
      }
      if (cd > 1) {
        return cd + " " + this.props.intl.formatMessage({ id: "commands.cooldown.seconds" });
      }
      return cd + " " + this.props.intl.formatMessage({ id: "commands.cooldown.second" });
    } else if (cd >= 60) {
      cd -= 59;
      if (cd === 60) {
        return "1 " + this.props.intl.formatMessage({ id: "commands.cooldown.hour" });
      }
      if (cd > 1) {
        return cd + " " + this.props.intl.formatMessage({ id: "commands.cooldown.minutes" });
      }
      return cd + " " + this.props.intl.formatMessage({ id: "commands.cooldown.minute" });
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

  chipFilter = (item) => {
    this.setState({
      commandContent: this.state.commandContent+item+" "
    });
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
    const { commandObject, ...other } = this.props;
    if (this.props.isActionSuccess) {
      this.props.updateCommands()
    }
    return (
      <Dialog
        {...other}
        scroll="body"
      >
        <DialogContent>
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              Befehl {commandObject.name} bearbeiten
            </h4>
            <small>
              <FormattedMessage id="commands.edit_command.subheadline" />
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
                value={this.state.commandName}
                onChange={this.handleCommandNameChange}
                helperText={<FormattedMessage id="commands.new_command.command.helpertext" />}
                margin="normal"
                variant="outlined"
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
                value={this.state.commandContent}
                onChange={this.handleCommandContentChange}
                inputRef={this.textInput}
                multiline
                rows="3"
                helperText={this.props.intl.formatMessage({ id: "commands.new_command.output.helpertext" }) + " " + this.state.commandContent.length + "/1000"}
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <ExpansionPanel style={{ marginTop: '15px' }}>
            <ExpansionPanelSummary style={{ borderRadius: '15px 15px 0px 0px' }} expandIcon={<ExpandMoreIcon />}>
              <Typography component={'div'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="commands.new_command.variables" />
                </h4>
                <small>
                  <FormattedMessage id="commands.new_command.variables.helpertext" />
                </small>
              </Typography>
            </ExpansionPanelSummary>
            <Card style={{ borderRadius: '0px 0px 4px 4px' }} className="pluginCard">
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
                  value={this.state.commandAccessLevel}
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
              <FormControl style={{ marginTop: '16px' }} variant="outlined" fullWidth>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-textarea"
                  label="Uses"
                  fullWidth
                  value={this.state.commandUses}
                  onChange={this.handleCommandUsesChange}
                  helperText="Wie oft wurde der Befehl bereits genutzt"
                  margin="normal"
                  variant="outlined"
                />
              </FormControl>
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <Typography style={{ paddingTop: '8px', paddingLeft: '12px', fontSize: '0.775rem' }}><FormattedMessage id="commands.new_command.cooldown" />: {this.getCooldownString(this.state.cooldown)}</Typography>
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
                this.handleEditCommand(commandObject.id, this.state.commandName, this.state.commandContent, this.getSecondsFromCooldown(), this.state.commandAccessLevelName, this.state.commandUses)
                this.handleOpenNotification(this.state.commandName)
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
  editCommand: PropTypes.func.isRequired
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
  editCommand: (id, name, content, cooldown, accessLevel, uses) => dispatch(commandsOperations.editCommand(id, name, content, cooldown, accessLevel, uses)),
  verifyData: () => dispatch(commandsOperations.verifyData()),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Command));
