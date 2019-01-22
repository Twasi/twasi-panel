import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  state = {
    issue: 10,
    labelWidth: 115,
  };

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          <FormattedMessage id="commands.new_command" />
        </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage id="commands.new_command_subheadline" />
            </DialogContentText>
            <br />
            <Card className="pluginCard">
              <CardContent className="pluginCardContent">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-textarea"
                  label={<FormattedMessage id="commands.new_command.command" />}
                  fullWidth
                  helperText="Das ist dein Befehl. Der Befehl wird so ausgelöst, wie du ihn hier hinterlegst."
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-textarea"
                  label={<FormattedMessage id="commands.new_command.output" />}
                  fullWidth
                  multiline
                  rows="3"
                  helperText="Das ist die Ausgabe deines Befehls. Du kannst Variablen nutzen, um die Ausgabe dynamisch zu gestallten."
                  margin="normal"
                  variant="outlined"
                />
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
