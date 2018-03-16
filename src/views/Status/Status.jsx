import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';

import { statusSelectors, statusOperations } from '../../state/status';

import StatusInfo from './StatusInfo';
import EventLog from './EventLog';

const Status = ({ status }) => {
  const running = (
    <span style={{ color: 'green' }}>
      <icon type="check-circle-o" />{' '}
      <FormattedMessage id="status.started" defaultMessage="Started" />
    </span>
  );
  const stopped = (
    <span style={{ color: 'red' }}>
      <icon type="close-circle-o" />{' '}
      <FormattedMessage id="status.stopped" defaultMessage="Stopped" />
    </span>
  );

  return (
    <div className="pageContent">
      <h2 className="pageTitle">
        <FormattedMessage id="sidebar.status" />
      </h2>
      <Paper className="pageContainer">
        {status.isRunning ? running : stopped}
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
