import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { statusSelectors, statusOperations } from '../../state/status';

import StatusInfo from './StatusInfo';

class Status extends Component {

  handleClose = () => {
    this.props.onClose();
  };

  render () {
    const { classes, onClose, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
        scroll="body"
      >
        <DialogContent>
          <div className="pageContent">
            <Typography component={"div"}>
              <h4 className="pageContainerTitle">
                <FormattedMessage id="status.card_headline" />
              </h4>
              <small>
                <FormattedMessage id="status.explanation" />
              </small>
            </Typography>
            <StatusInfo />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

Status.propTypes = {
  status: PropTypes.shape({
    isRunning: PropTypes.bool
  })
};

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Status));
