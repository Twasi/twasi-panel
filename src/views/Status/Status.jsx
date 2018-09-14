import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { statusSelectors, statusOperations } from '../../state/status';

import StatusInfo from './StatusInfo';
import EventLog from './EventLog';

const Status = ({ status }) => {

  return (
    <div className="pageContent">
      <h2 className="pageTitle">
        <FormattedMessage id="sidebar.status" />
      </h2>
      <Paper className="pageContainer">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="status.card_headline" />
            </h4>
            <small>
              <FormattedMessage id="status.explanation" />
            </small>
          </Grid>
        </Grid>
        <Divider className="marginDivider"/>
        <StatusInfo />
        <br />
        <EventLog />
      </Paper>
    </div>
  );
};

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
