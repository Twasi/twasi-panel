import React from 'react';
import PropTypes from 'prop-types';
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
import { FormattedMessage } from 'react-intl';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';

import './_style.css';

class Command extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleChange = (event, cooldown) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ cooldown });
  };

  state = {
    issue: 10,
    labelWidth: 115,
    cooldown: 0
  };

  getCooldown() {
    if (this.state.cooldown <= 59) {
      if (this.state.cooldown === 0) {
        return 'Keinen Cooldown festgelegt';
      }
      if (this.state.cooldown > 1) {
        return `${this.state.cooldown} Sekunden`;
      }
      return `${this.state.cooldown} Sekunde`;
    } else if (this.state.cooldown >= 60) {
      this.state.cooldown -= 59;
      if (this.state.cooldown === 60) {
        return '1 Stunde';
      }
      if (this.state.cooldown > 1) {
        return `${this.state.cooldown} Minuten`;
      }
      return `${this.state.cooldown} Minute`;
    }
    return 'Fehler';
  }

  render() {
    const { classes, onClose, ...other } = this.props;
    const { cooldown } = this.state;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Typography>
            <h3 className="pageContainerTitle">
              <FormattedMessage id="commands.new_command" />
            </h3>
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
                placeholder="Beispiel: !bot"
                helperText="Das ist dein Befehl. Der Befehl wird so ausgelöst, wie du ihn hier hinterlegst."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
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
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.output" />}
                fullWidth
                placeholder="Beispiel: Mein Bot heißt Twasibot."
                multiline
                rows="3"
                helperText="Das ist die Ausgabe deines Befehls. Du kannst Variablen nutzen, um die Ausgabe dynamisch zu gestallten."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <FormControl style={{ marginTop: '16px' }} variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="access-select"
                >
                  <FormattedMessage id="commands.new_command.access" />
                </InputLabel>
                <Select
                  value={this.state.issue}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="access"
                      id="access-select"
                    />
                  }
                >
                  <MenuItem value={10}><FormattedMessage id="commands.new_command.everyone" /></MenuItem>
                  <MenuItem value={20}><FormattedMessage id="commands.new_command.subs" /></MenuItem>
                  <MenuItem value={30}><FormattedMessage id="commands.new_command.mods" /></MenuItem>
                  <MenuItem value={40}><FormattedMessage id="commands.new_command.streamer" /></MenuItem>
                </Select>
                <FormHelperText>Wer hat Zugriff auf den Befehl?</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <Typography style={{ paddingTop: '8px', paddingLeft: '12px', fontSize: '0.775rem' }}>Cooldown: {this.getCooldown()}</Typography>
              <Slider
                style={{ padding: '22px 0px' }}
                aria-labelledby="label"
                value={cooldown}
                min={0}
                max={119}
                step={1}
                onChange={this.handleChange}
              />
              <Typography style={{ paddingLeft: '12px', fontSize: '0.775rem' }}>Hier kannst du einen Cooldown von bis zu einer Stunde einstellen.</Typography>
            </CardContent>
          </Card>
          <Button fullWidth style={{ borderRadius: '4px', marginTop: '15px' }} variant="contained" color="primary">
            <FormattedMessage id="commands.new_command.savecommand" />
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

Command.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.isRequired
};

export default (Command);
