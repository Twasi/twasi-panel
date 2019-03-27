import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';

import './_style.css';

class Ticket extends React.Component {
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
                <FormattedMessage id="support.new_ticket" />
              </h3>
              <small>
                <FormattedMessage id="support.new_ticket_subheadline" />
              </small>
            </Typography>
            <br /><br />
            <Card className="pluginCard">
              <CardContent className="pluginCardContent" style={{ paddingBottom: '10px' }}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel
                    htmlFor="issue-select"
                  >
                    <FormattedMessage id="support.issue" />
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
                    <MenuItem value={10}><FormattedMessage id="support.chatbot" /></MenuItem>
                    <MenuItem value={20}><FormattedMessage id="support.userpanel" /></MenuItem>
                    <MenuItem value={30}><FormattedMessage id="support.function" /></MenuItem>
                    <MenuItem value={40}><FormattedMessage id="support.other" /></MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-textarea"
                  label={<FormattedMessage id="support.issue_content_headline" />}
                  multiline
                  fullWidth
                  rows="6"
                  margin="normal"
                  variant="outlined"
                />
              </CardContent>
            </Card>
            <Button fullWidth style={{ borderRadius: '4px', marginTop: '15px' }} variant="contained" color="primary">
              <FormattedMessage id="support.sendbutton" />
            </Button>
          </DialogContent>
      </Dialog>
    );
  }
}

Ticket.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.isRequired
};

export default (Ticket);
