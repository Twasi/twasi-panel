import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import { FormattedMessage } from 'react-intl';

import './_style.css';

class Feedback extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          <FormattedMessage id="feedbackswitch.headline" />
        </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Du möchtest dazu beitragen, dass Twasi ein besserer Ort wird?<br />
              Hier hast du die Möglichkeit Feedback einzubringen, eigene Ideen zu vermitteln oder Bugs zu melden.
            </DialogContentText>
            <br />
            <Card className="pluginCard">
              <CardContent className="pluginCardContent">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel
                    htmlFor="outlined-age-simple"
                  >
                    Um was geht es?
                  </InputLabel>
                  <Select
                    input={
                      <OutlinedInput
                        name="age"
                        id="outlined-age-simple"
                      />
                    }
                  >
                    <MenuItem value={10}>Ich möchte Feedback geben.</MenuItem>
                    <MenuItem value={20}>Ich möchte eine Idee einbringen.</MenuItem>
                    <MenuItem value={30}>Da ist ein Bug!</MenuItem>
                    <MenuItem value={40}>Erzähl uns einen Witz.</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  style={{ marginBottom: '0px' }}
                  id="outlined-textarea"
                  label="Multiline Placeholder"
                  placeholder="Placeholder"
                  multiline
                  fullWidth
                  rows="4"
                  margin="normal"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </DialogContent>
      </Dialog>
    );
  }
}

Feedback.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.isRequired
};

export default (Feedback);
