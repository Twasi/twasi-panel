import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

import './_style.css';

class Feedback extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  state = {
    issue: 10,
    labelWidth: 125,
  };

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
          <DialogContent>
            <Typography>
              <h3 className="pageContainerTitle">
                <FormattedMessage id="feedbackswitch.headline" />
              </h3>
              <small>
                <FormattedMessage id="feedbackswitch.subheadline" />
              </small>
            </Typography>
            <br /><br />
            <Card className="pluginCard">
              <CardContent className="pluginCardContent" style={{ paddingBottom: '10px' }}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel
                    htmlFor="issue-select"
                  >
                    <FormattedMessage id="feedbackswitch.issue" />
                  </InputLabel>
                  <Select
                    value={this.state.issue}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="issue"
                        id="issue-select"
                      />
                    }
                  >
                    <MenuItem value={10}><FormattedMessage id="feedbackswitch.issue_feedback" /></MenuItem>
                    <MenuItem value={20}><FormattedMessage id="feedbackswitch.issue_idea" /></MenuItem>
                    <MenuItem value={30}><FormattedMessage id="feedbackswitch.issue_bug" /></MenuItem>
                    <MenuItem value={40}><FormattedMessage id="feedbackswitch.issue_joke" /></MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-textarea"
                  label={<FormattedMessage id="feedbackswitch.issue_content_headline" />}
                  multiline
                  fullWidth
                  rows="6"
                  margin="normal"
                  variant="outlined"
                />
              </CardContent>
            </Card>
            <Button fullWidth style={{ borderRadius: '4px', marginTop: '15px' }} variant="contained" color="primary">
              <FormattedMessage id="feedbackswitch.sendbutton" />
            </Button>
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
