import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';

import './_style.css';

const initialState = {
  type: 'OTHER',
  isLoading: false,
  topic: '',
  message: '',
  topicError: '',
  messageError: ''
};

class SupportTicketModal extends React.Component {
  state = initialState;

  categories = [
    'FEEDBACK',
    'IDEA',
    'JOKE',
    'BUG',
    'QUESTION',
    'PROBLEM',
    'THEME',
    'OTHER'
  ];

  handleClose = () => {
    this.setState(initialState);
    this.props.onClose();
  };

  handleTypeChange = event => {
    this.setState({ type: event.target.value });
  };

  handleTopicChange = event => {
    this.setState({ topic: event.target.value });
  };

  handleMessageChange = event => {
    this.setState({ message: event.target.value });
  };

  handleButtonClick = () => {
    this.setState({ isLoading: true });

    this.props.createTicket(this.state.type, this.state.topic, this.state.message).then(() => {
      this.handleClose();
    }).finally(() => {
      this.setState({ isLoading: false });
    });
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
            <h4 className="pageContainerTitle">
              <FormattedMessage id="support.new_ticket" />
            </h4>
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
                  value={this.state.type}
                  onChange={this.handleTypeChange}
                  input={
                    <OutlinedInput
                      labelWidth={125}
                      name="issue"
                      id="issue-select"
                    />
                  }
                >
                  {this.categories.map(category => <MenuItem key={this.state.type} value={category}><FormattedMessage id={`support.type.${category.toLowerCase()}`} /></MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                InputLabelProps={{ shrink: true }}
                labelWidth={this.state.labelWidth}
                label={<FormattedMessage id="support.topic" />}
                onChange={this.handleTopicChange}
                value={this.state.topic}
                fullWidth
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 20 }}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="support.issue_content_headline" />}
                onChange={this.handleMessageChange}
                value={this.state.message}
                multiline
                fullWidth
                rows="6"
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 1000 }}
              />
            </CardContent>
          </Card>
          <Button fullWidth style={{ borderRadius: '4px', marginTop: '15px' }} variant="contained" color="primary" disabled={this.state.isLoading} onClick={this.handleButtonClick}>
            {!this.state.isLoading && <FormattedMessage id="support.sendbutton" />}
            {this.state.isLoading && <CircularProgress size={24} />}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

SupportTicketModal.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.string,
  createTicket: PropTypes.func
};

export default (SupportTicketModal);
