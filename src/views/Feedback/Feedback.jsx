import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
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
        <div>
        </div>
      </Dialog>
    );
  }
}

Feedback.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.isRequired
};

export default (Feedback);
